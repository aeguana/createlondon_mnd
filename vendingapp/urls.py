from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    dispense_card,
    send_print,
    verify_email)

urlpatterns = [

    # Card dispensing URLs
    url(r'^dispense-card/$', dispense_card),

    url(r'^1.0/verify-email', verify_email),
    url(r'^1.0/send-print', send_print)
]

urlpatterns = format_suffix_patterns(urlpatterns)
