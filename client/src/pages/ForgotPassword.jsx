import React, { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [emailSentLoading, setEmailSentLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setEmailSentLoading(true);
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        setEmailSentLoading(false);
        toast.error(response.data.message);
      }

      if (response.data.success) {
        setEmailSentLoading(false);
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      setEmailSentLoading(false);
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white shadow-lg w-full max-w-md rounded-lg p-8">
        <p className="font-semibold text-2xl text-center text-green-800 mb-4">
          Forgot Password
        </p>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email to receive a password reset link
        </p>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-3 bg-blue-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-400"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!valideValue || emailSentLoading}
            className={`w-full py-3 mt-2 rounded font-semibold text-white tracking-wide transition-all duration-200 ${
              valideValue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {emailSentLoading ? <Loading /> : "Send OTP"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
