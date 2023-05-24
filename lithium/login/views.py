from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from .models import Customer, Employee
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status, generics
import json


class customerAPI(APIView):
    def post(self,request):

        userRequest=json.loads(request.body)

        customer = CustomerSerializer(data=request.data)
        customer.is_valid(raise_exception = True)
        customer.save()

        user = User(
            username=userRequest['email'],
            email=userRequest['email'],
            first_name=userRequest['name'],
            last_name=userRequest['last_name']

        )
        user.set_password(userRequest['password'])
        user.save()

        return Response(userRequest)

class mechanicAPI(APIView):
    def post(self,request):

        userRequest=json.loads(request.body)

        employee = EmployeeSerializer(data=request.data)
        employee.is_valid(raise_exception = True)
        employee.save()

        
        user = User(
            username=userRequest['email'],
            email=userRequest['email'],
            first_name=userRequest['name'],
            last_name=userRequest['last_name']

        )
        user.set_password(userRequest['password'])
        user.save()



        e=Employee.objects.get(pk=employee.data['id'])

        mechanic = Mechanic.objects.create(
            id_employee=e
            )

        return Response(userRequest)

class managerAPI(APIView):
    def post(self,request):
        
        userRequest=json.loads(request.body)

        employee = EmployeeSerializer(data=request.data)
        employee.is_valid(raise_exception = True)
        employee.save()

        user = User(
            username=userRequest['email'],
            email=userRequest['email'],
            first_name=userRequest['name'],
            last_name=userRequest['last_name']

        )
        user.set_password(userRequest['password'])
        user.save()


            
        e=Employee.objects.get(pk=employee.data['id'])

        manager = Manager.objects.create(
            id_employee=e
            )

        return Response(userRequest)
        
class salesManAPI(APIView):
    def post(self,request):
        
        userRequest=json.loads(request.body)

        employee = EmployeeSerializer(data=request.data)
        employee.is_valid(raise_exception = True)
        employee.save() 

        user = User(
            username=userRequest['email'],
            email=userRequest['email'],
            first_name=userRequest['name'],
            last_name=userRequest['last_name']

        )
        user.set_password(userRequest['password'])
        user.save()

        e=Employee.objects.get(pk=employee.data['id'])

        salesMan = SalesMan.objects.create(
            id_employee=e
            )

        return Response(userRequest)
        
class CustomerView(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerList

class EmployeeView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeList
# Create your views here.