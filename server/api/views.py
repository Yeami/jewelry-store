from datetime import datetime

from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView

from server.api.models import AuthUser, Brand, Category
from server.api.serializers import UserSerializer, BrandSerializer, CategorySerializer


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
