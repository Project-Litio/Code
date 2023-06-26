from django.urls import path
from .views import *

urlpatterns = [
    path('work_order',Work_orderAPI.as_view(),name="work_order"),
    path('work_orderDetail/<int:pk>',Work_orderDetailAPI.as_view(),name="work_orderDetail"),
    path('quotation',QuotationAPI.as_view(),name="quotation"),
    path('quotationDetail/<int:pk>',QuotationDetailAPI.as_view(),name="quotationDetail"),
    path('bill',BillAPI.as_view(),name="bill"),
    path('billDetail/<int:pk>',BillDetailAPI.as_view(),name="billDetail"),
]