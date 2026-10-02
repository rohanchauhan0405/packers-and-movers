// Import React hooks
import { useEffect, useState } from "react";

// Import API
import api from "../../services/api";

function RequestQuote() {

  // Services received from Django
  const [services, setServices] = useState([]);

  // Booking form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    shiftingloc: "",
    shiftingdate: "",
    briefitems: "",
    items: "",
    remarks: "",
    service: "",
    total_amount: "",
    advance_paid: "",
  });

  // Success / error message
  const [message, setMessage] = useState("");


  // Get services from Django
  useEffect(() => {
    api.get("services/")
      .then((response) => setServices(response.data))
      .catch((error) => console.log("Services Error:", error));
  }, []);


  // Handle all input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get JWT token
    const token = localStorage.getItem("access_token");

    if (!token) {
      setMessage("Please login before requesting a quote.");
      return;
    }

    try {
      await api.post("booking/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Quotation request submitted successfully.");

      // Clear form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        location: "",
        shiftingloc: "",
        shiftingdate: "",
        briefitems: "",
        items: "",
        remarks: "",
        service: "",
        total_amount: "",
        advance_paid: "",
      });

    } catch (error) {
      console.log("Booking Error:", error.response?.data);

      setMessage(
        error.response?.data?.detail || "Quotation request failed."
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-28 pb-16">

      {/* Page heading */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-orange-500 font-semibold">
          REQUEST QUOTE
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Plan Your Move
        </h1>

        <p className="text-gray-600 mt-2">
          Enter your moving details
        </p>
      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-5 md:p-8 rounded-2xl shadow-md"
      >

        {/* Message */}
        {message && (
          <div className="bg-orange-50 text-orange-600 p-3 rounded-lg mb-5">
            {message}
          </div>
        )}


        {/* Common responsive grid */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="input"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input"
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
            className="input"
          />

          {/* Current Location */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Current Location"
            required
            className="input"
          />

          {/* Destination */}
          <input
            type="text"
            name="shiftingloc"
            value={formData.shiftingloc}
            onChange={handleChange}
            placeholder="Shifting Location"
            required
            className="input"
          />

          {/* Date */}
          <input
            type="date"
            name="shiftingdate"
            value={formData.shiftingdate}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Brief Items */}
          <input
            type="text"
            name="briefitems"
            value={formData.briefitems}
            onChange={handleChange}
            placeholder="Brief Items"
            className="input"
          />

          {/* Service */}
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="input bg-white"
          >
            <option value="">Select Service</option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>

        </div>


        {/* Item Details */}
        <textarea
          name="items"
          value={formData.items}
          onChange={handleChange}
          placeholder="Item Details"
          rows="4"
          className="input mt-5"
        />


        {/* Remarks */}
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Remarks"
          rows="3"
          className="input mt-5"
        />


        {/* Amount fields */}
        <div className="grid gap-5 md:grid-cols-2 mt-5">

          <input
            type="number"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
            placeholder="Total Amount"
            className="input"
          />

          <input
            type="number"
            name="advance_paid"
            value={formData.advance_paid}
            onChange={handleChange}
            placeholder="Advance Paid"
            className="input"
          />

        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Submit Request
        </button>

      </form>
    </div>
  );
}

export default RequestQuote;
