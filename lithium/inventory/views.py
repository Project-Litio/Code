from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from inventory.models import Article, Car, Replacement
from inventory.serializers import Article_Serializer, Car_Serializer, All_Car_Serializer
#from datetime import datetime

# Create your views here.
class ArticleAPI(APIView):
    serializer_class = Article_Serializer

    def get(self, request):
        queryset = Article.objects.all()
        serializer = self.serializer_class(queryset,many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"note": serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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
        car_data = request.data.copy()
        car_data.pop('id_article')  # Remove the article data from car data

        article_serializer = self.article_serializer(data=article_data)
        car_serializer = self.car_serializer(data=car_data)

        if article_serializer.is_valid() and car_serializer.is_valid():
            article_instance = article_serializer.save()  # Save the Article instance

            # Set the article field of the Car instance to the saved Article instance
            car_instance = car_serializer.save(id_article=article_instance)

            return Response({"status": "success", "data": {"car": car_serializer.data}}, status=status.HTTP_201_CREATED)
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
        if Car == None:
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
            serializer.save()
            return Response({"status": "success", "data": {"car": serializer.data}})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        car = self.get_car(pk)

        if car == None:
            return Response({"status": "fail", "message": f"Car with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        #articleNumber = car.id_article
        #article = self.get_article(articleNumber)

        car.delete()
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    
