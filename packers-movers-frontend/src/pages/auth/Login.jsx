
// Import useState
import { useState } from "react";

// Import Link and useNavigate
import { Link, useNavigate } from "react-router-dom";

// Import our axios instance
import api from "../../services/api";


function Login() {

  // Store username and password
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  // Store error message
  const [error, setError] = useState("");


  // Navigate to another page
  const navigate = useNavigate();


  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // Handle login
  const handleSubmit = (e) => {

    // Prevent page refresh
    e.preventDefault();

    // Clear old error
    setError("");


    // Send login data to Django
    api.post("login/", formData)

      .then((response) => {

        // Store access token in browser
        localStorage.setItem(
          "access_token",
          response.data.access
        );


        // Store refresh token in browser
        localStorage.setItem(
          "refresh_token",
          response.data.refresh
        );


        // Show success message
        alert("Login successful");


        // Go to home page
        navigate("/");

      })

      .catch((error) => {

        // Show error in console
        console.log("Login error:", error.response?.data);

        // Show error message
        setError(
          error.response?.data?.message ||
          "Invalid username or password."
        );

      });

  };


  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">

      {/* Login container */}
      <div className="max-w-md mx-auto">


        {/* Page heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            Login to continue
          </p>

        </div>


        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md"
        >


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


          {/* Password */}
          <div className="mb-6">

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


          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>


          {/* Registration link */}
          <p className="text-center text-gray-600 mt-6">

            Don't have an account?

            <Link
              to="/registration"
              className="text-orange-500 font-semibold ml-1 hover:text-orange-600"
            >
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}


// Export Login component
export default Login;
