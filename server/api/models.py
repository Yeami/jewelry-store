from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone

from server.api.managers import CustomUserManager


class Role(models.Model):
    name = models.CharField(max_length=30, blank=False, unique=True)

    class Meta:
        db_table = 'roles'


class AuthUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        'username',
        max_length=150,
        unique=True,
        help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
        validators=[UnicodeUsernameValidator()],
        error_messages={
            'unique': 'A user with that username already exists.',
        },
    )
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(unique=True, blank=False)
    phone = models.CharField(max_length=16, blank=False, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    address = models.CharField(max_length=60, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.DO_NOTHING, default=1)

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'auth_user'


class Brand(models.Model):
    name = models.CharField(max_length=40, blank=False, unique=True)
    country = models.CharField(max_length=30, blank=False)
    year_of_foundation = models.CharField(max_length=4, blank=False)

    class Meta:
        db_table = 'brand'


class Category(models.Model):
    name = models.CharField(max_length=40, blank=False, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'category'


class Product(models.Model):
    name = models.CharField(max_length=40, blank=False, unique=True)
    description = models.TextField(blank=True)
    price = models.CharField(max_length=20)
    amount = models.IntegerField(blank=False, default=0)
    is_available = models.BooleanField(blank=False, default=False)
    brand = models.ForeignKey(Brand, on_delete=models.DO_NOTHING)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

    class Meta:
        db_table = 'product'


class Order(models.Model):
    customer = models.ForeignKey(AuthUser, related_name='customer_id', on_delete=models.DO_NOTHING)
    worker = models.ForeignKey(AuthUser, related_name='worker_id', on_delete=models.DO_NOTHING)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'order'


class OrderProducts(models.Model):
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    amount = models.IntegerField(blank=False, default=1)

    class Meta:
        db_table = 'order_products'
