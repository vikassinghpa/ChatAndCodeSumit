import React from 'react'
import axiosInstances from '../../Components/Instances/AxiosInstances';
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

function Login() {
  let [formData, setFormData] = useState({
    userName: '',
    password: ''
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
      const requestUrl = `${backendApi}/auth/login`;
      await axiosInstances.post(requestUrl, formData)
      .then((res)=>{
        if(res.data == 'username not exist'){
          alert("User does not exist");
        }else if(res.data == 'Incorrect Password'){
          alert('Invalid Username or Password. Please Check again');
        }else if(res.status == 200){
         const token = res.data;
         localStorage.setItem('token',token);
         setTimeout(()=>{
          localStorage.removeItem(token);
         },3*60*60*1000);
         navigate('/');
        }
      })
      .catch((e)=>{
        console.log("Failed to Login axios error: ",e);
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
          <h2 className="text-3xl mb-4">Login</h2>
          <input type="text" name="userName" placeholder="User Name" onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-full" required />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600"> Login </button>
        </div>
        <p className='text-xl'>Do not have a account ? Click to <span className='text-blue-600'><Link to={'/auth/register'}>Sign up</Link></span></p>
      </form>
    </div>
    </>
    
  );
}

export default Login;
