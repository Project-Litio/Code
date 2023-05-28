from django.urls import path
from .views import *

urlpatterns = [
    path('customer',CustomerAPI.as_view(),name="customer"),
]