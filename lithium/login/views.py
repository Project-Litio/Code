from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.backends import ModelBackend
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from .models import *
from .serializers import *

# Create your views here.

class CustomerAPI(APIView):
    def get(self,request):
        queryset = Customer.objects.all()
        serializers = Customer_Serializer(queryset,many=True)
        return Response(serializers.data)
    
    def post(self,request):
        data = self.request.data
        with transaction.atomic():
            username = data['name'] + "." + data['last_name']
            user = User.objects.create_user(username=username,password=data['password'],
                                            email=data['email'],
                                            first_name=data['name'],
                                            last_name=data['last_name'])
            user.save()
            last_user = User.objects.last()

            customer = Customer(id=data['id'],
                                address=data['address'],
                                phone=data['phone'],
                                type=data['type'],
                                id_user=last_user)
            customer.save()

        return Response({'resp':"done"})

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