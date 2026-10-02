# Import APIView from Django REST Framework
from rest_framework.views import APIView

# Import Response to send data back to React
from rest_framework.response import Response

# Import status for HTTP status codes
from rest_framework import status

# Import permission class
from rest_framework.permissions import IsAuthenticated

# Import Django's built-in authentication function
from django.contrib.auth import authenticate

# Import JWT token generator
from rest_framework_simplejwt.tokens import RefreshToken

# Import our models
from .models import SiteUser, Services, Contact

# Import our serializers
from .serializers import (
    SiteUserSerializer,
    ServicesSerializer,
    ContactSerializer,
    RegisterSerializer,
)


# ================= SERVICES =================


# API for Services
class ServicesView(APIView):
    # GET method - get all services
    def get(self, request):

        # Get all services from the database
        services = Services.objects.all()

        # Convert Django objects into JSON
        serializer = ServicesSerializer(services, many=True)

        # Send the data as a response
        return Response(serializer.data)


# ================= SITE USER / BOOKING =================


# API for SiteUser
# ================= SITE USER / BOOKING =================


# API for SiteUser
class SiteUserView(APIView):
    # Only logged-in users can access this API
    permission_classes = [IsAuthenticated]

    # GET method - get all bookings
    def get(self, request):

        # Get all bookings from the database
        bookings = SiteUser.objects.all()

        # Convert Django objects into JSON
        serializer = SiteUserSerializer(bookings, many=True)

        # Send booking data to React
        return Response(serializer.data)

    # POST method - create a new booking/request
    def post(self, request):

        # Get data sent from React
        serializer = SiteUserSerializer(data=request.data)

        # Check whether the data is valid
        if serializer.is_valid():
            # Save the valid data into the database
            serializer.save()

            # Return the saved data
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================= CONTACT =================


# API for Contact
class ContactView(APIView):
    # POST method - create a contact message
    def post(self, request):

        # Get data sent from React
        serializer = ContactSerializer(data=request.data)

        # Check whether the data is valid
        if serializer.is_valid():
            # Save the contact message into the database
            serializer.save()

            # Return the saved data
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================= REGISTER =================


# API for user registration
class RegisterView(APIView):
    # POST method - register a new user
    def post(self, request):

        # Get registration data from React
        serializer = RegisterSerializer(data=request.data)

        # Check whether the data is valid
        if serializer.is_valid():
            # Create the user
            serializer.save()

            # Send success response
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED,
            )

        # Send validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================= LOGIN =================


# API for user login
class LoginView(APIView):
    # POST method - login user
    def post(self, request):

        # Get username from request
        username = request.data.get("username")

        # Get password from request
        password = request.data.get("password")

        # Check username and password
        user = authenticate(username=username, password=password)

        # Check if user exists
        if user is None:
            # Return error message
            return Response(
                {"message": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Create refresh token for the user
        refresh = RefreshToken.for_user(user)

        # Return JWT tokens
        return Response(
            {
                # Login success message
                "message": "Login successful",
                # Access token for API requests
                "access": str(refresh.access_token),
                # Refresh token for getting a new access token
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )
