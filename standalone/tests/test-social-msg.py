# -*- coding: utf-8 -*-

import os
import sys
import socket

import logging
import requests
import socket
import time
import json
import traceback

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

r = requests.post(os.environ.get("FRONTEND_DOMAIN") + '/api/1.0/receive-service-signal/',
data={
    "json": json.dumps({
        'type': 'NEW_SOCIAL_MSG'
    })
})
