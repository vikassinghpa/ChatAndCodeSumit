import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';


function Register() {
  let [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    password:''
  });
  let navigate = useNavigate();
  const handleChange = (e) => {
    // let {name,value} = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendApi = import.meta.env.VITE_BACKEND_API;
      const requestUrl = `${backendApi}/auth/register`;
      await axios.post(requestUrl, formData)
      .then((res)=>{
         if(res.data == 'username exist'){
          alert("Username is already exist. Please give unique Username.")
         }else if(res.data == 'email exist'){
          alert("Email address is already registered. please go to Signin page.")
         }else if(res.data == 'success'){
          alert("Successfully registered");
          navigate('/auth/login');
         }
      })
      .catch((e)=>{
        console.log("Failed to Register axios error: ",e);
      })
      
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
    <Navbar/>
<div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <h2 className="text-3xl mb-4">Register</h2>
          <input  type="text"  name="firstName"  placeholder="First Name"  onChange={handleChange}  className="rounded-md border-gray-400 border p-2 mb-2 w-full" required/>
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full"/>
          <input type="text" name="userName" placeholder="User Name" onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full" required/>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full" required/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full" required/>
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600"> Register </button>
        </div>
        <p className='text-xl'>Do you have a account ? Click to <span className='text-blue-600'><Link to={'/auth/login'}>Sign in</Link></span></p>
      </form>
    </div>
    </>
    
  );
}

export default Register;
