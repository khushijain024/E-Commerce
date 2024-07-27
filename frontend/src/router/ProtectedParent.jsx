import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { setAuth } from '../redux/slices/authSlice';

const ProtectedParent = () => {

  const dispatch = useDispatch();
  const { auth, user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (token && role) {
        const decodedToken = jwtDecode(token);
        dispatch(setAuth({ token, role, auth: true, user: decodedToken }))
      }
    }
    fetchToken();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedParent