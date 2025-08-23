from django.urls import path
from app import views

urlpatterns=[
    path('home/',view=views.home,name='home'),
    path('analyze/',views.analyze,name='analyze'),
    path('',views.signup,name='signup'),
    path('login/',views.login,name='login'),
    path('logout/',views.logout,name='logout'),
]
