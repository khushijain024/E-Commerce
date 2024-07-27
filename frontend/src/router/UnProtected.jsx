import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const UnProtected = () => {
    const navigate = useNavigate();
    const { auth } = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(auth){
            return navigate("/")
        }
    },[])

    
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default UnProtected