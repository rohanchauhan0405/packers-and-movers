
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

// Import authentication page
import Login from "./pages/auth/Login";

// Import admin page
import Bookings from "./pages/admin/Bookings";


function App() {
  return (
    <>
      {/* Common Header */}
      <Header />

      {/* Application Routes */}
      <Routes>

        {/* Public pages */}
        <Route path="/" element={<Index />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/registration" element={<Registration />} />

        <Route path="/login" element={<Login />} />

        <Route path="/request-quote" element={<RequestQuote />} />

        <Route path="/search" element={<Search />} />

        {/* Admin bookings page */}
        <Route path="/admin/bookings" element={<Bookings />} />

      </Routes>
    </>
  );
}

export default App;
