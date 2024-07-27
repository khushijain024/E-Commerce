import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
};



export default function UserDataTable({ open, setOpen, setOpenSnackBar }) {

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setFormData({});
        setEdit(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/getAllUsers`);

            const newRows = response.data.data.map((item, i) => {
                return { ...item, id: i + 1 }
            });
            setRows(newRows);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSwitch = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URI}/users/updateUser/${formData._id}`, formData);
            setOpenSnackBar(true);
            handleClose();
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditCLick = (data) => {
        setEdit(true)
        setFormData(data);
        setOpen(true);
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URI}/users/deleteUser/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'userImage',
            headerName: 'Profile',
            width: 80,
            renderCell: (params) => (
                <img
                    src={`${import.meta.env.VITE_API_URI}/${params.row.userImage}`}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
            ),
        },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 240 },
        { field: 'contactNumber', headerName: 'Contact Number', width: 160 },
        {
            field: 'password',
            headerName: 'Password',
            width: 130,
            renderCell: () => <div className="font-mono">•••••</div>
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
            renderCell: (params) => (
                <div className={`px-2 text-center py-1 rounded-full text-xs font-medium ${params.row.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {params.row.status ? "Active" : "Inactive"}
                </div>
            )
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => (
                <div className='flex gap-2'>
                    <button
                        onClick={() => handleEditCLick(params.row)}
                        className="p-1 bg-gradient-to-br from-purple-50 to-indigo-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-200"
                    >
                        <CiEdit className='text-xl' />
                    </button>
                    <button
                        onClick={() => handleDelete(params.row._id)}
                        className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200"
                    >
                        <MdDelete className='text-xl' />
                    </button>
                </div>
            )
        },
    ];

    if (loading) {
        return (
            <div className='h-[69vh] flex justify-center items-center'>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="h-[430px] w-full bg-white shadow-lg rounded-lg overflow-hidden" >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4">
                        {edit ? "Edit User" : "Add User"}
                    </Typography>
                    <br />
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                name="firstName"
                                onChange={handleChange}
                                value={formData.firstName || ""}
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                name="lastName"
                                onChange={handleChange}
                                value={formData.lastName || ""}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                name="email"
                                onChange={handleChange}
                                value={formData.email || ""}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                name="password"
                                onChange={handleChange}
                                disabled={edit}
                                value={formData.password || ""}
                            />
                            <input
                                type="number"
                                placeholder="Contact Number"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                name="contactNumber"
                                onChange={handleChange}
                                value={formData.contactNumber || ""}
                            />
                            <div>
                                <div className="col-span-2 p-3">
                                    <div className="flex items-center">
                                        <Switch
                                            checked={formData.status}
                                            name="status"
                                            onChange={handleSwitch}
                                            color="primary"
                                        />
                                        <span className="ml-2 text-gray-600">{formData.status ? "Active" : "Inactive"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}