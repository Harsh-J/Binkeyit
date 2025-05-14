import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: id,
        },
      });
      if (response.data.success) {
        toast.success("Address Removed");
        if (fetchAddress) {
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4">
      {/* Header Section */}
      <div className="my-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg px-6 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Address</h2>
          <button
            onClick={() => setOpenAddress(true)}
            className="bg-yellow-400 text-yellow-900 font-medium px-5 py-2 rounded-full text-sm shadow hover:bg-yellow-500 hover:shadow-lg transition duration-200"
          >
            + Add Address
          </button>
        </div>
      </div>

      {/* Address Cards */}
      <div className="mt-6 bg-blue-50 p-4 rounded-md grid gap-4">
        {addressList.map((address, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 bg-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-200 hover:shadow-md ${
              !address.status && "hidden"
            }`}
          >
            <div className="text-gray-700 space-y-1 w-full">
              <p className="font-medium text-base">{address.address_line}</p>
              <p className="text-sm">{address.city}</p>
              <p className="text-sm">{address.state}</p>
              <p className="text-sm">
                {address.country} - {address.pincode}
              </p>
              <p className="text-sm">📞 {address.mobile}</p>
            </div>
            <div className="flex gap-3 self-end sm:self-auto">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(address);
                }}
                className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-600 hover:text-white transition"
                title="Edit Address"
              >
                <MdEdit size={20} />
              </button>
              <button
                onClick={() => handleDisableAddress(address._id)}
                className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-600 hover:text-white transition"
                title="Delete Address"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}

        {/* Add More Address (Clickable Box) */}
        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 bg-white border-2 border-dashed rounded-md flex justify-center items-center cursor-pointer text-primary-600 hover:bg-primary-100 transition"
        >
          + Add address
        </div>
      </div>

      {/* Modals */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

      {OpenEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
    </div>
  );
};

export default Address;
