import React from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineMailOutline, MdPerson } from 'react-icons/md';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-full w-full object-cover md:w-48"
                                src={`${import.meta.env.VITE_API_URI}/${user?.userImage}`}
                                // src='https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-stylish-hairstyle-glasses_1142-40217.jpg?t=st=1721937764~exp=1721941364~hmac=0e505de10398ca0068dd9858617378509b740161e46203edb2470afc66520182&w=740'
                                alt={`${user?.name || user?.FirstName}`}
                            />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                Profile
                            </div>
                            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {user?.name}
                            </h1>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center text-gray-600">
                                    <MdOutlineMailOutline className="flex-shrink-0 mr-3 h-6 w-6 text-indigo-500" />
                                    <a href={`mailto:${user?.email}`} className="text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out">
                                        {user?.email}
                                    </a>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MdPerson className="flex-shrink-0 mr-3 h-6 w-6 text-indigo-500" />
                                    <span>{user?.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 bg-white shadow-xl rounded-3xl overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 sm:pt-7 sm:pb-1">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Information</h3>
                        <div className="mt-5 border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.role}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;