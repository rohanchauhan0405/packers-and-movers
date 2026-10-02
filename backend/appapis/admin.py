from django.contrib import admin

# Register your models here.

# Import your models from models.py
from .models import SiteUser, Services, Contact


# Register SiteUser model in Django Admin
admin.site.register(SiteUser)

# Register Services model in Django Admin
admin.site.register(Services)

# Register Contact model in Django Admin
admin.site.register(Contact)