import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, [location?.state?.email, navigate]);

  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setOtpVerificationLoading(true);
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        setOtpVerificationLoading(false);
        toast.error(response.data.message);
      }

      if (response.data.success) {
        setOtpVerificationLoading(false);
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      setOtpVerificationLoading(false);
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-green-100 px-4">
      <div className="bg-white shadow-lg w-full max-w-md rounded-lg p-8">
        <p className="font-semibold text-2xl text-center text-green-800 mb-4">
          Enter OTP
        </p>
        <p className="text-center text-gray-600 mb-6">
          Please enter the OTP sent to your email address
        </p>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Enter Your OTP
            </label>
            <div className="flex gap-3 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-3 border border-gray-300 rounded-md outline-none text-center font-semibold focus:ring-2 focus:ring-green-400"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue || otpVerificationLoading}
            className={`w-full py-3 mt-4 rounded font-semibold text-white tracking-wide transition-all duration-200 ${
              valideValue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {otpVerificationLoading ? <Loading /> : "Verify OTP"}
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

export default OtpVerification;
