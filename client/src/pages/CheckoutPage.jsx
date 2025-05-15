import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem?.();
        fetchOrder?.();
        navigate("/success", { state: { text: "Order" } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading...");
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      stripePromise.redirectToCheckout({ sessionId: response.data.id });
      fetchCartItem?.();
      fetchOrder?.();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10 lg:py-14">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-10">
        {/* Address Section */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Select Delivery Address
          </h2>

          <div className="space-y-5">
            {addressList.map((address, index) => (
              address.status && (
                <label
                  key={index}
                  htmlFor={`address-${index}`}
                  className="block bg-white border rounded-xl shadow-sm hover:shadow-md p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="address"
                      id={`address-${index}`}
                      value={index}
                      checked={Number(selectAddress) === index}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <p className="font-semibold">{address.address_line}</p>
                      <p>{address.city}, {address.state}</p>
                      <p>{address.country} - {address.pincode}</p>
                      <p className="text-sm text-gray-600">Mobile: {address.mobile}</p>
                    </div>
                  </div>
                </label>
              )
            ))}

            <div
              onClick={() => setOpenAddress(true)}
              className="h-14 bg-blue-100 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center text-blue-700 font-medium cursor-pointer hover:bg-blue-200 transition"
            >
              + Add New Address
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-700">
              <span>Items Total</span>
              <div className="flex gap-2">
                <span className="line-through text-gray-400">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Quantity</span>
              <span>{totalQty} item(s)</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-gray-900 border-t pt-4">
              <span>Grand Total</span>
              <span>{DisplayPriceInRupees(totalPrice)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleOnlinePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-semibold transition"
            >
              Pay Online
            </button>
            <button
              onClick={handleCashOnDelivery}
              className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 px-4 rounded-md font-semibold transition"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
