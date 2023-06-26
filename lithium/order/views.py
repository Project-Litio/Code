from django.shortcuts import render
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from inventory.models import Car, Replacement, Article
from order.models import Work_order, Order_detail, Quotation, Bill
from order.serializers import Work_order_Serializer, Order_detail_Serializer, Quotation_Serializer, Bill_Serializer, All_work_order_Serializer, All_Order_detail_Serializer, All_quotation_Serializer, All_bill_Serializer
import json
from datetime import datetime

class Order_detailAPI(APIView):
    order_detail_serializer = Order_detail_Serializer
    all_order_detail_serializer = All_Order_detail_Serializer

    def get(self, request):
        queryset = Order_detail.objects.all()
        serializer = self.all_order_detail_serializer(queryset,many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.order_detail_serializer(data=request.data)
        is_valid_order_detail = serializer.is_valid()

        if is_valid_order_detail:
            amount = serializer.validated_data['amount']
            id_replacement = serializer.validated_data['id_replacement']
            article = id_replacement.id_article
            if ((article.stock-amount) < 0):
                return Response({"status": "fail", "message": f"Replacement: {id_replacement} has not enough stock for the required amount "}, status=status.HTTP_404_NOT_FOUND)

            article.stock -= amount
            article.save()

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Order_detailDetailAPI(APIView):
    order_detail_serializer = Order_detail_Serializer
    all_order_detail_serializer = All_Order_detail_Serializer

    def get_order_detail(self, pk):
        try:
            return Order_detail.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        order_detail = self.get_order_detail(pk=pk)
        if order_detail == None:
            return Response({"status": "fail", "message": f"Order_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.all_order_detail_serializer(order_detail)
        return Response(serializer.data)
        
    '''
    def patch(self, request, pk):
        order_detail = self.get_order_detail(pk=pk)
        if order_detail == None:
            return Response({"status": "fail", "message": f"Order_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.order_detail_serializer(order_detail, data=request.data, partial=True)
        
        if serializer.is_valid():

            if (serializer.validated_data['id_replacement'] != None):
                #For the old id_replacement------------------------------
                # Retrieve the amount and id_replacement
                amount = order_detail.amount
                article = order_detail.id_replacement.id_article

                # Update the id_replacement stock
                article.stock += amount
                article.save()

                #For the new id_replacement------------------------------
                if (serializer.validated_data['amount'] != None):
                    amount = serializer.validated_data['amount']
                
                article = serializer.validated_data['id_replacement']

                # Update the id_replacement stock
                article.id_article.stock -= amount
                article.save()

                amount_changed = True
            
            if (serializer.validated_data['amount'] != None and not amount_changed):
                #For the old id_replacement------------------------------
                # Retrieve the amount and id_replacement
                amount = order_detail.amount
                article = order_detail.id_replacement.id_article

                # Update the id_replacement stock
                article.stock += amount
                article.save()

                #For the new id_replacement------------------------------
                amount = serializer.validated_data['amount']

                # Update the id_replacement stock
                article.stock -= amount
                article.save()

            serializer.save()
            return Response({"status": "success", "data": {"order_detail": serializer.data}})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    '''

    def delete(self, request, pk):
        order_detail = self.get_order_detail(pk=pk)
        if order_detail == None:
            return Response({"status": "fail", "message": f"Order_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Retrieve the amount and id_replacement
        amount = order_detail.amount
        article = order_detail.id_replacement.id_article

        order_detail.delete()

        # Update the id_replacement stock
        article.stock += amount
        article.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class Work_orderAPI(APIView):
    work_order_serializer = Work_order_Serializer
    all_work_order_serializer = All_work_order_Serializer
    all_order_detail_serializer = All_Order_detail_Serializer


    def get(self, request):
        queryset = Work_order.objects.all()
        fullset = []
        for w in queryset:
            order_details = Order_detail.objects.filter(id_work_order=w.id)
            order_details_serializer = self.all_order_detail_serializer(order_details, many=True)
            query = {
                "id":w.id,
                "start_date":w.start_date,
                "end_date":w.end_date,
                "model":w.model,
                "model_date":w.model_date,
                "plate":w.plate,
                "observation":w.observation,
                "id_employee":w.id_employee.id,
                "id_customer":w.id_customer.id,
                "order_details": order_details_serializer.data,
            }
            fullset.append(query)
        
        return Response(fullset)

    def post(self, request):
        serializer = self.work_order_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Work_orderDetailAPI(APIView):
    work_order_serializer = Work_order_Serializer
    all_work_order_serializer = All_work_order_Serializer
    all_order_detail_serializer = All_Order_detail_Serializer

    def get_work_order(self, pk):
        try:
            return Work_order.objects.get(pk=pk)
        except:
            return None
    
    def get(self, request, pk):
        w = self.get_work_order(pk=pk)
        if w == None:
            return Response({"status": "fail", "message": f"Work_order with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        order_details = Order_detail.objects.filter(id_work_order=w.id)
        order_details_serializer = self.all_order_detail_serializer(order_details, many=True)
        data = {
                "id":w.id,
                "start_date":w.start_date,
                "end_date":w.end_date,
                "model":w.model,
                "model_date":w.model_date,
                "plate":w.plate,
                "observation":w.observation,
                "id_employee":w.id_employee.id,
                "id_customer":w.id_customer.id,
                "order_detail": order_details_serializer.data,
            }
        return Response(data)

    def patch(self, request, pk):
        work_order = self.get_work_order(pk=pk)
        if work_order == None:
            return Response({"status": "fail", "message": f"Work_order with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.work_order_serializer(work_order, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"work_order": serializer.data}})

        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        work_order = self.get_work_order(pk=pk)
        if work_order is None:
            return Response({"status": "fail", "message": f"Work_order with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():
            order_details = Order_detail.objects.filter(id_work_order=work_order.id)

            for order_detail in order_details:
                # Retrieve the amount and id_replacement
                amount = order_detail.amount
                article = order_detail.id_replacement.id_article

                order_detail.delete()

                # Update the id_replacement stock
                article.stock += amount
                article.save()

        work_order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        

        
