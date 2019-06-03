from django.conf.urls import url, include
from django.contrib import admin

from digitalvendcore import urls as core_urls

from vendingapp import urls as vendingapp_urls
from vendingapp.views import index

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', index),
    url(r'^api/', include(core_urls)),
    url(r'^api/', include(vendingapp_urls))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)