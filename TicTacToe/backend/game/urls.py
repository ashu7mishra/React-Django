from django.urls import path
from . import views

urlpatterns = [
    path('check/', views.check_game, name='check_game')
]