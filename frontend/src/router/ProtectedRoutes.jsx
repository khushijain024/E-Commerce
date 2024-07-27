import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../sharedComp/NavBar/NavBar';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ allowedRole }) => {

  const navigate = useNavigate();
  const { auth, role } = useSelector((state) => state.auth);

  console.log(role);
  useEffect(() => {
    if (!auth) {
      return navigate("/login")
    }

    if (!allowedRole.includes(role)) {
      return navigate("/");
    }
  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes