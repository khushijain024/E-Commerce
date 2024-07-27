import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaUpload, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('No file chosen');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : 'No file chosen');
        handleChange(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/users/signup`, data);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-white">Create Account</h2>
                </div>
                <form className="mt-8 space-y-6 bg-white shadow-2xl rounded-lg p-8" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="firstName" className="sr-only">First Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm pl-10"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="sr-only">Last Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm pl-10"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm pl-10"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm pl-10"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contactNumber" className="sr-only">Contact Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaPhone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm pl-10"
                                    placeholder="Contact No."
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="userImage"
                                    id="userImage"
                                    required
                                    className="sr-only"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="userImage"
                                    className="cursor-pointer bg-gray-50 text-gray-900 py-2 px-3 w-full inline-flex items-center justify-between border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out"
                                >
                                    <span className="flex items-center">
                                        <FaUpload className="mr-2 text-purple-600" />
                                        Choose Photo
                                    </span>
                                    <span className="text-gray-500 text-sm truncate max-w-[200px]">
                                        {fileName}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FaArrowRight className="h-5 w-5 text-purple-500 group-hover:text-purple-400" aria-hidden="true" />
                            </span>
                            Sign Up
                        </button>
                    </div>
                    <p className="mt-2 text-center text-sm text-gray-900">
                        Already have an account?{' '}
                        <Link to='/login' className="font-medium text-purple-900 hover:text-purple-800 transition duration-150 ease-in-out">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;