from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Customer, Employee, Mechanic, Branch, Manager, SalesMan


#-----------------------------------------CREATE---------------------------------------------

class CustomerSerializer(serializers.ModelSerializer):
        def validate_email(self, data):
            email = User.objects.filter(email=data)
            if len(email) != 0:
                raise serializers.ValidationError("El correo electrónico ya se encuentra registrado, ingrese uno nuevo")
            else:
                return data
            
        def validate_username(self, data):
            username = User.objects.filter(username=data)
            if len(username) != 0:
                raise serializers.ValidationError("El correo electrónico ya se encuentra registrado, ingrese uno nuevo")
            else:
                return data
            
        class Meta:
            model = Customer
            fields = '__all__'
    
class EmployeeSerializer(serializers.ModelSerializer):
        def validate_email(self, data):
            email = User.objects.filter(email=data)
            if len(email) != 0:
                raise serializers.ValidationError("El correo electrónico ya se encuentra registrado, ingrese uno nuevo")
            else:
                return data
            
        def validate_username(self, data):
            username = User.objects.filter(username=data)
            if len(username) != 0:
                raise serializers.ValidationError("El correo electrónico ya se encuentra registrado, ingrese uno nuevo")
            else:
                return data
            
        class Meta:
            model = Employee
            fields = '__all__'

class MechanicSerializer(serializers.ModelSerializer):
        class Meta:
            model = Mechanic
            fields = '__all__'

class ManagerSerializer(serializers.ModelSerializer):
        class Meta:
            model = Manager
            fields = '__all__'
        
class SalesManSerializer(serializers.ModelSerializer):
        class Meta:
            model = SalesMan
            fields = '__all__'
    
    

#-------------------------------READ-----------------------------------------------------

class CustomerList(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'id',
            'name',
            'last_name',
            'type',
            'address',
            'phone',
            'email',
        )

class EmployeeList(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            'id',
            'name',
            'last_name',
            'address',
            'phone',
            'email',
            'id_branch',
        )