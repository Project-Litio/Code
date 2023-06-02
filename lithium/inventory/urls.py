from django.urls import path
from .views import *

urlpatterns = [
    path('car',CarAPI.as_view(),name="car"),
    path('carDetail/<str:pk>',CarDetailAPI.as_view(),name="car_detail"),
    path('article',ArticleAPI.as_view(),name="article"),
    path('articleDetail/<int:pk>',ArticleDetailAPI.as_view(),name="article"),
]