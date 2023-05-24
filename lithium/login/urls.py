from django.urls import path
from .views import *

urlpatterns = [
    path('register/customer_register/', customerAPI.as_view(), name='registro_cliente'),
    path('register/mechanic_register/', mechanicAPI.as_view(), name='registro_mecanico'),
    path('register/manager_register/', managerAPI.as_view(), name='registro_gerente'),
    path('register/sales_man_register/', salesManAPI.as_view(), name='registro_vendedor'),

]