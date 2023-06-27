from django.shortcuts import render
from rest_framework.response import Response
from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView
from inventory.models import *
from inventory.serializers import *
import json
import cloudinary.uploader
#from datetime import datetime

# Create your views here.
class ArticleAPI(APIView):
    def get(self, request):
        data = []
        rep = Replacement.objects.all()
        for r in rep:
            if r.id_article.deleted == False:
                aux = {"id_article":r.id_article.id,
                    "article":"replacement",
                    "id":r.id,
                    "name":r.name,
                    "type":r.type,
                }
                data.append(aux)

        cars = Car.objects.all()
        for c in cars:
            if c.id_article.deleted == False:
                aux = {"id_article":c.id_article.id,
                    "article":"car",
                    "id":c.id,
                    "brand":c.brand,
                    "type":c.type,
                    "model":c.model,
                    "wheel":c.wheel,
                    "price":c.price,
                    "image":str(c.image),
                }
                data.append(aux)
        return Response(data)


class ArticleDetailAPI(APIView):
    queryset = Article.objects.all()
    serializer_class = Article_Serializer

    def get_article(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        article = self.get_article(pk=pk)
        if article == None:
            return Response({"status": "fail", "message": f"Article with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        if(len(Car.objects.filter(id_article=pk)) != 0):
            c = Car.objects.get(id_article=pk)
            data = {"article":"car",
                   "id":c.id,
                   "brand":c.brand,
                   "type":c.type,
                   "model":c.model,
                   "wheel":c.wheel,
                   "price":c.price,
                   "image":str(c.image),
            }
        else:
            r = Replacement.objects.get(id_article=pk)
            data = {"article":"replacement",
                   "id":r.id,
                   "name":r.name,
                   "type":r.type,
            }

        return Response({"status": "success", "data": {"article": data}})

    def delete(self, request, pk):
        article = self.get_article(pk)
        if article == None:
            return Response({"status": "fail", "message": f"Article with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        article.deleted = True
        article.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CarAPI(APIView):
    car_serializer = Car_Serializer 
    article_serializer = Article_Serializer
    all_car_serializer = All_Car_Serializer

    def get(self, request):
        queryset = Car.objects.all()
        fullset = []
        for c in queryset:
            query = {"id":c.id,
            "brand":c.brand,
            "type":c.type,
            "model":c.model,
            "wheel":c.wheel,
            "price":c.price,
            "image":str(c.image),
            "id_article": c.id_article.id,
            }
            fullset.append(query)

        return Response(fullset)


    def post(self, request):
        with transaction.atomic():
            article_data = request.data.get('id_article')  # Extract the article data
            if (not isinstance(article_data, dict) and article_data != None):
                article_data = json.loads(article_data)

            car_data = request.data.copy()
            car_data.pop('id_article')  # Remove the article data from car data

            article_serializer = self.article_serializer(data=article_data)
            car_serializer = self.car_serializer(data=car_data)

            is_valid_article = article_serializer.is_valid()
            is_valid_car = car_serializer.is_valid()

            if is_valid_article and is_valid_car:
                article_instance = article_serializer.save()  # Save the Article instance

                # Assign the associated article instance to the car instance
                car_instance = car_serializer.save(id_article=article_instance)

                branches = Branch.objects.all()

                for branch in branches:
                    Branch_article.objects.create(
                        id_article=article_instance,
                        id_branch=branch,
                        stock=0,
                        color= None
                    )

                return Response({"status": "success", "data": {"car": car_serializer.data}}, status=status.HTTP_201_CREATED)
                #https://res.cloudinary.com/dao5kgzkm/[Insert URL of image here]
            else:
                errors = article_serializer.errors
                errors.update(car_serializer.errors)
                return Response({"status": "fail", "message": errors}, status=status.HTTP_400_BAD_REQUEST)

class CarDetailAPI(APIView):
    """ article_serializer = Article_Serializer
    car_serializer = Car_Serializer
    all_car_serializer = All_Car_Serializer
    queryset = Car.objects.all()

    def get_car(self, pk):
        try:
            return Car.objects.get(pk=pk)
        except:
            return None

    def get_article(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        car = self.get_car(pk=pk)
        if car == None:
            return Response({"status": "fail", "message": f"Car with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.all_car_serializer(car)
        return Response({"status": "success", "data": {"car": serializer.data}})

    def patch(self, request, pk):
        car = self.get_car(pk)
        if car == None:
            return Response({"status": "fail", "message": f"Car with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer_car = self.car_serializer(
            car, data=request.data, partial=True)

        if serializer_car.is_valid():
            #If there's an image--------------------------------------------------------------------------------------------------------------
            image_file = request.FILES.get('image')

            if image_file:
                cloudinary.uploader.destroy(car.image.public_id)
                result = cloudinary.uploader.upload(image_file)
                car.image = result['url']
                car.save()

            #If there's an id_article---------------------------------------------------------------------------------------------------------
            article_data = request.data.get('id_article') #If it doesn't exist, it returns "None"
            if (not isinstance(article_data, dict) and article_data != None):
                article_data = json.loads(article_data)

            if not article_data == None:
                article = Article.objects.get(pk=car.id_article_id)
                if article == None:
                    return Response({"status": "fail", "message": f"Article with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

                serializer_article = self.article_serializer(
                    article, data=article_data, partial=True)
                
                if serializer_article.is_valid():
                    serializer_article.save()
                    #return Response({"status": "success", "data": {"article": serializer.data}})
                #return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            #Save the rest of the data input for the car--------------------------------------------------------------------------------------
            serializer_car.save()
            return Response({"status": "success", "data": {"car": serializer_car.data}})

        return Response({"status": "fail", "message": serializer_car.errors}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        car = self.get_car(pk)

        if car == None: 
            return Response({"status": "fail", "message": f"Car with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        #Delete the image from Cloudinary
        image_url = car.image
        if image_url:
            public_id = image_url.public_id  # Retrieve the public ID from the CloudinaryResource object
            cloudinary.uploader.destroy(public_id)  # Delete the image from Cloudinary
        
        articleNumber = car.id_article_id  # Retrieve the primary key of the associated article correctly
        article = self.get_article(articleNumber)

        #Se puede borrar el articulo y automáticamente se borra el vehículo
        car.delete()
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
"""
class Car_Stock(APIView):
    def get(self,request,pk):
        try:
            cars = Car.objects.all()
            result = []

            for car in cars:        
                info = Branch_article.objects.get(id_branch=pk,id_article=car.id_article.id)
                car_info = {
                    "id":car.id,
                    "id_article":car.id_article.id,
                    "brand":car.brand,
                    "type":car.type,
                    "model":car.model,
                    "wheel":car.wheel,
                    "price":car.price,
                    "image":str(car.image),
                    "stock":info.stock,
                    "color":info.color
                }
                result.append(car_info)

            return Response({"status": "success", "data":result})
        
        except:
            return Response({"status": "failed", "message":"Something went wrong"})
        
class ReplacementAPI(APIView):
    def get(self, request):
        queryset = Replacement.objects.all()
        fullset = []
        for r in queryset:
            if r.id_article.deleted == False:
                query = {"id":r.id,
                "type":r.type,
                "name":r.name,
                "id_article":r.id_article.id,
                }
                fullset.append(query)
        
        return Response(fullset)

    def post(self, request):
        data = request.data   
        try:
            with transaction.atomic():
                article = Article.objects.create(deleted=False)

                replacement = Replacement.objects.create(
                    type=data.get('type'),
                    name=data.get('name'),
                    id_article=article
                )

                rep = {
                    "id":replacement.id,
                    "type":replacement.type,
                    "name":replacement.name,
                    "id_article":replacement.id_article.id
                }

                branches = Branch.objects.all()

                for branch in branches:
                    Branch_article.objects.create(
                        id_article=article,
                        id_branch=branch,
                        stock=0,
                        color= None
                    )
                
                return Response({"status": "success", "data":rep})
        except:
            return Response({"status": "fail", "message":"Something went wrong"})

class ReplacementDetailAPI(APIView):
    """article_serializer = Article_Serializer
    replacement_serializer = Replacement_Serializer
    all_replacement_serializer = All_Replacement_Serializer
    queryset = Replacement.objects.all()

    def get_replacement(self, pk):
        try:
            return Replacement.objects.get(pk=pk)
        except:
            return None

    def get_article(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        replacement = self.get_replacement(pk=pk)
        if replacement == None:
            return Response({"status": "fail", "message": f"Replacement with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.all_replacement_serializer(replacement)
        return Response({"status": "success", "data": {"replacement": serializer.data}})

    def patch(self, request, pk):
        replacement = self.get_replacement(pk=pk)
        if replacement == None:
            return Response({"status": "fail", "message": f"Replacement with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer_replacement = self.replacement_serializer(
            replacement, data=request.data, partial=True)

        if serializer_replacement.is_valid():
            #If there's an id_article---------------------------------------------------------------------------------------------------------
            article_data = request.data.get('id_article') #If it doesn't exist, it returns "None"
            if (not isinstance(article_data, dict) and article_data != None):
                article_data = json.loads(article_data)

            if not article_data == None:
                article = Article.objects.get(pk=replacement.id_article_id)
                if article == None:
                    return Response({"status": "fail", "message": f"Article with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

                serializer_article = self.article_serializer(
                    article, data=article_data, partial=True)
                
                if serializer_article.is_valid():
                    serializer_article.save()
                    #return Response({"status": "success", "data": {"article": serializer.data}})
                #return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            #Save the rest of the data input for the Replacement--------------------------------------------------------------------------------
            serializer_replacement.save()
            return Response({"status": "success", "data": {"replacement": serializer_replacement.data}})
        return Response({"status": "fail", "message": serializer_replacement.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        replacement = self.get_replacement(pk)

        if replacement == None:
            return Response({"status": "fail", "message": f"Replacement with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        articleNumber = replacement.id_article_id #Retrieve the primary key of the associated article correctly
        article = self.get_article(articleNumber)

        #The article is deleted together with the replacement
        replacement.delete()
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) """
    
class Replacement_Stock(APIView):
    def get(self,request,pk):
        try:
            replacement = Replacement.objects.all()
            result = []

            for rep in replacement:        
                info = Branch_article.objects.get(id_branch=pk,id_article=rep.id_article.id)
                rep_info = {
                    "id":rep.id,
                    "id_article":rep.id_article.id,
                    "name":rep.name,    
                    "type":rep.type,
                    "stock":info.stock,
                    "color":info.color
                }
                result.append(rep_info)

            return Response({"status": "success", "data":result})
        
        except:
            return Response({"status": "failed", "message":"Something went wrong"})