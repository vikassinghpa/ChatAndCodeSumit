import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = ()=>{
    setIsOpen(false);
  }

  return (
    <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
      <button className="font-semibold py-4 px-4 inline-flex items-center">Account</button>
      {isOpen && (
        <div className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg z-10">
          <Link to={'/user/profile'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
          <Link to={'/user/my-posts'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Post</Link>
          <Link to={'/user/friends'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Friends</Link>
          <Link to={'/user/add-post'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Post</Link>
          <Link to={'/user/notifications'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Notifications</Link>
        </div>
      )}
    </div>
  );
};

export default Account;
