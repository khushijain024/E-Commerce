import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OrderDataTable from './OrderDataTable'
const AdminOrder = () => {
    const [open, setOpen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpenSnackBar(false);

    return (
        <div className="bg-gray-100 min-h-[87vh]">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
                <div className='flex justify-between items-center p-6 border-b border-gray-200'>
                    <h1 className='text-4xl font-extrabold text-gray-800'>
                        Order Data
                    </h1>
                </div>
                <div className='bg-white'>
                    <OrderDataTable open={open} setOpen={setOpen} setOpenSnackBar={setOpenSnackBar} />
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={3000}
                    // message="User Updated"
                    severity="success"
                    variant="filled"
                    open={openSnackBar}
                    onClose={handleClose}
                ><Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                        "Order Updated"
                    </Alert></Snackbar>
            </div>
        </div>
    )
}

export default AdminOrder