import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineChevronRight } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        close?.();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => close?.();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="max-w-[95%] p-2">
      <div className="font-semibold">My Account</div>

      {/* User profile row (clickable) */}
      <Link onClick={handleClose} to="/dashboard/profile">
        <div className="flex items-center gap-2 p-2 rounded-md bg-gradient-to-r from-green-100 via-green-50 to-white border border-green-200 shadow-sm group transition-all duration-300 ease-in-out hover:shadow-md">
          <span className="max-w-[160px] text-green-800 text-sm font-medium truncate group-hover:text-green-900 transition-all duration-200">
            {user.name || user.mobile}
            {user.role === "ADMIN" && (
              <span className="ml-1 text-green-600 font-bold animate-pulse">
                (Admin)
              </span>
            )}
          </span>
          <HiOutlineChevronRight
            size={16}
            className="text-green-600 group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>
      </Link>

      <Divider />

      {/* Menu Links */}
      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/category"
            className={`px-3 py-2 rounded-md text-left transition ${
              isActive("/dashboard/category")
                ? "bg-green-100 font-medium"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/subcategory"
            className={`px-3 py-2 rounded-md text-left transition ${
              isActive("/dashboard/subcategory")
                ? "bg-green-100 font-medium"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/upload-product"
            className={`px-3 py-2 rounded-md text-left transition ${
              isActive("/dashboard/upload-product")
                ? "bg-green-100 font-medium"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/product"
            className={`px-3 py-2 rounded-md text-left transition ${
              isActive("/dashboard/product")
                ? "bg-green-100 font-medium"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            Product
          </Link>
        )}

        <Link
          onClick={handleClose}
          to="/dashboard/myorders"
          className={`px-3 py-2 rounded-md text-left transition ${
            isActive("/dashboard/myorders")
              ? "bg-green-100 font-medium"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to="/dashboard/address"
          className={`px-3 py-2 rounded-md text-left transition ${
            isActive("/dashboard/address")
              ? "bg-green-100 font-medium"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-left rounded-md hover:bg-red-200 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
