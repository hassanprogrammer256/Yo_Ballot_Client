from django.db import models
from django.contrib.auth.models import AbstractBaseUser,AbstractUser,BaseUserManager

# Create your models here.

class CustomUser(BaseUserManager):
    def create_user(self,reg_no,phone_number,email,**extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_superuser',False)
        if not reg_no:
            raise ValueError('Registration Number is Required')
        if not email:
            raise ValueError('Email Address is Required')
        if not phone_number:
            raise ValueError("Phone Number is Required")
        email = self.normalize_email(email)
        user = self.model(email=email,phone_number=phone_number,reg_no=reg_no, **extra_fields)
        user.save(using=self._db)
        return user
    
    def createsuperuser(self,email,password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        if not email:
            raise ValueError("SuperUser email is Required")
        if not password:
            raise ValueError("SuperUser Password is Required")
        super_user  =self.model(email=self.normalize_email(email))
        super_user.set_password(password)
        super_user.save(using=self._db)
        return super_user

        

class Voter(models.Model):
    reg_no = models.CharField(verbose_name="Voter`s Registration Number", max_length=20,primary_key=True,unique=True)
    phone_number = models.CharField(verbose_name="Voter`s Phone Number", max_length=20,unique=True)
    email = models.EmailField(verbose_name="Voter`s Email Address",unique=True)
    
    objects = CustomUser()
    USERNAME_FIELD = 'reg_no'
    REQUIRED_FIELDS = ['reg_no','phone_number','email']
    
    def __str__(self):
        return self.reg_no
    
    
    
class Candidate(models.Model):
    name = models.CharField(verbose_name="Candidate`s Name", max_length=50,unique=True)
    position = models.ForeignKey(to="Post",on_delete=models.CASCADE,verbose_name="Candidate`s Position")
    image = models.ImageField(upload_to='media/candidates/')
    
    class Meta:
        db_table:"Candidate"
        ordering =['-name']
    
    def __str__(self):
        return self.name
    
class Post(models.Model):
    name = models.CharField(verbose_name="Post",unique=True,max_length=50)
    
    class Meta:
        db_table = 'Posts'
        managed = True
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'
        ordering = ["-name"]
    
    def __str__(self):
        return self.name
    
