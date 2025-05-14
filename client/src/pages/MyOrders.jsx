import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order Items", orders)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="my-6 px-4 sm:px-6 lg:px-8">
  <div className="bg-white shadow-md rounded-lg px-6 py-5 flex justify-between items-center">
    <h2 className="text-2xl font-semibold text-gray-800">My Orders</h2>
   
  </div>
</div>

      {/* Display No Orders */}
      {!orders[0] && <NoData />}

      {/* Map Orders */}
      <div className="p-4">
        {orders.map((order, index) => (
          <div
            key={order._id + index + "order"}
            className="bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-200 hover:shadow-xl hover:bg-gray-50"
          >
            <p className="text-gray-600 text-sm mb-2">Order No: <span className="font-semibold">{order?.orderId}</span></p>

            <div className="flex items-center gap-4">
              {/* Product Image */}
              <img
                src={order.product_details.image[0]}
                alt={order.product_details.name}
                className="w-16 h-16 object-cover rounded-md"
              />

              {/* Product Name */}
              <div>
                <p className="text-md font-medium text-gray-800">{order.product_details.name}</p>
                <p className="text-gray-500 text-sm">{order.product_details.unit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
