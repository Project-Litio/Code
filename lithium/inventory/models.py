from django.db import models
from login.models import Branch

# Create your models here.
class Article(models.Model):
  id=models.AutoField(primary_key=True)
  stock=models.IntegerField()
  color=models.CharField(max_length=30)

class Branch_article(models.Model):
  id=models.AutoField(primary_key=True)
  id_article=models.ForeignKey(Article,on_delete=models.CASCADE)
  id_branch=models.ForeignKey(Branch,on_delete=models.CASCADE)

class Car(models.Model):
  id=models.AutoField(primary_key=True)
  brand=models.CharField(max_length=30)
  type=models.CharField(max_length=20)
  model=models.CharField(max_length=50)
  wheel=models.CharField(max_length=20)
  price=models.IntegerField()
  id_article=models.ForeignKey(Article,on_delete=models.CASCADE)

class Replacement(models.Model):
  id=models.AutoField(primary_key=True)
  type=models.CharField(max_length=50)
  name=models.CharField(max_length=100)
  id_article=models.ForeignKey(Article,on_delete=models.CASCADE)