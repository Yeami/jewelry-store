from rest_framework import serializers

from server.api.models import AuthUser


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name', required=True)
    lastName = serializers.CharField(source='last_name', required=True)
    dateJoined = serializers.DateTimeField(source='date_joined', required=False)

    class Meta:
        model = AuthUser
        fields = ['*']
