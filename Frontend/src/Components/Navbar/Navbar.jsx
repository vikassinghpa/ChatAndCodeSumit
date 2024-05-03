import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Account from './Account';

function Navbar() {
let [isLogIn ,setIsLogIn] = useState(false);
let navigate = useNavigate();
useEffect(()=>{
  const loggedIn = ()=>{
    const token = localStorage.getItem('token');
    if(token){
      setIsLogIn(true);
    }
  }
  loggedIn();
},[])

const loggedOut =()=>{
  localStorage.removeItem('token');
  setIsLogIn(false);
  navigate('/auth/login')
}
  return (
    <div >
      <ul className='h-14 w-screen items-center flex justify-around text-2xl list-none bg-yellow-600'>
        <li className='text-3xl px-2'><h2>FriendsBook</h2></li>
        <li className='px-2'><Link to={'/'}>Home</Link></li>
        <li className='px-2'><Link to={'/user/friends'}>Friends</Link></li>
        {isLogIn ? (
          <>
          <li><Account/></li>
         <li><button onClick={loggedOut}>Logout</button></li>
          </>
        ):(
        <>
       <li className='px-2'><Link to={'/auth/register'}>Register</Link></li>
        <li className='px-2'><Link to={'/auth/login'}>Login</Link></li>
        </>
        )
        }
        
      </ul>
    </div>
  )
}

export default Navbar