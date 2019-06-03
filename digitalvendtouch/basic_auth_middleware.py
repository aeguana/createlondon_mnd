from django.conf import settings
from django.http import HttpResponse
from django.utils.translation import ugettext as _
import base64

def basic_challenge(realm=None):
    if realm is None:
        realm = getattr(settings, 'WWW_AUTHENTICATION_REALM', _('Restricted Access'))
    # TODO: Make a nice template for a 401 message?
    response = HttpResponse(_('Authorization Required'), content_type="text/plain")
    response['WWW-Authenticate'] = 'Basic realm="%s"' % (realm)
    response.status_code = 401
    return response

def basic_authenticate(authentication):
    # Taken from paste.auth
    (authmeth, auth) = authentication.split(' ',1)
    if 'basic' != authmeth.lower():
        return None
    auth = base64.b64decode(auth.strip()).decode('utf-8')
    username, password = auth.split(':',1)
    AUTHENTICATION_USERNAME = getattr(settings, 'BASIC_WWW_AUTHENTICATION_USERNAME')
    AUTHENTICATION_PASSWORD = getattr(settings, 'BASIC_WWW_AUTHENTICATION_PASSWORD')
    return username == AUTHENTICATION_USERNAME and password == AUTHENTICATION_PASSWORD

class BasicAuthenticationMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        if not getattr(settings, 'BASIC_WWW_AUTHENTICATION', False):
            return
        if 'HTTP_AUTHORIZATION' not in request.META:
            return basic_challenge()
        authenticated = basic_authenticate(request.META['HTTP_AUTHORIZATION'])
        if authenticated:
            response = self.get_response(request)
            return response
        return basic_challenge()
        # Code to be executed for each request/response after
        # the view is called.

        return response