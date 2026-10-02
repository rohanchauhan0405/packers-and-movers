
// Import useEffect and useState
import { useEffect, useState } from "react";

// Import axios instance
import api from "../../services/api";

// Import icons
import { Package, IndianRupee } from "lucide-react";


function Services() {

  // Store services received from Django
  const [services, setServices] = useState([]);


  // Run when page loads
  useEffect(() => {

    // Call Django Services API
    api.get("services/")
      .then((response) => {

        // Store Django response
        setServices(response.data);

      })
      .catch((error) => {

        // Show error in console
        console.log("Error fetching services:", error);

      });

  }, []);


  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">

      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">

        <p className="text-orange-500 font-semibold uppercase tracking-wide">
          Our Services
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Moving Services
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Choose the right moving service for your relocation.
          We make your move safe, simple and stress-free.
        </p>

      </div>


      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Display services from Django */}
          {services.map((service) => (

            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >

              {/* SERVICE IMAGE */}
              {service.image && (
                <img
                  src={"http://127.0.0.1:8000" + service.image}
                  alt={service.title}
                  className="w-full h-52 object-cover"
                />
              )}


              {/* SERVICE DETAILS */}
              <div className="p-6">

                {/* ICON */}
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">

                  <Package
                    className="text-orange-500"
                    size={26}
                  />

                </div>


                {/* TITLE */}
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h2>


                {/* DESCRIPTION */}
                <p className="text-gray-600 leading-relaxed mb-5">
                  {service.description}
                </p>


                {/* PRICE */}
                <div className="flex items-center gap-1 text-orange-500 font-bold text-lg">

                  <IndianRupee size={20} />

                  {service.price}

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* NO SERVICES */}
        {services.length === 0 && (

          <div className="text-center py-16">

            <Package
              className="mx-auto text-gray-400 mb-4"
              size={45}
            />

            <p className="text-gray-500 text-lg">
              No services available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}


// IMPORTANT: Export Services component
export default Services;
