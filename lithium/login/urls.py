from django.urls import path
from .views import *

urlpatterns = [
    path('customer',CustomerAPI.as_view(),name="customer"),
    path('customer/login',CustomerLogin.as_view(),name='customer_login')
]