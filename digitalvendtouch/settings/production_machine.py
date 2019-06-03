from .base import *

DEBUG = False
TEMPLATE_DEBUG = False

COMPRESS_OFFLINE = True
COMPRESS_ENABLED = True

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "asgi_redis.RedisChannelLayer",
        "ROUTING": "digitalvendcore.routing.channel_routing",
    },
}

RAVEN_CONFIG = {
    'dsn': os.environ.get("RAVEN_DSN"),
    'site': os.environ.get("MACHINE_ID"),
    # If you are using git, you can also automatically configure the
    # release based on the git info.
    #'release': raven.fetch_git_sha(os.path.dirname(os.pardir)),
}


try:
    from .local import *
except ImportError:
    pass
