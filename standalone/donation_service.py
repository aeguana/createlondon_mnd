import json
import os, sys
import pytz
import requests
import time
from datetime import datetime, timedelta

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

PATH = os.path.abspath(os.path.dirname(__file__))
sys.path.append(os.path.join(PATH, '../'))


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'digitalvendtouch.settings')

# ----------------------------- DJANGO -----------------------------
import django, requests

django.setup()

from digitalvendcore.models import Event


while True:
    e = None

    # Do we have any relay triggers on the card reader in past 60 secs?
    datenow = datetime.utcnow() + timedelta(seconds=-60)
    datenow_utc = pytz.utc.localize(datenow)

    # Check if we have any events to handle
    e = Event.objects.filter(
        type="LOG_BUTTON_PRESS",
        added_at__gte=datenow_utc)
    
    if(e):
        # Get first one to handle
        first_event = e.earliest('added_at')

        r = requests.post(os.environ.get("FRONTEND_DOMAIN") + '/api/1.0/receive-service-signal/',
                        data={
                            "json": json.dumps({
                                'type': 'DONATION',
                                'value': None
                            })
                        })

        #Delete entry so it's not picked up again
        first_event.delete()

    time.sleep(1)
