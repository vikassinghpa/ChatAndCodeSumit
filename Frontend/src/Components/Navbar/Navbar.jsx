import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Account from './Account';
import Friend from './Friend';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = Date.now();

    if (token && expirationTime && currentTime < parseInt(expirationTime, 10)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      setIsLoggedIn(false);
      navigate('/auth/login');
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    setIsLoggedIn(false);
    navigate('/auth/login');
  }

  return (
    <div>
      <ul className='h-14 w-screen items-center flex justify-around text-2xl list-none bg-yellow-600'>
        <li className='text-3xl px-2'><h2>FriendsBook</h2></li>
        <li className='px-2'><Link to={'/'}>Home</Link></li>
        <li><Friend/></li>
        {isLoggedIn ? (
          <>
            <li><Account/></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li className='px-2'><Link to={'/auth/register'}>Register</Link></li>
            <li className='px-2'><Link to={'/auth/login'}>Login</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
