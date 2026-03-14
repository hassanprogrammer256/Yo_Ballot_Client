from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # ------------AUTH--------------------
    path("accounts",include('Accounts.urls'))
]
