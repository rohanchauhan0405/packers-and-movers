# Import path function for creating URLs
from django.urls import path

# Import our views
from .views import (
    ServicesView,
    SiteUserView,
    ContactView,
    RegisterView,
    LoginView,
)


# URL patterns for our API
urlpatterns = [
    # URL for getting all services
    path("services/", ServicesView.as_view()),

    # Booking / SiteUser API
    path("siteusers/", SiteUserView.as_view(), name="siteusers"),

    # URL for creating a booking/request
    path("booking/", SiteUserView.as_view()),

    # URL for sending a contact message
    path("contact/", ContactView.as_view()),

    # URL for user registration
    path("register/", RegisterView.as_view()),
    
    # URL for user login
    path("login/", LoginView.as_view()),
]
