
// Import useState
import { useState } from "react";

// Import Link for navigation
import { Link } from "react-router-dom";

// Import axios instance
import api from "../../services/api";


function Registration() {

  // Store form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });


  // Store error message
  const [error, setError] = useState("");


  // Store success message
  const [success, setSuccess] = useState("");


  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // Handle form submission
  const handleSubmit = (e) => {

    // Prevent page refresh
    e.preventDefault();

    // Clear old messages
    setError("");
    setSuccess("");


    // Check password
    if (formData.password !== formData.confirm_password) {

      setError("Passwords do not match.");

      return;
    }


    // Send registration data to Django
    api.post("register/", formData)

      .then((response) => {

        // Show success message
        setSuccess(response.data.message);

        // Clear form
        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });

      })

      .catch((error) => {

        // Display error in browser console
        console.log("Registration error:", error.response?.data);

        // Get Django error
        const djangoError = error.response?.data;


        // Show username error
        if (djangoError?.username) {

          setError(djangoError.username[0]);

        }

        // Show email error
        else if (djangoError?.email) {

          setError(djangoError.email[0]);

        }

        // Show password error
        else if (djangoError?.password) {

          setError(djangoError.password[0]);

        }

        // Show confirm password error
        else if (djangoError?.confirm_password) {

          setError(djangoError.confirm_password[0]);

        }

        // Show general error
        else {

          setError("Registration failed. Please try again.");

        }

      });
  };


  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">

      {/* Registration container */}
      <div className="max-w-md mx-auto">


        {/* Page heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Register to book our moving services
          </p>

        </div>


        {/* Registration form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md"
        >


          {/* Success message */}
          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-5">
              {success}
            </div>
          )}


          {/* Error message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
              {error}
            </div>
          )}


          {/* Username */}
          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              required
            />

          </div>


          {/* Email */}
          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              required
            />

          </div>


          {/* Password */}
          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              required
            />

          </div>


          {/* Confirm password */}
          <div className="mb-6">

            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              required
            />

          </div>


          {/* Register button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Account
          </button>


          {/* Login link */}
          <p className="text-center text-gray-600 mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-orange-500 font-semibold ml-1 hover:text-orange-600"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}


// Export Registration component
export default Registration;
