from rest_framework import serializers
from order.models import Work_order, Quotation, Bill, Order_detail, Quotation_detail, Bill_detail
from inventory.models import Article, Car, Replacement
from login.models import Employee,Customer

class All_work_order_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Work_order
        fields = '__all__'

class Work_order_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Work_order
        fields = ['end_date', 'model', 'model_date', 'plate', 'observation', 'id_employee', 'id_customer']

class All_Order_detail_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Order_detail
        fields = '__all__'

class Order_detail_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Order_detail
        fields = ['id_replacement','id_work_order','amount']
        
class All_quotation_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'

class Quotation_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'

class All_bill_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

class Bill_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

