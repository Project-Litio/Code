from rest_framework import serializers
from order.models import Work_order, Quotation, Bill
from inventory.models import Article, Car, Replacement
from login.models import Employee,Customer

class All_work_order_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Work_order
        fields = '__all__'

class Work_order_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Work_order
        fields = ['end_date','model','model_date','plate','observation','amount','id_employee','id_customer','id_replacement']

class All_quotation_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'

class Quotation_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = ['observation','total','amount','subtotal','id_customer','id_employee','id_car']

class All_bill_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

class Bill_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['payment_method','observation','total','amount','subtotal','id_customer','id_employee','id_car']

