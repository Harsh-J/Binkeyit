import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistererdLoading, setIsRegistererdLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must match");
      return;
    }

    try {
      setIsRegistererdLoading(true);
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        setIsRegistererdLoading(false);

        toast.error(response.data.message);
      }

      if (response.data.success) {
        setIsRegistererdLoading(false);

        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      setIsRegistererdLoading(false);

      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-green-100 px-4">
      <div className="bg-white shadow-lg w-full max-w-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Join Binkeyit today — it’s fast and easy!
        </p>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoFocus
              className="w-full mt-1 p-3 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-3 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md bg-blue-50 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-md bg-blue-50 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!valideValue}
            className={`w-full py-3 mt-2 rounded font-semibold tracking-wide text-white transition-all duration-200 ${
              valideValue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isRegistererdLoading ? <Loading /> : "Register"}
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

export default Register;
