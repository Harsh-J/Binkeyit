import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploadLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setImageUploadLoading(false);
    setData((prev) => ({
      ...prev,
      image: ImageResponse.data.url,
    }));
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Category
          </h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div className="space-y-1">
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="e.g. Electronics"
              className="w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-2 focus:ring-primary-200 focus:outline-none"
            />
          </div>

          {/* Image Preview & Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Category Image
            </label>
            <div className="w-full h-40 bg-gray-50 border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
              {data.image ? (
                <img
                  src={data.image}
                  alt="Category"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">No image uploaded</span>
              )}
            </div>

            <div className="flex justify-center w-full">
              <label htmlFor="uploadCategoryImage" className="block w-fit">
                <div
                  className={`mt-2 px-4 py-2 text-sm font-medium rounded-md border transition cursor-pointer ${
                    !data.name
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-primary-100 text-primary-800 border-primary-200 hover:bg-primary-200"
                  }`}
                >
                  {imageUploadLoading ? <Loading /> : "Upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!data.name || !data.image}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              data.name && data.image
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? <Loading /> : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;