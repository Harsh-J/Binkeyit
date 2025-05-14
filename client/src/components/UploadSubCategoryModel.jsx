import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
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

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploadLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setImageUploadLoading(false);
    setSubCategoryData((prev) => ({
      ...prev,
      image: ImageResponse.data.url,
    }));
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const updatedCategories = subCategoryData.category.filter(
      (cat) => cat._id !== categoryId
    );
    setSubCategoryData((prev) => ({
      ...prev,
      category: updatedCategories,
    }));
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add Sub Category</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sub Category Name */}
          <div>
            <label htmlFor="subCategoryName" className="text-sm font-medium text-gray-700">
              Sub Category Name
            </label>
            <input
              type="text"
              id="subCategoryName"
              name="name"
              value={subCategoryData.name}
              onChange={handleOnChange}
              placeholder="e.g. Mobile Phones"
              className="w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-2 focus:ring-primary-200 focus:outline-none"
            />
          </div>

          {/* Image Preview & Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Sub Category Image</label>
            <div className="w-full h-32 bg-gray-50 border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
              {subCategoryData.image ? (
                <img src={subCategoryData.image} alt="SubCategory" className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-400 text-sm">No image uploaded</span>
              )}
            </div>

            <label htmlFor="uploadSubCategoryImage" className="block w-fit mt-2">
              <div
                className={`px-4 py-2 text-sm font-medium rounded-md border transition cursor-pointer ${
                  !subCategoryData.name
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-primary-100 text-primary-800 border-primary-200 hover:bg-primary-200"
                }`}
              >
                {imageUploadLoading ? <Loading /> : "Upload Image"}
              </div>
              <input
                disabled={!subCategoryData.name}
                onChange={handleUploadSubCategoryImage}
                type="file"
                id="uploadSubCategoryImage"
                className="hidden"
              />
            </label>
          </div>

          {/* Select Categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Categories</label>
            <div className="space-y-1">
              {/* Display Selected Categories */}
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat) => (
                  <span
                    key={cat._id}
                    className="bg-white text-sm font-medium text-gray-700 px-3 py-1 rounded-full border"
                  >
                    {cat.name}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveCategorySelected(cat._id)}
                    >
                      <IoClose size={18} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Dropdown to Add Categories */}
              <select
                onChange={(e) => {
                  const selectedCategoryId = e.target.value;
                  const categoryDetails = allCategory.find(
                    (category) => category._id === selectedCategoryId
                  );
                  if (categoryDetails) {
                    setSubCategoryData((prev) => ({
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    }));
                  }
                }}
                className="w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-2 focus:ring-primary-200 focus:outline-none"
              >
                <option value="">Select Category</option>
                {allCategory.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!subCategoryData.name || !subCategoryData.image || subCategoryData.category.length === 0}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              subCategoryData.name && subCategoryData.image && subCategoryData.category.length > 0
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? <Loading /> : "Add Sub Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
