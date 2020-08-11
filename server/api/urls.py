from django.urls import path

from server.api import views

urlpatterns = [
    path('login', views.AuthTokenLogin.as_view()),
    path('me', views.Me.as_view()),
    path('brand', views.ListBrand.as_view()),
    path('category', views.ListCategory.as_view()),
]
