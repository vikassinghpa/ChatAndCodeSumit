import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function Home() {
  let [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    password:''
  });
  const handleChange = (e) => {
    // let {name,value} = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendApi = import.meta.env.VITE_BACKEND_API;
      const requestUrl = `${backendApi}/auth/register`;
      const response = await axios.post(requestUrl, formData);
      console.log(response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <h2 className="text-3xl mb-4">Register</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="rounded-md border-gray-400 border p-2 mb-2 w-full"
          required/>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="rounded-md border-gray-400 border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            onChange={handleChange}
            className="rounded-md border-gray-400 border p-2 mb-2 w-full"
          required/>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="rounded-md border-gray-400 border p-2 mb-2 w-full"
          required/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="rounded-md border-gray-400 border p-2 mb-2 w-full"
          required/>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
