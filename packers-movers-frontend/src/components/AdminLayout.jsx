import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Truck,
} from "lucide-react";

function AdminLayout({ children }) {

  // Used to move the user to another page
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {

    // Remove admin access token
    localStorage.removeItem("access_token");

    // Remove admin login information
    localStorage.removeItem("admin_logged_in");

    // Go back to admin login
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= SIDEBAR ================= */}

      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">

        {/* Logo */}
        <div className="p-6 border-b border-gray-700">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center">
              <Truck size={24} />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Secure Shift
              </h1>

              <p className="text-xs text-gray-400">
                Admin Panel
              </p>
            </div>

          </div>

        </div>


        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">

          {/* Dashboard */}
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>


          {/* Bookings */}
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <ClipboardList size={20} />
            Bookings
          </Link>

        </nav>


        {/* Logout */}
        <div className="p-4 border-t border-gray-700">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN AREA ================= */}

      <main className="flex-1">

        {/* Top Header */}
        <header className="bg-white shadow-sm px-6 py-4">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Admin Panel
              </h2>

              <p className="text-sm text-gray-500">
                Manage your moving service website
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
              A
            </div>

          </div>

        </header>


        {/* Page Content */}
        <div className="p-6">

          {children}

        </div>

      </main>

    </div>
  );
}

export default AdminLayout;