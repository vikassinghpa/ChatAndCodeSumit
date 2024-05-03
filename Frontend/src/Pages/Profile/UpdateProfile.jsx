import React, { useState } from 'react'
import axiosInstances from '../../Components/Instances/AxiosInstances'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

function UpdateProfile() {
  let [formdata,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  })
  let navigate = useNavigate();
  function handleChange(e){
    const {name,value} = e.target;
    setFormData({...formdata,[name]:value});
  }
  async function handleSubmit(e){
    e.preventDefault();
    const BackendUrl = import.meta.env.VITE_BACKEND_API;
    const requestUrl = `${BackendUrl}/user/update-profile`;
    await axiosInstances.put(requestUrl,formdata)
    .then((res)=>{
      if(res.status == 200){
        navigate('/user/profile')
        alert("successfully updated the user's profile.")
      }
    })
    .catch((e)=>{
      console.log("failed to update profile axios error: ",e)
    })
  }

  return (
    <>
    <Navbar/>
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <h2 className="text-3xl mb-4">Update Profile</h2>
          <input type="text" name="firstName" placeholder="First Name" value={formdata.firstName} onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full" required />
          <input type="text" name="lastName" placeholder="Last Name" value={formdata.lastName} onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full"/>
          <input type="email" name="email" placeholder="Email Address" value={FormData.email} onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full" required />
          <input type="tel" name="phone" placeholder="Mobile Number" value={FormData.phone} onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full"/>
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600">Update</button>
        </div>      
        </form>
    </div>
    </>
    
  )
}

export default UpdateProfile