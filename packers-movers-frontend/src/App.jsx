// Import React Router components
import { Routes, Route } from "react-router-dom";

// Import Header
import Header from "./components/Header";

// Import pages
import Index from "./pages/public/Index";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import Registration from "./pages/public/Registration";
import RequestQuote from "./pages/public/RequestQuote";
import Search from "./pages/public/Search";

// Import authentication pages
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";

// Import admin pages
import AdminHome from "./pages/admin/AdminHome";
import Bookings from "./pages/admin/Bookings";


function App() {
  return (
    <>
      {/* Common Header */}
      <Header />

      {/* Application Routes */}
      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        {/* Home */}
        <Route
          path="/"
          element={<Index />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Services */}
        <Route
          path="/services"
          element={<Services />}
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Registration */}
        <Route
          path="/registration"
          element={<Registration />}
        />

        {/* User Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Request Quote */}
        <Route
          path="/request-quote"
          element={<RequestQuote />}
        />

        {/* Search */}
        <Route
          path="/search"
          element={<Search />}
        />


        {/* ================= ADMIN PAGES ================= */}

        {/* Admin Login */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<AdminHome />}
        />

        {/* Admin Bookings */}
        <Route
          path="/admin/bookings"
          element={<Bookings />}
        />

      </Routes>
    </>
  );
}

export default App;