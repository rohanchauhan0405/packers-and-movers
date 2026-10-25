import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, User } from "lucide-react";
import api from "../../services/api";

function AdminLogin() {

  // Store username and password
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Store error message
  const [error, setError] = useState("");

  // Used to navigate to another page
  const navigate = useNavigate();


  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // Handle login
  const handleSubmit = async (e) => {

    // Stop page refresh
    e.preventDefault();

    // Clear previous error
    setError("");

    try {

      // Send login details to Django
      const response = await api.post("admin-login/", formData);

      // Save JWT access token
      localStorage.setItem(
        "access_token",
        response.data.access
      );

      // Save refresh token
      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      // Save admin login status
      localStorage.setItem(
        "admin_logged_in",
        "true"
      );

      // Go to admin dashboard
      navigate("/admin");

    } catch (error) {

      console.log(
        "Admin Login Error:",
        error.response?.data
      );

      // Show Django error
      setError(
        error.response?.data?.message ||
        "Invalid admin username or password."
      );

    }

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center px-4">

      {/* Login Card */}
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Top Section */}
          <div className="bg-gray-900 text-white px-8 py-10 text-center">

            {/* Icon */}
            <div className="w-20 h-20 mx-auto bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">

              <ShieldCheck size={42} />

            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mt-5">
              Admin Login
            </h1>

            <p className="text-gray-400 mt-2">
              Secure Shift Administration
            </p>

          </div>


          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="p-8"
          >

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}


            {/* Username */}
            <div className="mb-5">

              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />

              </div>

            </div>


            {/* Password */}
            <div className="mb-6">

              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />

              </div>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
            >
              Login to Admin Panel
            </button>


            {/* Security Message */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-6">

              <ShieldCheck size={17} />

              <span>
                Secure administrator access
              </span>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;