from django.db import models
from inventory.models import Article, Car, Replacement
from login.models import Employee, Customer


# Create your models here.
class Work_order(models.Model):
    id=models.AutoField(primary_key=True)
    start_date=models.DateTimeField(auto_now_add=True)
    end_date=models.DateTimeField(null=True)
    model=models.CharField(max_length=50)
    model_date=models.CharField(max_length=10)
    plate=models.CharField(max_length=10)
    observation=models.TextField(null=True)
    amount=models.IntegerField()
    id_employee=models.ForeignKey(Employee,on_delete=models.SET_NULL, null=True)
    id_customer=models.ForeignKey(Customer,on_delete=models.SET_NULL, null=True)
    id_replacement=models.ForeignKey(Replacement,on_delete=models.PROTECT, null=True)

class Quotation(models.Model):
    id=models.AutoField(primary_key=True)
    date=models.DateTimeField(auto_now_add=True)
    observation=models.TextField(null=True)
    total=models.IntegerField()
    amount=models.IntegerField()
    subtotal=models.IntegerField()
    id_customer=models.ForeignKey(Customer,on_delete=models.SET_NULL, null=True)
    id_employee=models.ForeignKey(Employee,on_delete=models.SET_NULL, null=True)
    id_car=models.ForeignKey(Car,on_delete=models.SET_NULL, null=True)
    
class Bill(models.Model):
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
    amount=models.IntegerField()
    subtotal=models.IntegerField()
    id_customer=models.ForeignKey(Customer,on_delete=models.SET_NULL, null=True)
    id_employee=models.ForeignKey(Employee,on_delete=models.SET_NULL, null=True)
    id_car=models.ForeignKey(Car,on_delete=models.SET_NULL, null=True)

