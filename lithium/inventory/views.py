from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from inventory.models import Article, Car, Replacement
from inventory.serializers import Article_Serializer, Car_Serializer, All_Car_Serializer, Replacement_Serializer, All_Replacement_Serializer
import json
import cloudinary.uploader
#from datetime import datetime

# Create your views here.
class ArticleAPI(APIView):
    serializer_class = Article_Serializer

    def get(self, request):
        queryset = Article.objects.all()
        serializer = self.serializer_class(queryset,many=True)
        return Response(serializer.data)


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
        if Article == None:
            return Response({"status": "fail", "message": f"Article with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(article)
        return Response({"status": "success", "data": {"article": serializer.data}})

    def patch(self, request, pk):
        article = self.get_article(pk)
        if article == None:
            return Response({"status": "fail", "message": f"Article with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            article, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"article": serializer.data}})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        article = self.get_article(pk)
        if article == None:
            return Response({"status": "fail", "message": f"Article with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CarAPI(APIView):
    car_serializer = Car_Serializer 
    article_serializer = Article_Serializer
    all_car_serializer = All_Car_Serializer

    def get(self, request):
        queryset = Car.objects.all()
        serializer = self.all_car_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        article_data = request.data.get('id_article')  # Extract the article data
        if not isinstance(article_data, dict):
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

            return Response({"status": "success", "data": {"car": car_serializer.data}}, status=status.HTTP_201_CREATED)
            #https://res.cloudinary.com/dao5kgzkm/[Insert URL of image here]
        else:
            errors = article_serializer.errors
            errors.update(car_serializer.errors)
            return Response({"status": "fail", "message": errors}, status=status.HTTP_400_BAD_REQUEST)
    

class CarDetailAPI(APIView):
    queryset = Car.objects.all()
    serializer_class = Car_Serializer

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

        serializer = self.serializer_class(car)
        return Response({"status": "success", "data": {"car": serializer.data}})

    def patch(self, request, pk):
        car = self.get_car(pk)
        if car == None:
            return Response({"status": "fail", "message": f"Car with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(
            car, data=request.data, partial=True)

        if serializer.is_valid():
            image_file = request.FILES.get('image')

            if image_file:
                cloudinary.uploader.destroy(car.image.public_id)
                result = cloudinary.uploader.upload(image_file)
                car.image = result['url']
                car.save()

            serializer.save()
            return Response({"status": "success", "data": {"car": serializer.data}})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


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


class ReplacementAPI(APIView):
    replacement_serializer = Replacement_Serializer
    all_replacement_serializer = All_Replacement_Serializer
    article_serializer = Article_Serializer

    def get(self, request):
        queryset = Article.objects.all()
        serializer = self.all_replacement_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        article_data = request.data.get('id_article') #Extract the article data
        if not isinstance(article_data, dict):
            article_data = json.loads(article_data)
        
        replacement_data = request.data.copy()
        replacement_data.pop('id_article') #Remove the article data from replacement data

        article_serializer = self.article_serializer(data=article_data)
        replacement_serializer = self.replacement_serializer(data=article_data)

        is_valid_article = article_serializer.is_valid()
        is_valid_replacement = article_serializer.is_valid()

        if is_valid_article and is_valid_replacement:
            article_instance = article_serializer.save() #Save the Article instance

            #Assign the associated article instance to the replacement instance
            replacement_instance = replacement_serializer.save(id_article=article_instance)

            return Response({"status": "success", "data": {"car": replacement_serializer.data}}, status=status.HTTP_201_CREATED)

        else:
            errors = article_serializer.errors
            errors.update(replacement_serializer.errors)
            return Response({"status": "fail", "message": errors}, status=status.HTTP_400_BAD_REQUEST)


class ReplacementDetailAPI(APIView):
    queryset = Replacement.objects.all()
    serializer_class = Article_Serializer

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

        serializer = self.serializer_class(replacement)
        return Response({"status": "success", "data": {"replacement": serializer.data}})

    def patch(self, request, pk):
        replacement = self.get_replacement(pk=pk)
        if replacement == None:
            return Response({"status": "fail", "message": f"Replacement with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(
            replacement, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"replacement": serializer.data}})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        replacement = self.get_car(pk)

        if replacement == None:
            return Response({"status": "fail", "message": f"Replacement with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        articleNumber = car.id_article_id #Retrieve the primary key of the associated article correctly
        article = self.get_article(articleNumber)

        #The article is deleted together with the replacement
        replacement.delete()
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    
        
        

    
