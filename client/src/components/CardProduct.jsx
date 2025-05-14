import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);

  return (
    <Link
      to={url}
      className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
          alt={data.name}
        />
      </div>

      <div className="px-1 flex lg:flex items-center justify-between gap-1 flex-wrap text-xs">
        <span className="bg-green-50 text-green-600 px-2 py-[2px] rounded">
          10 min
        </span>
        {Boolean(data.discount) && (
          <span className="bg-green-100 text-green-600 px-2 py-[2px] rounded-full">
            {data.discount}% OFF
          </span>
        )}
      </div>

      <div className="px-2 max-w-40 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.name}
      </div>

      <div className="w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base">
        {data.unit}
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">
            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </div>
        </div>
        <div>
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
