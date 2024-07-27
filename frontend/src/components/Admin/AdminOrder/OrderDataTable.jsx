import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderById, fetchAllOrders, updateOrderStatus } from '../../../redux/slices/orderSlice';
import Button from '@mui/material/Button';
import { MdDelete } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

export default function OrderDataTable({ setOpenSnackBar }) {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    useEffect(() => {
        if (orders) {
            const newRows = orders.flatMap((order, orderIndex) =>
                order.product.map((prod, prodIndex) => ({
                    id: `${orderIndex}-${prodIndex}`,
                    _id: order._id,
                    customerName: order.customerName,
                    productName: prod.productName,
                    // productImage: prod.productImage,
                    quantity: prod.quantity,
                    totalAmount: `₹ ${(prod.productPrice * prod.quantity).toFixed(2)}`,
                    status: prod.status || 'pending',
                    paymentStatus: order.paymentStatus || 'pending',
                }))
            );
            setRows(newRows);
        }
    }, [orders]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteOrderById(id));
            setOpenSnackBar(true);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await dispatch(updateOrderStatus({ orderId: id, status: 'processing' }));
            setOpenSnackBar(true);
            setRows(prevRows => prevRows.map(row =>
                row._id === id ? { ...row, status: 'processing' } : row
            ));
            setTimeout(async () => {
                await dispatch(updateOrderStatus({ orderId: id, status: 'succeeded' }));
                setOpenSnackBar(true);
                setRows(prevRows => prevRows.map(row =>
                    row._id === id ? { ...row, status: 'succeeded' } : row
                ));
            }, 5000);
        } catch (error) {
            console.error('Error approving order:', error);
        }
    };

    const handleDelivery = async (id) => {
        try {
            await dispatch(updateOrderStatus({ orderId: id, status: 'delivered' }));
            setOpenSnackBar(true);
            setRows(prevRows => prevRows.map(row =>
                row._id === id ? { ...row, status: 'delivered' } : row
            ));
        } catch (error) {
            console.error('Error delivering order:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'customerName', headerName: 'Customer Name', width: 150 },
        // { field: 'productImage', headerName: 'Product Image', width: 120,
        //     renderCell: (params) => (
        //         <img
        //         src={`${import.meta.env.VITE_API_URI}/${params.row.productImage}`}
        //         alt={params.row.productName}
        //         className='w-10 h-10 rounded-full object-cover transition-transform duration-200 ease-in-out hover:scale-150'
        //     />
        //     ),
        // },
        { field: 'productName', headerName: 'Product', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 80 },
        { field: 'totalAmount', headerName: 'Total Amount', width: 130,
            renderCell: (params) => (
                <span className="font-semibold">{params.value}</span>
            )
        },
        { field: 'paymentStatus', headerName: 'Payment Status', width: 130,
            renderCell: (params) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${params.value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        params.value === 'succeeded' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {params.value}
                </span>
            )
        },
        { field: 'status', headerName: 'Status', width: 260, renderCell: (params) => (
                <div>
                    {params.value === 'true' && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleApprove(params.row._id)}
                            className="bg-purple-500 hover:bg-purple-600"
                        >
                            Approve
                        </Button>
                    )}
                    {params.value === 'processing' && (
                        <span className="text-yellow-600 flex items-center">
                            <CircularProgress size={20} className="mr-2" />
                            Processing
                        </span>
                    )}
                    {params.value === 'succeeded' && (
                        <>
                            <span className="text-green-600 mr-2">Approved</span>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() => handleDelivery(params.row._id)}
                                className="bg-black/90 hover:bg-purple-600"
                            >
                                Mark as Delivered
                            </Button>
                        </>
                    )}
                    {params.value === 'delivered' && (
                        <span className="text-purple-600 font-semibold">Delivered</span>
                    )}
                </div>
            )
        },
        { field: 'Action', headerName: 'Action', width: 120,
            renderCell: (params) => (
                <button
                    onClick={() => handleDelete(params.row._id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200"
                >
                    <MdDelete className='text-xl' />
                </button>
            )
        },
    ];

    return (
        <div className="h-[440px] w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <DataGrid
                rows={rows}
                columns={columns}
                // pageSize={10}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                
            />
        </div>
    );
}