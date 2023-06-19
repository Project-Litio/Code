from urllib import response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.backends import ModelBackend
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.db import transaction
from rest_framework import status
from .models import *
from .serializers import *

# Create your views here.

class CustomerAPI(APIView):
    def get(self,request):
        queryset = Customer.objects.all()
        fullset = []
        for c in queryset:
            query = {"id":c.id,
             "first_name":c.id_user.first_name,
             "last_name":c.id_user.last_name,
             "email":c.id_user.email,
             "address":c.address,
             "phone":c.phone,
             "type":c.type}
            fullset.append(query)
        
        return Response({"status":"success","data":fullset})
    
    def post(self,request):
        data = self.request.data
        with transaction.atomic():
            username = data['first_name'] + "." + data['last_name']
            user = User.objects.create_user(username=username,password=data['password'],
                                            email=data['email'],
                                            first_name=data['first_name'],
                                            last_name=data['last_name'])
            user.save()
            last_user = User.objects.last()

            customer = Customer(id=data['id'],
                                address=data['address'],
                                phone=data['phone'],
                                type=data['type'],
                                id_user=last_user)
            customer.save()

        return Response({"status":"success","message":f"Customer {customer.id_user.first_name} was created"})

class CustomerDetailAPI(APIView):
    queryset = Customer.objects.all()
    serializer_class = Customer_Serializer

    def get_customer(self, pk):
        try:
            return Customer.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        customer = self.get_customer(pk=pk)
        if customer == None:
            return Response({"status": "fail", "message": f"Customer with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        data = {"id":customer.id,
             "first_name":customer.id_user.first_name,
             "last_name":customer.id_user.last_name,
             "email":customer.id_user.email,
             "address":customer.address,
             "phone":customer.phone,
             "type":customer.type}
        return Response({"status": "success", "data": data})
    
    def patch(self, request, pk):
        customer = self.get_customer(pk=pk)
        if customer == None:
            return Response({"status": "fail", "message": f"Customer with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        #Modifying the user------------------------------------------------------------------------------------------------------
        with transaction.atomic():
            user = customer.id_user
            user.first_name = request.data.get('first_name',user.first_name)
            user.last_name = request.data.get('last_name',user.last_name)
            user.email = request.data.get('email',user.email)
            user.username = user.first_name + ' ' + user.last_name
            user.set_password(request.data.get('password', ''))
            user.save()
        
            #Modifying the customer---------------------------------------------------------------------------------------------------
            serializer = self.serializer_class(customer, data=request.data, partial=True)
            data = {"id":customer.id,
             "first_name":customer.id_user.first_name,
             "last_name":customer.id_user.last_name,
             "email":customer.id_user.email,
             "address":customer.address,
             "phone":customer.phone,
             "type":customer.type}
        
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": data})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, pk):
        with transaction.atomic():
            customer = self.get_customer(pk)
            user = customer.id_user
            if customer  == None:
                return Response({"status": "fail", "message": f"Customer with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
            
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None

class CustomerLogin(APIView):
    def post(self,request):
        data = self.request.data
        user = authenticate(username=data['email'],password=data['password'])
        if user is not None:
            login(request,user)
            return Response({"data":user.id})
        else:
            logout(request)
            return Response({"detail":"invalid user"})

class CustomerLogout(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail":"Logout successful"})

class otpLogin(APIView):
    def post(self, request):
        data = self.request.data
        message = 'Tu código de verificación es: ' + str(data['code'])
        email = data['email']
        send_mail(
            'Litio - Tu código de verificación de dos pasos',
            message,
            'settings.EMAIL_HOST_USER',
            [email],
            fail_silently=False)
        return Response({"detail":str(data['code'])})