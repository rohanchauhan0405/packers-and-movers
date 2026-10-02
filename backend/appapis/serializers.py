# Import serializers from Django REST Framework
from rest_framework import serializers

# Import our models
from .models import SiteUser, Services, Contact


# Serializer for SiteUser model
class SiteUserSerializer(serializers.ModelSerializer):
    # Tell Django REST Framework which model and fields to use
    class Meta:
        model = SiteUser
        fields = "__all__"


# Serializer for Services model
class ServicesSerializer(serializers.ModelSerializer):
    # Tell Django REST Framework which model and fields to use
    class Meta:
        model = Services
        fields = "__all__"


# Serializer for Contact model
class ContactSerializer(serializers.ModelSerializer):
    # Tell Django REST Framework which model and fields to use
    class Meta:
        model = Contact
        fields = "__all__"



# Serializer for User model -----------------------------------------------------------

# Import Django's built-in User model
from django.contrib.auth.models import User


# Serializer for registering a new user
class RegisterSerializer(serializers.ModelSerializer):
    # Password field
    password = serializers.CharField(write_only=True)

    # Confirm password field
    confirm_password = serializers.CharField(write_only=True)

    # Define the fields used during registration
    class Meta:
        model = User
        fields = ["username", "email", "password", "confirm_password"]

    # Create the user
    def create(self, validated_data):

        # Remove confirm_password because User model does not need it
        validated_data.pop("confirm_password")

        # Create user with encrypted password
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        # Return the created user
        return user
