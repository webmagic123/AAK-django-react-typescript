from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from .serializers import UserSignupSerializer, UserSerializer

# Create your views here.

class SignupView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)

        if serializer.is_valid(): 
            try:
                user = serializer.save()
                user_serializer = UserSerializer(user)

                return Response({
                    'success': True,
                    'message': 'User created successfully',
                    'user': user_serializer.data
                }, status=status.HTTP_201_CREATED)
            
            except Exception as e:
                return Response({
                    'success': False,
                    'message': 'Error creating user',
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({
            'success': False,
            'message': 'Validation failed',
            'error': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
