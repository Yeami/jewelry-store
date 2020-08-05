from django.urls import path

from server.api import views

urlpatterns = [
    path('login', views.AuthTokenLogin.as_view()),
    path('me', views.Me.as_view()),
]
