import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
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
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          {user.role === "ADMIN" && (
            <span className="text-medium text-red-600"> (Admin)</span>
          )}
        </span>
        <Link
          onClick={handleClose}
          to="/dashboard/profile"
          className="hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/category"
            className={`px-3 py-2 rounded-md text-left transition ${
              isActive("/dashboard/category")
                ? "bg-green-100 font-medium"
                : "bg-gray-100 hover:bg-gray-200"
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
                : "bg-gray-100 hover:bg-gray-200"
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
                : "bg-gray-100 hover:bg-gray-200"
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
                : "bg-gray-100 hover:bg-gray-200"
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
              : "bg-gray-100 hover:bg-gray-200"
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
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 bg-red-100 text-left rounded-md hover:bg-red-200 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
