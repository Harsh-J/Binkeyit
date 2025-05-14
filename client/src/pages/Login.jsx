import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import Loading from "../components/Loading";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(data).every((val) => val.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoginLoading(true);
      const response = await Axios({
        ...SummaryApi.login,
        data,
        validateStatus: (status) => status >= 200 && status < 500,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        setData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      AxiosToastError(error.message);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-green-100 px-4">
      <div className="bg-white shadow-lg w-full max-w-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-800">Login to Binkeyit</h2>
        <p className="text-center text-gray-600 mt-2 mb-6">Welcome back! Please enter your details</p>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
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
                {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="block text-right text-sm text-green-700 mt-1 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoginLoading}
            className={`w-full py-3 mt-2 rounded font-semibold tracking-wide text-white transition-all duration-200 ${
              isFormValid && !isLoginLoading
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoginLoading ? <Loading /> : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-700 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
