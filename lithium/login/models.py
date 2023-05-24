from django.db import models

# Create your models here.
from typing import Any
from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User, Group

# Create your models here.

class Customer(models.Model):
    CUSTOMER_TYPES=[
        ("N","Natural"),
        ("J","Juridico")
    ]

    password = models.CharField(max_length=120)
    name = models.CharField(max_length=30)
    last_name= models.CharField(max_length=30)
    type = models.CharField(max_length=1,choices=CUSTOMER_TYPES)
    address = models.CharField(max_length=30)
    phone = models.CharField(max_length=12)
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return 'Nombre: {0}, {1} - Email: {2}'.format(self.last_name, self.name, self.email)
    class Meta:
        verbose_name='Customer'
        db_table='customer'


class Branch(models.Model):
    address = models.CharField(max_length=20)
    city = models.CharField(max_length=20)

    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name='Branch'
        db_table='branch'


class Employee(models.Model):
    password = models.CharField(max_length=120)
    name = models.CharField(max_length=30)
    last_name= models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    phone = models.CharField(max_length=12)
    email = models.EmailField(unique=True)
    id_branch = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return 'Nombre: {0}, {1} - Email: {2}'.format(self.last_name, self.name, self.email)

    class Meta:
        verbose_name='Employee'
        db_table='employee'
    

class SalesMan(models.Model):
    id_employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    class Meta:
        verbose_name='Sales Man'
        db_table='sales man'


class Mechanic(models.Model):
    id_employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    class Meta:
        verbose_name='Mechanic'
        db_table='mechanic'


class Manager(models.Model):
    id_employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    class Meta:
        verbose_name='Manager'
        db_table='manager'