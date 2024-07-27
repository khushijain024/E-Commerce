import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByUserId, deleteOrderById } from '../../redux/slices/orderSlice';
import { FaBox, FaUser, FaCreditCard, FaTruck } from 'react-icons/fa';

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUserId(user._id));
    }
  }, [dispatch, user]);

  const handleCancelOrder = (orderId) => {
    dispatch(deleteOrderById(orderId));
  };

  const canCancelOrder = (products) => {
    return products.every(product =>
      product.status !== 'delivered' && product.status !== 'cancelled'
    );
  };

  const sortedOrders = orders ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  if (status === 'loading') {
    return <div className='flex items-center justify-center h-screen text-2xl font-semibold text-gray-600'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='flex items-center justify-center h-screen text-2xl font-semibold text-red-600'>Error: {error}</div>;
  }

  if (status === 'succeeded' && sortedOrders.length === 0) {
    return <div className='flex items-center justify-center h-screen text-2xl font-semibold text-gray-600'>No orders found.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-900">My Orders</h2>
        <div className="space-y-8">
          {sortedOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Order ID: {order._id}</h3>
                <p className="text-indigo-200">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-indigo-50 p-4 rounded-xl">
                    <h4 className="font-bold text-xl mb-3 text-indigo-900 flex items-center">
                      <FaUser className="mr-2" /> Customer Details
                    </h4>
                    <p className='capitalize'><span className='font-semibold'>Name:</span> {order.customerName}</p>
                    <p><span className='font-semibold'>Contact:</span> {order.customerContactNumber}</p>
                    <p><span className='font-semibold'>Address:</span> {order.address}</p>
                    <p><span className='font-semibold'>Pin Code:</span> {order.pinCode}</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-xl">
                    <h4 className="font-bold text-xl mb-3 text-indigo-900 flex items-center">
                      <FaCreditCard className="mr-2" /> Payment Details
                    </h4>
                    <p className='capitalize'><span className='font-semibold'>Status:</span> {order.paymentStatus}</p>
                    <p className='break-words'><span className='font-semibold'>Transaction ID:</span> {order.transactionId}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-2xl text-indigo-900 flex items-center">
                    <FaBox className="mr-2" /> Products
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.product.map((product, index) => (
                      <div key={index} className="bg-indigo-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                        <p className="font-bold text-lg mb-2 text-indigo-900">{product.productName}</p>
                        <p><span className='font-semibold'>Price:</span> ₹{product.productPrice}</p>
                        <p className="line-clamp-2 hover:line-clamp-none"><span className='font-semibold'>Description:</span> {product.productDesc}</p>
                        <p><span className='font-semibold'>Category:</span> {product.productCategory}</p>
                        <p className='capitalize'><span className='font-semibold'>Status:</span> 
                          <span className={`ml-1 ${
                            product.status === 'delivered' ? 'text-green-600' : 
                            product.status === 'cancelled' ? 'text-red-600' : 'text-purple-600'
                          }`}>
                            {product.status === "true" ? "Pending" : product.status}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    {canCancelOrder(order.product) && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition duration-300 font-semibold flex items-center"
                      >
                        <FaTruck className="mr-2" /> Cancel Order
                      </button>
                    )}
                  </div>
                  <div>
                    {order.product.some(product => product.status === 'cancelled') && (
                      <p className="text-red-500 font-semibold">This order has been cancelled.</p>
                    )}
                    {order.product.every(product => product.status === 'delivered') && (
                      <p className="text-green-500 font-semibold">This order has been delivered.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;