from django.db import models
from inventory.models import Article, Car, Replacement
from login.models import Mecanic,Customer,Saleman


# Create your models here.
class Work_order(models.Model):
    id=models.AutoField(primary_key=True)
    start_date=models.DateTimeField(auto_now_add=True)
    end_date=models.DateTimeField(null=True)
    model=models.CharField(max_length=50)
    model_date=models.CharField(max_length=10)
    plate=models.CharField(max_length=10)
    observation=models.TextField(null=True)
    id_mecanic=models.ForeignKey(Mecanic,on_delete=SET_NULL)
    id_customer=models.ForeignKey(Customer,on_delete=SET_NULL)

class Order_detail(models.Model):
    id=models.AutoField(primary_key=True)
    id_replacement=models.ForeignKey(Replacement,on_delete=PROTECT)
    id_order=models.ForeignKey(Work_oder,on_delete=CASCADE)
    amount=models.IntegerField()

class Quotation(models.Model):
    id=models.AutoField(primary_key=True)
    date=models.DateTimeField(auto_now_add=True)
    observation=models.TextField(null=True)
    total=models.IntegerField()
    id_customer=models.ForeignKey(Customer,on_delete=SET_NULL)
    id_salesman=models.ForeignKey(Saleman,on_delete=SET_NULL)

class Quotation_detail(models.Model):
    id=models.AutoField(primary_key=True)
    id_car=ForeignKey(Car,on_delete=SET_NULL)
    id_quotation=ForeignKey(Quotation,on_delete=CASCADE)
    amount=models.IntegerField()
    subtotal=models.IntegerField()

class Bill(models.model):
    PAYMENT_METHODS = [
        ("TC","Tarjeta de crédito"),
        ("EF","Efectivo"),
        ("PS","Pse")
    ]

    id=models.AutoField(primary_key=True)
    date=models.DateTimeField(auto_now_add=True)
    payment_method=models.CharField(max_length=2,choices=PAYMENT_METHODS)
    observation=models.TextField(null=True)
    total=models.IntegerField()
    id_customer=models.ForeignKey(Customer,on_delete=SET_NULL)
    id_saleman=models.ForeignKey(Saleman,on_delete=SET_NULL)

class Bill_detail(models.model):
    id=models.AutoField(primary_key=True)
    id_car=ForeignKey(Car,on_delete=SET_NULL)
    id_bill=ForeignKey(Bill,on_delete=CASCADE)
    amount=models.IntegerField()
    subtotal=models.IntegerField()
    
    




