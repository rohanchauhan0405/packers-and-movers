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

    # GET - get all services
    def get(self, request):

        # Get all services from database
        services = Services.objects.all()

        # Convert objects into JSON
        serializer = ServicesSerializer(services, many=True)

        # Return services
        return Response(serializer.data)


# ================= SITE USER / BOOKING =================

# API for bookings
class SiteUserView(APIView):

    # Require login for all booking methods
    permission_classes = [IsAuthenticated]

    # GET - get all bookings (admin only)
    def get(self, request):

        # Check whether user is an admin/staff member
        if not request.user.is_staff:
            return Response(
                {"detail": "Admin access required."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Get all bookings
        bookings = SiteUser.objects.all()

        # Convert bookings into JSON
        serializer = SiteUserSerializer(bookings, many=True)

        # Return bookings
        return Response(serializer.data)

    # POST - create a booking (logged-in users)
    def post(self, request):

        # Get booking data from React
        serializer = SiteUserSerializer(data=request.data)

        # Validate booking data
        if serializer.is_valid():

            # Save booking
            serializer.save()

            # Return saved booking
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        # Return validation errors
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # PATCH - update a booking (admin only)
    def patch(self, request, id):

        # Check whether user is an admin/staff member
        if not request.user.is_staff:
            return Response(
                {"detail": "Admin access required."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Find booking using ID
        try:
            booking = SiteUser.objects.get(id=id)

        except SiteUser.DoesNotExist:
            return Response(
                {"detail": "Booking not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Update only the fields sent from React
        serializer = SiteUserSerializer(
            booking,
            data=request.data,
            partial=True
        )

        # Validate updated data
        if serializer.is_valid():

            # Save changes
            serializer.save()

            # Return updated booking
            return Response(serializer.data)

        # Return validation errors
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ================= CONTACT =================

# API for Contact
class ContactView(APIView):

    # POST - create a contact message
    # This API is public; login is not required
    def post(self, request):

        # Get contact data from React
        serializer = ContactSerializer(data=request.data)

        # Validate data
        if serializer.is_valid():

            # Save contact message
            serializer.save()

            # Return saved data
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        # Return validation errors
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ================= REGISTER =================

# API for user registration
class RegisterView(APIView):

    # POST - register a new user
    def post(self, request):

        # Get registration data
        serializer = RegisterSerializer(data=request.data)

        # Validate registration data
        if serializer.is_valid():

            # Create user
            serializer.save()

            # Return success message
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        # Return validation errors
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ================= USER LOGIN =================

# API for normal customer login
class LoginView(APIView):

    # POST - login user
    def post(self, request):

        # Get username and password
        username = request.data.get("username")
        password = request.data.get("password")

        # Verify credentials
        user = authenticate(
            username=username,
            password=password
        )

        # Reject invalid credentials
        if user is None:
            return Response(
                {"message": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        # Return tokens
        return Response(
            {
                "message": "Login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK
        )


# ================= ADMIN LOGIN =================

# API for administrator login
class AdminLoginView(APIView):

    # POST - login administrator
    def post(self, request):

        # Get username and password
        username = request.data.get("username")
        password = request.data.get("password")

        # Verify credentials
        user = authenticate(
            username=username,
            password=password
        )

        # Reject invalid credentials
        if user is None:
            return Response(
                {"message": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Allow only staff users
        if not user.is_staff:
            return Response(
                {"message": "Admin access denied."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        # Return admin tokens
        return Response(
            {
                "message": "Admin login successful.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK
        )