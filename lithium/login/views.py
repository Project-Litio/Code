from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from django.contrib.auth.models import User
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
