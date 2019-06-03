import hashlib
import json
import os
import requests
import uuid
import cups
import os.path

from datetime import datetime, timedelta
from time import sleep

from rest_framework import generics, status
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from digitalvendcore.models import Config

from .utils import send_service_socket_cmd


def index(request):
    has_order = request.session.get('order_id', False)
    return render(request, "vendingapp/index.html")


@api_view(['GET'])
def dispense_card(request):
    res = send_service_socket_cmd("DISPENSE")

    if res:
        return Response()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_email(request):
    email = request.data.get("email", False)
    email_error = None

    """ Check email locally first
        Criteria:
        - One entry per day, per user
        - Next day, next entry for same user gets next series of questions
    """
    r = requests.get(
        'https://api.kickbox.io/v2/verify?timeout=6000&email={0}&apikey={1}'.format(
            email,
            os.environ.get("KICKBOX_API_KEY")
        )
    )

    # Check if we received a successful API call response
    if r.status_code == requests.codes.ok:
        email_response = r.json()

        # Check data response to see if the email is:
        # - Deliverable
        # - Not disposable
        # - API is successful

        if not email_response.get('success', None):
            email_error = "Unable to validate email address"

        elif email_response.get('disposable', None):
            email_error = "Error with Email Verification. It seems your email is a temporary one."

        elif (email_response.get('result', None) != "deliverable" and email_response.get('result', None) != "risky"):
            email_error = "Error with Email Verification. Please ensure your email is correct"

        res = {
            "email_errors": email_error
        }

        return Response(res)

    else:

        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def send_print(request):
    conn = cups.Connection()
    printers = conn.getPrinters()
    if (len(printers) > 0):
        printer_name = conn.getDefault()
        BASE = os.path.dirname(os.path.abspath(__file__))
        file = open(os.path.join(BASE, "file.txt"))
        conn.printFile(printer_name, file.name, "Adidas", {"copies": "1"})
        return Response("Success")
    else:
        return Response("No printers")
    return Response("Success")
