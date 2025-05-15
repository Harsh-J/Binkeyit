import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const location = useLocation();
  const message = Boolean(location?.state?.text)
    ? location.state.text
    : "Payment";

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 bg-green-50">
      <div className="w-full max-w-md bg-green-100 border border-green-300 p-6 rounded-xl shadow-md text-center animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <FaCheckCircle size={60} className="text-green-600 animate-bounce" />
          <h2 className="text-xl sm:text-2xl font-bold text-green-800">
            {message} Done Successfully!
          </h2>
          <p className="text-green-700 text-sm">
            Thank you! Your transaction has been processed.
          </p>

          {/* Buttons side by side */}
          <div className="flex gap-4 mt-4 flex-wrap justify-center">
            <Link
              to="/"
              className="px-6 py-2 rounded-full border border-green-700 text-green-800 font-medium hover:bg-green-700 hover:text-white transition-all duration-300"
            >
              Go to Home
            </Link>
            <Link
              to="/dashboard/myorders"
              className="px-6 py-2 rounded-full border border-green-700 text-green-800 font-medium hover:bg-green-700 hover:text-white transition-all duration-300"
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
