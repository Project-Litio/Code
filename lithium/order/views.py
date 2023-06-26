from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from order.models import Work_order, Quotation, Bill
from order.serializers import Work_order_Serializer, Quotation_Serializer, Bill_Serializer, All_work_order_Serializer, All_quotation_Serializer, All_bill_Serializer
import json
from datetime import datetime

# Create your views here.
class Work_orderAPI(APIView):
    work_order_serializer = Work_order_Serializer
    all_work_order_serializer = All_work_order_Serializer

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
    all_work_order_serializer = All_work_order_Serializer

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

        work_order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class QuotationAPI(APIView):
    quotation_serializer = Quotation_Serializer
    all_quotation_serializer = All_quotation_Serializer

    def get(self, request):
        queryset = Quotation.objects.all()
        serializer = self.all_quotation_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.quotation_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuotationDetailAPI(APIView):
    quotation_serializer = Quotation_Serializer
    all_quotation_serializer = All_quotation_Serializer

    def get_quotation(self, pk):
        try:
            return Quotation.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        quotation = self.get_quotation(pk=pk)
        if quotation == None:
            return Response({"status": "fail", "message": f"Quotation with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.all_quotation_serializer(quotation)
        return Response({"status": "success", "data": {"quotation": serializer.data}})

    def patch(self, request, pk):
        quotation = self.get_quotation(pk=pk)
        if quotation == None:
            return Response({"status": "fail", "message": f"Quotation with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.quotaion_serializer(quotation, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"Quotation": serializer.data}})

        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        quotation = self.get_quotation(pk=pk)
        if quotation == None:
            return Response({"status": "fail", "message": f"Quotation with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        quotation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class BillAPI(APIView):
    bill_serializer = Bill_Serializer
    all_bill_serializer = All_bill_Serializer

    def get(self, request):
        queryset = Bill.objects.all()
        serializer = self.all_bill_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.bill_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BillDetailAPI(APIView):
    bill_serializer = Bill_Serializer
    all_bill_serializer = All_bill_Serializer

    def get_bill(self, pk):
        try:
            return Bill.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        bill = self.get_bill(pk=pk)
        if bill == None:
            return Response({"status": "fail", "message": f"Bill with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.all_bill_serializer(work_order)
        return Response({"status": "success", "data": {"Bill": serializer.data}})

    def patch(self, request, pk):
        bill = self.get_bill(pk=pk)
        if bill == None:
            return Response({"status": "fail", "message": f"Bill with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.bill_serializer(bill, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"bill": serializer.data}})

        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        bill = self.get_bill(pk=pk)
        if bill == None:
            return Response({"status": "fail", "message": f"Bill with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        bill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        


