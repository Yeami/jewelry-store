import random
from collections import Counter
from datetime import datetime

from django.db import connections
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView

from server.api.models import AuthUser, Brand, Category, Product, Order
from server.api.serializers import UserSerializer, BrandSerializer, CategorySerializer, ProductSerializer


class AuthTokenLogin(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        user.last_login = datetime.now()
        user.save()

        token, created = Token.objects.get_or_create(user=user)

        return Response(
            {
                'token': token.key,
                'user': UserSerializer(user).data,
            },
            status=status.HTTP_200_OK
        )


class Me(APIView):
    serializer = UserSerializer
    model = AuthUser
    http_method_names = ['get', 'patch']
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        me = self.model.objects.get(id=request.user.id)
        serializer = self.serializer(me)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = self.model.objects.get(id=request.user.id)
        serializer = self.serializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListBrand(APIView):
    serializer = BrandSerializer
    model = Brand
    http_method_names = ['get']
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        brands = self.model.objects.all()
        serializer = self.serializer(brands, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ListCategory(APIView):
    serializer = CategorySerializer
    model = Category
    http_method_names = ['get']
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        categories = self.model.objects.all()
        serializer = self.serializer(categories, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ListProduct(APIView):
    serializer = ProductSerializer
    model = Product
    http_method_names = ['get']
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        products = self.model.objects.all()
        serializer = self.serializer(products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ListOrder(APIView):
    http_method_names = ['post']
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        manager = random.choice(AuthUser.objects.raw(
            '''SELECT * FROM auth_user WHERE role_id = (SELECT id FROM roles WHERE name = 'MANAGER')'''
        ))

        cursor = connections['default'].cursor()
        cursor.execute(
            '''INSERT INTO "order" (note, created_at, customer_id, worker_id) VALUES (%s, %s, %s, %s)''',
            ['', datetime.now(), request.user.id, manager.id]
        )

        order_id = Order.objects.raw('''SELECT id FROM "order" ORDER BY id DESC LIMIT 1''')[0].id

        counted_products = dict(Counter([item.get('id') for item in request.data]))
        for product in counted_products:
            cursor.execute(
                '''INSERT INTO order_products (amount, order_id, product_id) VALUES (%s, %s, %s)''',
                [counted_products[product], order_id, product]
            )

        return Response(status=status.HTTP_200_OK)
