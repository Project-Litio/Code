from django.shortcuts import render
from rest_framework.response import response
from rest_framework import status
from rest_framework.views import APIView
from inventory.models import Work_order, Order_detail, Quotation, Quotation_detail, Bill, Bill_detail
from inventory.serializers import Work_order_Serializer, Quotation_Serializer, Bill_Serializer, All_work_order_Serializer, All_quotation_Serializer, All_bill_Serializer
import json
from datetime import datetime

# Create your views here.
class Work_orderAPI(APIView):
    work_order_serializer = Work_order_Serializer
    all_work_order_serializer = All_work_order_serializer

    def get(self, request):
        queryset = Work_order.objects.all()
        serializer = self.all_work_order_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.work_order_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class Work_orderDetailAPI(APIView):
    work_order_serializer = Work_order_Serializer
    all_work_order_serializer = All_work_order_serializer

    def get_work_order(self, pk):
        try:
            return Work_order.objects.get(pk=pk)
        except:
            return None
    
    def get(self, request, pk):
        work_order = self.get_work_order(pk=pk)
        if work_order == None:
            return Response({"status": "fail", "message": f"Work_order with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.all_work_order_serializer(work_order)
        return Response({"status": "success", "data": {"work_order": serializer.data}})

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
        if work_order == None:
            return Response({"status": "fail", "message": f"Work_order with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.work_order_serializer(work_order, data=request.data, partial=True)

        work_order.delete()

    


class QuotationAPI(APIView):


class QuotationDetailAPI(APIView):


class BillAPI(APIView):


class BillDetailAPI(APIView):

