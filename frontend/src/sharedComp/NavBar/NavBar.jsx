import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { Avatar, Badge, IconButton, Menu, MenuItem, styled, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CiBoxes, CiShoppingCart, CiUser } from 'react-icons/ci';
import { MdLogout } from 'react-icons/md';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { auth, role, user } = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogOut = () => {
        localStorage.clear();
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav className='bg-purple-950 shadow-lg sticky top-0 z-50'>
            <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
                <Link to="/" className='transition duration-300 text-4xl text-white font-extrabold font-mono'>
                    Fonik
                </Link>
                <div className='flex items-center space-x-6'>
                    <Tooltip title="Cart">

                        <IconButton
                            aria-label="cart" color="inherit"
                            onClick={() => navigate("/cart")}

                        >
                            <Badge badgeContent={cartItems.length} color="secondary">
                                <ShoppingCartIcon style={{ fill: '#fff' }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    {auth ? (
                        <div className='flex items-center'>
                            <Tooltip title="Profile">
                                <IconButton onClick={handleClick}>
                                    <Avatar
                                        alt={user?.name || user?.FirstName}
                                        src={`${import.meta.env.VITE_API_URI}/${user?.userImage}`}
                                        className="border-2 border-white"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '& .MuiMenuItem-root': {
                                            py: 1,
                                            px: 2,
                                        },
                                    },
                                }}
                            >
                                <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>
                                    <CiUser className='mr-2 text-xl' /> Profile
                                </MenuItem>
                                {role === "user" ? (
                                    <MenuItem onClick={() => { handleClose(); navigate("/myorder"); }}>
                                        <CiShoppingCart className='mr-2 text-xl' /> My Orders
                                    </MenuItem>
                                ) : (
                                    <>
                                        <MenuItem onClick={() => { handleClose(); navigate("/adminuser"); }}>
                                            <CiUser className='mr-2 text-xl' /> Users
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleClose(); navigate("/adminorder"); }}>
                                            <CiShoppingCart className='mr-2 text-xl' /> Orders
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleClose(); navigate("/adminproduct"); }}>
                                            <CiBoxes className='mr-2 text-xl' /> Products
                                        </MenuItem>
                                    </>
                                )}
                                <MenuItem onClick={handleLogOut}>
                                    <MdLogout className='mr-2 text-xl' /> Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div className='space-x-4'>
                            <Link to="/login" className='px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition duration-300 shadow-md'>
                                Login
                            </Link>
                            <Link to="/signup" className='px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition duration-300 shadow-md'>
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
