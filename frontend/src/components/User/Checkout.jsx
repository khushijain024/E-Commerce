import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaPhone, FaAddressCard, FaCity, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const orderDetails = {
            userId: user._id,
            customerName: formData.get('customerName'),
            customerContactNumber: formData.get('customerContactNumber'),
            address: `${formData.get('address')},${formData.get("city")},${formData.get("state")}`,
            pinCode: formData.get('pinCode'),
            products: cartItems,
        };
        try {
            const stripe = await loadStripe(`${import.meta.env.VITE_API_PUBLISHABLE_KEY}`);
            const body = orderDetails

            const response = await axios.post(`${import.meta.env.VITE_API_URI}/create-checkout-session`, body)

            const result = stripe.redirectToCheckout({
                sessionId: response.data.id
            });
            if (result.error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
            alert('Payment failed. Please try again.');
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`}
                                    alt={item.productName}
                                    className='w-20 h-20 object-cover rounded-md shadow'
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600">Price: ₹{item.productPrice.toFixed(2)}</p>
                                </div>
                                <span className="font-bold text-gray-800">₹{(item.productPrice * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-800">Total:</span>
                            <span className="text-2xl font-bold text-purple-600">₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Details</h2>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaUser className="mr-4 text-gray-500" />
                            <input
                                type="text"
                                name="customerName"
                                placeholder="Customer Name"
                                required
                                className="flex-1 p-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaPhone className="mr-4 text-gray-500" />
                            <input
                                type="text"
                                name="customerContactNumber"
                                placeholder="Phone Number"
                                required
                                className="flex-1 p-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaAddressCard className="mr-4 text-gray-500" />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                required
                                className="flex-1 p-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaCity className="mr-4 text-gray-500" />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                required
                                className="flex-1 p-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaMapMarkerAlt className="mr-4 text-gray-500" />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                required
                                className="flex-1 p-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaMapPin className="mr-4 text-gray-500" />
                            <input
                                type="text"
                                name="pinCode"
                                placeholder="Pin Code"
                                required
                                className="flex-1 p-2 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-6 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 w-full text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            Place Order and Pay
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;