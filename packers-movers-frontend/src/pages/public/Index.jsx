// Import icons from lucide-react
import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

// Import Link for navigation
import { Link } from "react-router-dom";


function Index() {

  return (
    <div className="pt-20">

      {/* ================= HERO SECTION ================= */}

      <section className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div>

              <p className="text-orange-500 font-semibold mb-3">
                SAFE • FAST • RELIABLE
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Moving Made
                <span className="text-orange-500"> Simple.</span>
              </h1>

              <p className="text-gray-300 text-lg mt-6 max-w-xl">
                Reliable packers and movers for homes, offices and
                businesses. We make your move safe, smooth and stress-free.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  to="/request-quote"
                  className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  Get a Quote
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition"
                >
                  View Services
                </Link>

              </div>

            </div>


            {/* RIGHT CONTENT */}
            <div className="flex justify-center">

              <div className="bg-gray-800 rounded-3xl p-10">

                <Truck
                  size={180}
                  strokeWidth={1}
                  className="text-orange-500"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-orange-500 font-semibold">
              WHY CHOOSE US
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Moving With Confidence
            </h2>

          </div>


          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

            {/* SAFE */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition">

              <ShieldCheck
                className="text-orange-500 mb-4"
                size={35}
              />

              <h3 className="text-xl font-semibold">
                Safe Moving
              </h3>

              <p className="text-gray-600 mt-2">
                Your belongings are handled carefully throughout the move.
              </p>

            </div>


            {/* FAST */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition">

              <Clock
                className="text-orange-500 mb-4"
                size={35}
              />

              <h3 className="text-xl font-semibold">
                On Time
              </h3>

              <p className="text-gray-600 mt-2">
                We focus on timely pickup and delivery.
              </p>

            </div>


            {/* LOCATION */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition">

              <MapPin
                className="text-orange-500 mb-4"
                size={35}
              />

              <h3 className="text-xl font-semibold">
                Wide Coverage
              </h3>

              <p className="text-gray-600 mt-2">
                Moving services available across multiple cities.
              </p>

            </div>


            {/* RELIABLE */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition">

              <Truck
                className="text-orange-500 mb-4"
                size={35}
              />

              <h3 className="text-xl font-semibold">
                Reliable Service
              </h3>

              <p className="text-gray-600 mt-2">
                Professional support from booking to delivery.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CALL TO ACTION ================= */}

      <section className="bg-orange-500 py-14">

        <div className="max-w-4xl mx-auto px-6 text-center text-white">

          <h2 className="text-3xl md:text-4xl font-bold">
            Planning Your Next Move?
          </h2>

          <p className="mt-4 text-orange-100">
            Get a quote and let us make your moving experience easier.
          </p>

          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 mt-7 bg-gray-900 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Request a Quote
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}


export default Index;