from rest_framework import serializers
from inventory.models import Article, Car, Replacement

class Article_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        
class All_Car_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class Car_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id','brand','type','model','wheel','price','image']

class Replacement_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Replacement
    fields = ['type','name']