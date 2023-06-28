from django.shortcuts import render
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from inventory.models import *
from order.models import *
from order.serializers import *
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
            replacement = Replacement.objects.get(id= request.data['id_replacement'])
            article = Branch_article.objects.get(id_branch=request.data['id_branch'],id_article=replacement.id_article)
            print(article.stock)
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
        replacement = Replacement.objects.get(id=order_detail.id_replacement.id) #
        article = article = Branch_article.objects.get(id_branch=order_detail.id_branch.id ,id_article=replacement.id_article.id)

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
                replacement = Replacement.objects.get(id=order_detail.id_replacement.id)
                article = article = Branch_article.objects.get(id_branch=order_detail.id_branch.id ,id_article=replacement.id_article.id)

                order_detail.delete()

                # Update the id_replacement stock
                article.stock += amount
                article.save()

        work_order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Quotation_detailAPI(APIView):
    quotation_detail_serializer = Quotation_detail_Serializer
    all_quotation_detail_serializer = All_quotation_detail_Serializer

    def get(self, request):
        queryset = Quotation_detail.objects.all()
        serializer = self.all_quotation_detail_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['subtotal'] = request.data['id_car'].price * request.data['amount']
        serializer = self.quotation_detail_serializer(data=request.data)
        is_valid_quotation_detail = serializer.is_valid()

        if is_valid_quotation_detail:
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Quotation_detailDetailAPI(APIView):
    quotation_detail_serializer = Quotation_detail_Serializer
    all_quotation_detail_serializer = All_quotation_detail_Serializer

    def get_quotation_detail(self, pk):
        try:
            return Quotation_detail.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        quotation_detail = self.get_quotation_detail(pk=pk)
        if quotation_detail == None:
            return Response({"status": "fail", "message": f"Quotation_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.all_quotation_detail_serializer(quotation_detail)
        return Response(serializer.data)

    def patch(self, request, pk):
        quotation_detail = self.get_quotation_detail(pk=pk)
        if quotation_detail == None:
            return Response({"status": "fail", "message": f"Quotation_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        #Selecting the car
        if (request.data['id_car'] == None):
            id_car = quotation_detail.id_car
        else:
            id_car = request.data['id_car']

        #Selecting the amount
        if (request.data['amount'] == None):
            amount = quotation_detail.amount
        else:
            amount = request.data['amount']

        request.data['subtotal'] = id_car.price * amount            
        
        serializer = self.quotation_detail_serializer(quotation_detail, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"quotation_detail": serializer.data}})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        quotation_detail = self.get_quotation_detail(pk=pk)
        if quotation_detail == None:
            return Response({"status": "fail", "message": f"Quotation_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        quotation_detail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class QuotationAPI(APIView):
    quotation_serializer = Quotation_Serializer
    all_quotation_serializer = All_quotation_Serializer
    all_quotation_detail_serializer = All_quotation_detail_Serializer

    def get(self, request):
        queryset = Quotation.objects.all()
        fullset = []
        for q in queryset:
            quotation_details = Quotation_detail.objects.filter(id_quotation=q.id)
            quotation_details_serializer = self.all_quotation_detail_serializer(quotation_details, many=True)
            query = {
                "id":q.id,
                "date":q.date,
                "observation":q.observation,
                "total":q.total,
                "id_customer":q.id_customer.id,
                "id_employee":q.id_employee.id,
                "quotation_details": quotation_details_serializer.data,
            }
            fullset.append(query)

        return Response(fullset)

    def post(self, request):
        request.data["total"] = 0
        serializer = self.quotation_serializer(data=request.data)
        is_valid_quotation = serializer.is_valid()

        if is_valid_quotation:
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
        return Response(serializer.data)

    def patch(self, request, pk):
        quotation = self.get_quotation(pk=pk)
        if quotation == None:
            return Response({"status": "fail", "message": f"Quotation with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        #Collecting the total
        queryset = Quotation_detail.objects.filter(id_quotation=quotation.id)
        request.data["total"] = 0
        for q in queryset:
            request.data["total"] += q.subtotal
        
        serializer = self.quotation_serializer(quotation, data=request.data, partial=True)

        is_valid_quotation = serializer.is_valid()

        if is_valid_quotation:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        quotation = self.get_quotation(pk=pk)
        if quotation == None:
            return Response({"status": "fail", "message": f"Quotation with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        quotation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Bill_detailAPI(APIView):
    bill_detail_serializer = Bill_detail_Serializer
    all_bill_detail_serializer = All_bill_detail_Serializer

    def get(self, request):
        queryset = Bill_detail.objects.all()
        serializer = self.all_bill_detail_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        #Calcular el subtotal aquí
        #request.data['subtotal'] = request.data['id_car'].price * request.data['amount']

        #Also take the amount and substract it to the stock of the cars
        request.data['subtotal'] = 0
        serializer = self.bill_detail_serializer(data=request.data)
        is_valid_bill_detail = serializer.is_valid()

        if is_valid_bill_detail:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            


class Bill_detailDetailAPI(APIView):
    bill_detail_serializer = Bill_detail_Serializer
    all_bill_detail_serializer = All_bill_detail_Serializer

    def get_bill_detail(self, pk):
        try:
            return Bill_detail.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        bill_detail = self.get_bill_detail(pk=pk)
        if bill_detail == None:
            return Response({"status": "fail", "message": f"Bill_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = self.all_bill_detail_serializer(bill_detail)
        return Response(serializer.data)

    def delete(self, request, pk):
        bill_detail = self.get_bill_detail(pk=pk)
        if bill_detail == None:
            return Response({"status": "fail", "message": f"Bill_detail with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND) 

        #Take the amount and add it to the stock of the cars

        bill_detail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class BillAPI(APIView):
    bill_serializer = Bill_Serializer
    all_bill_serializer = All_bill_Serializer
    all_bill_detail_serializer = All_bill_detail_Serializer

    def get(self, request):
        queryset = Bill.objects.all()
        fullset = []
        for b in queryset:
            bill_details = Bill_detail.objects.filter(id_bill=b.id)
            bill_details_serializer = self.all_bill_detail_serializer(bill_details, many=True)
            query = {
                "id":b.id,
                "date":b.date,
                "payment_method":b.date,
                "observation":b.observation,
                "total":b.total,
                "id_customer":b.id_customer.id,
                "id_employee":b.id_employee.id,
                "bill_details":bill_details_serializer.data
            }
            fullset.append(query)
        
        return Response(fullset)
    
    def post(self, request):
        request.data["total"] = 0
        serializer = self.bill_serializer(data=request.data)
        is_valid_quotation = serializer.is_valid()

        if is_valid_quotation:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class BillDetailAPI(APIView):
    bill_serializer = Bill_Serializer
    all_bill_serializer = All_bill_Serializer
    all_bill_detail_serializeer = All_bill_detail_Serializer

    def get_bill(self, pk):
        try:
            return Bill.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        b = self.get_bill(pk=pk)
        if b == None:
            return Response({"status": "fail", "message": f"Bill with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        bill_details = Bill_detail.objects.filter(id_bill=b.id)
        bill_details_serializer = self.all_bill_detail_serializer(bill_details, many=True)
        data = {
            "id":b.id,
            "date":b.date,
            "payment_method":b.payment_method,
            "observation":b.observation,
            "total":b.total,
            "id_customer":b.id_customer,
            "id_employee":b.id_employee,
        }
        return Response(data)

    def patch(self, request, pk):
        bill = self.get_bill(pk=pk)
        if bill == None:
            return Response({"status": "fail", "message": f"Bill with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        #Collects the total
        queryset = Quotation_detail.objects.filter(id_bill=bill.id)
        request.data["total"] = 0
        for b in queryset:
            request.data["total"] += b.subtotal
        
        serializer = self.bill_serializer(bill, data=request.data, partial=True)

        is_valid_bill = serializer.is_valid()

        if is_valid_bill:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        bill = self.get_bill(pk=pk)
        if bill == None:
            return Response({"status": "fail", "message": f"Bill with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        bill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


        

    

    
        
    



        

        
