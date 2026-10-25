// Import React hooks
import { useEffect, useState } from "react";

// Import API connection
import api from "../../services/api";

import AdminLayout from "../../components/AdminLayout";

// Import icons
import {
  Package,
  ClipboardList,
  Clock,
  CheckCircle,
  ArrowRight,
  Truck,
} from "lucide-react";

// Import navigation link
import { Link } from "react-router-dom";

function AdminHome() {
  // Store dashboard statistics
  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    pending: 0,
    completed: 0,
  });

  // Store recent bookings
  const [recentBookings, setRecentBookings] = useState([]);

  // Store loading state
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // Get services
    const servicesRequest = api.get("services/");

    // Get bookings using the login token
    const bookingsRequest = api.get("booking/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Process both API responses
    Promise.all([servicesRequest, bookingsRequest])
      .then(([servicesResponse, bookingsResponse]) => {
        const services = servicesResponse.data;
        const bookings = bookingsResponse.data;

        // Count bookings by status
        const pending = bookings.filter(
          (booking) =>
            !booking.status || booking.status === "Pending"
        ).length;

        const completed = bookings.filter(
          (booking) => booking.status === "Completed"
        ).length;

        // Update statistics
        setStats({
          services: services.length,
          bookings: bookings.length,
          pending: pending,
          completed: completed,
        });

        // Show the latest five bookings
        setRecentBookings(bookings.slice(-5).reverse());
      })
      .catch((error) => {
        console.log(
          "Dashboard Error:",
          error.response?.data || error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Dashboard statistic cards
  const cards = [
    {
      title: "Total Services",
      value: stats.services,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Bookings",
      value: stats.bookings,
      icon: ClipboardList,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending Bookings",
      value: stats.pending,
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Completed Bookings",
      value: stats.completed,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
     <AdminLayout>

    {/* Keep all your dashboard content here */}

    <div className="space-y-8">

      {/* Welcome section */}
      <section className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <p className="text-orange-100 font-medium">
              ADMIN DASHBOARD
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Welcome Back!
            </h1>

            <p className="text-orange-50 mt-3">
              Manage your moving services and customer bookings in one place.
            </p>
          </div>

          <div className="hidden sm:flex w-20 h-20 bg-white/20 rounded-2xl items-center justify-center">
            <Truck size={44} />
          </div>

        </div>
      </section>


      {/* Statistics */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Overview
          </h2>

          <span className="text-sm text-gray-500">
            Live API data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      {card.title}
                    </p>

                    <h3 className="text-3xl font-bold text-gray-900 mt-3">
                      {loading ? "..." : card.value}
                    </h3>
                  </div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                    <Icon size={25} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </section>


      {/* Recent bookings */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-5 md:p-6 flex items-center justify-between gap-3 border-b border-gray-100">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Recent Bookings
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Latest customer booking requests
            </p>
          </div>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700"
          >
            View All
            <ArrowRight size={18} />
          </Link>

        </div>


        {/* Booking list */}
        <div className="overflow-x-auto">

          {loading ? (
            <p className="p-6 text-gray-500">
              Loading bookings...
            </p>
          ) : recentBookings.length === 0 ? (
            <div className="p-10 text-center">
              <ClipboardList
                size={42}
                className="mx-auto text-gray-300 mb-3"
              />

              <p className="text-gray-600 font-medium">
                No bookings available
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Customer requests will appear here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left">

              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Moving Route</th>
                  <th className="px-5 py-4 font-medium">Move Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {recentBookings.map((booking) => {
                  const status = booking.status || "Pending";

                  return (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">
                          {booking.name || "Customer"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {booking.email}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {booking.location || "-"} → {booking.shiftingloc || "-"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {booking.shiftingdate || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : status === "Confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}

              </tbody>

            </table>
          )}

        </div>

      </section>

    </div>
      </AdminLayout>
  );
}

export default AdminHome;
