// useState is used for mobile menu and user dropdown
import { useState } from "react";

// Link is used for page navigation
import { Link } from "react-router-dom";

// Icons from lucide-react
import {
  Menu,
  X,
  Truck,
  Home,
  Package,
  Info,
  MessageCircle,
  UserPlus,
  UserCog,
  User,
  LogOut,
} from "lucide-react";

function Header() {

  // Controls mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Controls user dropdown
  const [userMenu, setUserMenu] = useState(false);

  // Check whether user is logged in
  const isLoggedIn = localStorage.getItem("access_token");

  // Navigation items
  // Instead of writing the same Link again and again,
  // we store the information in this array and use map().
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Services", path: "/services", icon: Package },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: MessageCircle },
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Refresh Header after logout
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">

      {/* ================= HEADER ================= */}

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900 group"
        >
          <Truck
            size={30}
            className="text-orange-500 group-hover:translate-x-1 transition-transform duration-300"
          />

          <span>
            Secure <span className="text-orange-500">Shift</span>
          </span>
        </Link>


        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden md:flex items-center gap-7">

          {navItems.map((item) => {

            // Store the icon component
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="group flex items-center gap-1
                text-gray-700 font-medium
                hover:text-orange-500
                transition-all duration-300"
              >
                <Icon
                  size={18}
                  className="group-hover:-translate-y-1 transition-transform duration-300"
                />

                <span>{item.name}</span>
              </Link>
            );
          })}


          {/* ================= REGISTER ================= */}

          {!isLoggedIn && (
            <Link
              to="/registration"
              className="group flex items-center gap-2
              border border-orange-500 text-orange-500
              px-4 py-2 rounded-full font-medium
              hover:bg-orange-500 hover:text-white
              hover:-translate-y-1 hover:shadow-md
              transition-all duration-300"
            >
              <UserPlus
                size={18}
                className="group-hover:scale-110 transition-transform"
              />

              <span>Register</span>
            </Link>
          )}


          {/* ================= REQUEST QUOTE ================= */}

          <Link
            to="/request-quote"
            className="group flex items-center gap-2
            bg-orange-500 text-white
            px-5 py-2 rounded-full font-medium
            hover:bg-orange-600
            hover:-translate-y-1 hover:shadow-lg
            transition-all duration-300"
          >
            <Truck
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />

            <span>Request Quote</span>
          </Link>


          {/* ================= ADMIN ================= */}

          {/* Only changed /admin-login → /admin/bookings */}

          <Link
            to="/admin/bookings"
            className="group flex items-center gap-1
            text-gray-700 font-medium
            hover:text-orange-500
            transition-all duration-300"
          >
            <UserCog
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />

            <span>Admin</span>
          </Link>


          {/* ================= USER ICON ================= */}

          {isLoggedIn && (
            <div className="relative">

              {/* Circular user button */}

              <button
                onClick={() => setUserMenu(!userMenu)}
                className="w-10 h-10 rounded-full
                bg-orange-100 text-orange-500
                flex items-center justify-center
                border border-orange-200
                hover:bg-orange-500 hover:text-white
                hover:scale-105 hover:shadow-md
                transition-all duration-300"
              >
                <User size={20} />
              </button>


              {/* User dropdown */}

              {userMenu && (
                <div
                  className="absolute right-0 mt-3 w-40
                  bg-white rounded-xl shadow-lg
                  border border-gray-100 overflow-hidden"
                >

                  <button
                    className="w-full flex items-center gap-2
                    px-4 py-3 text-gray-700
                    hover:bg-orange-50 hover:text-orange-500"
                  >
                    <User size={17} />
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2
                    px-4 py-3 text-gray-700
                    hover:bg-red-50 hover:text-red-500"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 hover:text-orange-500"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">

          <div className="flex flex-col px-6 py-5 gap-2">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3
                  text-gray-700 font-medium
                  px-4 py-3 rounded-lg
                  hover:bg-orange-50 hover:text-orange-500
                  transition-all duration-300"
                >
                  <Icon
                    size={19}
                    className="group-hover:scale-110 transition-transform"
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}


            {/* REGISTER */}

            {!isLoggedIn && (
              <Link
                to="/registration"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3
                border border-orange-500 text-orange-500
                px-4 py-3 rounded-lg
                hover:bg-orange-500 hover:text-white
                transition-all duration-300"
              >
                <UserPlus size={19} />
                Register
              </Link>
            )}


            {/* REQUEST QUOTE */}

            <Link
              to="/request-quote"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2
              bg-orange-500 text-white
              px-4 py-3 rounded-lg
              hover:bg-orange-600
              transition-all duration-300"
            >
              <Truck size={19} />
              Request Quote
            </Link>


            {/* ADMIN */}

            {/* Only changed /admin-login → /admin/bookings */}

            <Link
              to="/admin/bookings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3
              text-gray-700 font-medium
              px-4 py-3 rounded-lg
              hover:bg-orange-50 hover:text-orange-500
              transition-all duration-300"
            >
              <UserCog size={19} />
              Admin
            </Link>


            {/* MOBILE LOGOUT */}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3
                text-gray-700 px-4 py-3 rounded-lg
                hover:bg-red-50 hover:text-red-500
                transition"
              >
                <LogOut size={19} />
                Logout
              </button>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}

export default Header;