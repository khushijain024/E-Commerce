import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Screen from '../sharedComp/Screen/Screen';
import ProtectedParent from './ProtectedParent';
import ProtectedRoutes from './ProtectedRoutes';
import UnProtected from './UnProtected';
import ProductCategory from '../sharedComp/Products/ProductCategory';
import SingleProduct from '../sharedComp/Products/SingleProduct';
import Products from '../sharedComp/Products/Products';
import Profile from '../sharedComp/Profile/Profile';
import Home from '../sharedComp/Home/Home';
import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';
import Cart from '../components/Cart/Cart';
import PaymentSuccess from '../components/Payment/PaymentSuccess';
import PaymentCancel from '../components/Payment/PaymentCancel';
import Checkout from '../components/User/Checkout';
import MyOrder from '../components/User/MyOrder';
import AdminProduct from '../components/Admin/AdminProduct/AdminProduct';
import AdminOrder from '../components/Admin/AdminOrder/AdminOrder';
import AdminUser from '../components/Admin/AdminUser/AdminUser';

const Router = createBrowserRouter([
    {
        element: <ProtectedParent />,
        children: [
            {
                path: '/',
                element: <Screen />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/cart",
                        element: <Cart />
                    },
                ]
            },
            {
                path: `/products`,
                element: <Products />,
            },
            {
                path: `/products/:category`,
                element: <ProductCategory />,
            },
            {
                path: `/product/:productId`,
                element: <SingleProduct />
            },
            {
                path: "/paymentsuccess",
                element: <PaymentSuccess />
            },
            {
                path: "/paymentcancel",
                element: <PaymentCancel />
            },
            {
                element: <UnProtected />,
                children: [
                    {
                        path: "/login",
                        element: <Login />
                    },
                    {
                        path: "/signup",
                        element: <Signup />
                    }
                ]
            },
            {
                element: <ProtectedRoutes allowedRole={["user", "admin"]} />,
                children: [
                    {
                        path: "/profile",
                        element: <Profile />
                    }
                ]
            },
            {
                element: <ProtectedRoutes allowedRole={["user"]} />,
                children: [
                    {
                        path: "/myorder",
                        element: <MyOrder />
                    },
                    {
                        path: "/checkout",
                        element: <Checkout />
                    },
                ]
            },
            {
                element: <ProtectedRoutes allowedRole={["admin"]} />,
                children: [
                    {
                        path: "/adminuser",
                        element: <AdminUser />
                    },
                    {
                        path: "/adminproduct",
                        element: <AdminProduct />
                    },
                    {
                        path: "/adminorder",
                        element: <AdminOrder />
                    },
                ]
            },
        ]
    }
])

export default Router