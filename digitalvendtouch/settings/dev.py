from .base import *

DEBUG = True
TEMPLATE_DEBUG = False

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

SESSION_COOKIE_NAME = "digitalvendtouch"

COMPRESS_ENABLED=False

try:
    from .local import *
except ImportError:
    pass
