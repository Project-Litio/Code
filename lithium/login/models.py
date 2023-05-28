from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Branch(models.Model):
    address=models.CharField(max_length=20)
    city=models.CharField(max_length=20)

class Employee(models.Model):
    id=models.CharField(primary_key=True,max_length=20)
    address=models.CharField(max_length=30)
    phone=models.CharField(max_length=12)
    id_user=models.OneToOneField(User,on_delete=models.CASCADE)
    id_branch=models.ForeignKey(Branch,on_delete=models.SET_NULL,null=True)

class Manager(models.Model):
    id_employee=models.ForeignKey(Employee,on_delete=models.CASCADE)

class Mecanic(models.Model):
    id_employee=models.ForeignKey(Employee,on_delete=models.CASCADE)

class Saleman(models.Model):
    id_employee=models.ForeignKey(Employee,on_delete=models.CASCADE)

class Customer(models.Model):
    CUSTOMER_TYPES = [
        ("N","Natural"),
        ("J","Juridico")
    ]
    
    id=models.CharField(primary_key=True,max_length=20)
    address=models.CharField(max_length=30)
    phone=models.CharField(max_length=12)
    type=models.CharField(max_length=1,choices=CUSTOMER_TYPES)
    id_user=models.OneToOneField(User,on_delete=models.CASCADE)