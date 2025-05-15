import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 shadow-md bg-gray-100 flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={70} className="text-gray-400" />
          )}
        </div>
        <button
          onClick={() => setProfileAvatarEdit(true)}
          className="mt-3 text-sm font-medium border border-primary-100 text-primary-200 hover:bg-primary-100 hover:text-neutral-800 px-4 py-1.5 rounded-full transition"
        >
          Edit Avatar
        </button>
      </div>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className="p-2.5 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="grid">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="p-2.5 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="grid">
          <label
            htmlFor="mobile"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Enter your mobile number"
            className="p-2.5 bg-blue-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={userData.mobile}
            onChange={handleOnChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-primary-200 text-white font-semibold py-2 rounded hover:bg-primary-100 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
