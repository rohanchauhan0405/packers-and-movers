// Import useState
import { useState } from "react";

// Import Django API
import api from "../../services/api";

function Contact() {

  // Store form data
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    email: "",
    subject: "",
    message: "",
  });

  // Store success/error message
  const [message, setMessage] = useState("");


  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // Submit contact form
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Send contact data to Django
      await api.post("contact/", formData);

      // Show success message
      setMessage("Your message has been sent successfully.");

      // Clear form
      setFormData({
        name: "",
        contact_no: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {

      console.log(
        "Contact Error:",
        error.response?.data
      );

      setMessage("Failed to send your message.");

    }

  };


  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-28 pb-16">

      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-8">

        <p className="text-orange-500 font-semibold">
          CONTACT US
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Get In Touch
        </h1>

        <p className="text-gray-600 mt-2">
          Have a question? Send us a message.
        </p>

      </div>


      {/* Contact form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-5 md:p-8 rounded-2xl shadow-md"
      >

        {/* Message */}
        {message && (
          <div className="bg-orange-50 text-orange-600 p-3 rounded-lg mb-5">
            {message}
          </div>
        )}


        {/* Form fields */}
        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            className="border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />

        </div>


        {/* Message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows="5"
          required
          className="w-full mt-5 border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
        />


        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-5 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Send Message
        </button>

      </form>

    </div>
  );
}

export default Contact;
