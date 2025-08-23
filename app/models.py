from django.db import models


class SignUp(models.Model):
    username=models.CharField(max_length=30)
    email=models.EmailField()
    password=models.CharField(max_length=20)


    def __str__(self):
        return self.username



# Create your models here.
