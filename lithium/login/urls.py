from django.urls import path
from .views import *

urlpatterns = [
    path('customer',CustomerAPI.as_view(),name="customer"),
    path('customer/login',CustomerLogin.as_view(),name='customer_login'),
    path('customerDetail/<str:pk>',CustomerDetailAPI.as_view(),name="customer_detail"),
    path('employee',EmployeeAPI.as_view(),name="employee"),
    path('customer/otp',otpLogin.as_view(),name='customer_otp'),
]