from __future__ import with_statement
from fabric.api import *
from dotenv import load_dotenv
from fabric.contrib.files import upload_template
import os

env.user = 'pi'

load_dotenv(".env")

def deploy_local_machine():
    local("sudo supervisorctl stop all")
    local("git pull")
    # local("pip install -r requirements/requirements_prod.txt")
    local("./manage.py migrate --settings=digitalvendtouch.settings.production_machine")
    local("rm -rf static/CACHE/")
    local("rm -rf static/vendingapp/")
    local("rm -rf ~/.config/chromium/Default/")
    local("rm -rf ~/.cache/chromium")
    local("./manage.py compress --force --settings=digitalvendtouch.settings.production_machine")
    local("./manage.py collectstatic --noinput --settings=digitalvendtouch.settings.production_machine")
    local("sudo supervisorctl restart all")
