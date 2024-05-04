import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Friend(){
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = ()=>{
    setIsOpen(false);
  }

  return (
    <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
      <button className="font-semibold py-4 px-4 inline-flex items-center">Friend</button>
      {isOpen && (
        <div className="absolute right-0 w-60 bg-white border rounded-lg shadow-lg z-10 text-xl">
          <Link to={'/user/friend-list'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Friends</Link>
          <Link to={'/user/friend-request'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Friend Requests</Link>
          <Link to={'/user/friends'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Recommended Friend</Link>
        </div>
      )}
    </div>
  );
};

export default Friend;
