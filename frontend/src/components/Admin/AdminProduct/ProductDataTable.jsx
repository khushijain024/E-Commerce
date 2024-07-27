import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../../../redux/slices/productSlice';
import { FaUpload } from 'react-icons/fa';

const modalStyle = {
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

export default function ProductDataTable({ open, setOpen, setOpenSnackBar }) {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const { products, status, isSuccess } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    if (products) {
      const newRows = products.map((item, i) => ({ ...item, id: i + 1 }));
      setRows(newRows);
    }
  }, [products]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setEdit(false);
      setFormData({});
    }
  }, [isSuccess, setOpen]);

  const handleClose = () => {
    setOpen(false);
    setFormData({});
    setEdit(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const handleSwitch = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("productCategory", formData.productCategory);
    data.append("productDesc", formData.productDesc);
    data.append("productImage", formData.productImage);
    
    if (edit) {
      dispatch(updateProduct({ id: formData._id, updatedProduct: formData }));
    } else {
      dispatch(createProduct(data));
    }
    setOpenSnackBar(true);
  };

  const handleEditClick = (data) => {
    setEdit(true);
    setFormData(data);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      setOpenSnackBar(true);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'image', headerName: 'Image', width: 100, 
        renderCell: (params) => (
        <img
          src={`${import.meta.env.VITE_API_URI}/${params.row.productImage}`}
          alt={params.row.productName}
          className='w-10 h-10 rounded-full object-cover transition-transform duration-200 ease-in-out hover:scale-150'
        />
      )
    },
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { field: 'productPrice', headerName: 'Price', width: 130, renderCell: (params) => `₹${params.value}` },
    { field: 'productCategory', headerName: 'Category', width: 160 },
    { field: 'status', headerName: 'Status', width: 120, 
        renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${params.row.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {params.row.status ? "In-Stock" : "Out of Stock"}
        </span>
      )
    },
    { field: 'Action', headerName: 'Action', width: 120, 
        renderCell: (params) => (
        <div className='flex gap-2'>
          <button onClick={() => handleEditClick(params.row)} className="p-2 bg-gradient-to-br from-purple-50 to-indigo-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-200">
            <CiEdit className='text-xl' />
          </button>
          <button onClick={() => handleDelete(params.row._id)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200">
            <MdDelete className='text-xl' />
          </button>
        </div>
      )
    },
  ];

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-[425px] w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
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
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4 text-2xl font-bold text-gray-800">
            {edit ? "Edit Product" : "Add Product"}
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                name="productName"
                onChange={handleChange}
                value={formData.productName || ""}
              />
              <input
                type="text"
                placeholder="Product Price"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                name="productPrice"
                onChange={handleChange}
                value={formData.productPrice || ""}
              />
              <input
                type="text"
                placeholder="Product Category"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                name="productCategory"
                onChange={handleChange}
                value={formData.productCategory || ""}
              />
              <textarea
                placeholder="Product Description"
                className="col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                name="productDesc"
                onChange={handleChange}
                value={formData.productDesc || ""}
                rows="3"
              />
               <div className="col-span-2">
                <input
                  type="file"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  name="productImage"
                  onChange={handleChange}
                />
              </div>
              {edit && (
                <div className="col-span-2 flex items-center justify-between  p-3 rounded-md">
                  <span className="font-medium text-gray-700">Product Status:</span>
                  <div className="flex items-center">
                    <Switch
                      checked={formData.status || false}
                      name="status"
                      onChange={handleSwitch}
                      color="primary"
                    />
                    <span className="ml-2 text-gray-600">{formData.status ? "In-Stock" : "Out of Stock"}</span>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition-colors duration-300 font-medium text-lg"
            >
              {edit ? "Update Product" : "Add Product"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}