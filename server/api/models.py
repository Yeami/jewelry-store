from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone

from server.api.managers import CustomUserManager


class Role(models.Model):
    name = models.CharField(max_length=30, blank=False, unique=True)

    class Meta:
        db_table = 'roles'


class AuthUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(unique=True, blank=False)
    phone = models.CharField(max_length=16, blank=False, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    address = models.CharField(max_length=60, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.DO_NOTHING, default=1)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'auth_user'
