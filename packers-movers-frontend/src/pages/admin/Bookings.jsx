// Import React hooks
import { useEffect, useState } from "react";

// Import Django API
import api from "../../services/api";

function Bookings() {

  // Store bookings from Django
  const [bookings, setBookings] = useState([]);

  // Store selected booking
  const [selectedBooking, setSelectedBooking] = useState(null);


  // Get all bookings
  useEffect(() => {

    const token = localStorage.getItem("access_token");

    api.get("booking/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log("Booking Error:", error.response?.data);
      });

  }, []);


  // Update booking status
  const updateStatus = async (id, statusValue) => {

    const token = localStorage.getItem("access_token");

    try {

      const response = await api.patch(
        `booking/${id}/`,
        { status: statusValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update booking in React
      setBookings(
        bookings.map((booking) =>
          booking.id === id ? response.data : booking
        )
      );

      // Update selected booking if open
      if (selectedBooking?.id === id) {
        setSelectedBooking(response.data);
      }

    } catch (error) {

      console.log(
        "Status Update Error:",
        error.response?.data
      );

    }
  };


  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-28 pb-16">

      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-8">

        <p className="text-orange-500 font-semibold">
          ADMIN
        </p>

        <h1 className="text-3xl font-bold text-gray-900">
          Booking Requests
        </h1>

      </div>


      {/* Booking list */}
      <div className="max-w-6xl mx-auto grid gap-5">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-sm p-5"
          >

            <div className="grid gap-4 md:grid-cols-4">

              {/* Customer */}
              <div>

                <p className="text-sm text-gray-500">
                  Customer
                </p>

                <p className="font-semibold">
                  {booking.name}
                </p>

                <p className="text-sm text-gray-600">
                  {booking.email}
                </p>

                <p className="text-sm text-gray-600">
                  {booking.mobile}
                </p>

              </div>


              {/* Moving details */}
              <div>

                <p className="text-sm text-gray-500">
                  Moving
                </p>

                <p>
                  {booking.location} → {booking.shiftingloc}
                </p>

                <p className="text-sm text-gray-600">
                  {booking.shiftingdate}
                </p>

              </div>


              {/* Status */}
              <div>

                <p className="text-sm text-gray-500 mb-1">
                  Status
                </p>

                <select
                  value={booking.status || "Pending"}
                  onChange={(e) =>
                    updateStatus(booking.id, e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>


              {/* View details */}
              <div className="flex items-center md:justify-end">

                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="w-full md:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  View Details
                </button>

              </div>

            </div>

          </div>

        ))}


        {/* No bookings */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No booking requests found.
          </div>
        )}

      </div>


      {/* Booking details */}
      {selectedBooking && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Booking Details
              </h2>

              <button
                onClick={() => setSelectedBooking(null)}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>


            {/* Booking information */}
            <div className="grid gap-4 md:grid-cols-2">

              <p>
                <strong>Name:</strong> {selectedBooking.name}
              </p>

              <p>
                <strong>Email:</strong> {selectedBooking.email}
              </p>

              <p>
                <strong>Mobile:</strong> {selectedBooking.mobile}
              </p>

              <p>
                <strong>From:</strong> {selectedBooking.location}
              </p>

              <p>
                <strong>To:</strong> {selectedBooking.shiftingloc}
              </p>

              <p>
                <strong>Date:</strong> {selectedBooking.shiftingdate}
              </p>

              <p>
                <strong>Service:</strong> {selectedBooking.service}
              </p>

              <p>
                <strong>Status:</strong> {selectedBooking.status}
              </p>

              <p>
                <strong>Total:</strong> ₹{selectedBooking.total_amount || 0}
              </p>

              <p>
                <strong>Advance:</strong> ₹{selectedBooking.advance_paid || 0}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {selectedBooking.payment_status || "Pending"}
              </p>

            </div>


            {/* Items */}
            <div className="mt-5">

              <p className="font-semibold">
                Items
              </p>

              <p className="text-gray-600 mt-1">
                {selectedBooking.items || "No details provided"}
              </p>

            </div>


            {/* Remarks */}
            <div className="mt-5">

              <p className="font-semibold">
                Remarks
              </p>

              <p className="text-gray-600 mt-1">
                {selectedBooking.remarks || "No remarks"}
              </p>

            </div>


            {/* Close */}
            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Bookings;
