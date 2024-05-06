import React from 'react'
import { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SetupAxiosInstances from '../../Components/Instances/SetupAxiosInstances';
// import axiosInstances from '../../Components/Instances/AxiosInstances';

function Register() {
  let [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    password:''
  });
  let [passwordVisible,setPasswordVisible] = useState(false);
  const togglePassword =()=>{
    setPasswordVisible(!passwordVisible);
  }
  let navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);
  const handleChange = (e) => {
    // let {name,value} = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const backendApi = import.meta.env.VITE_BACKEND_API;
      // const requestUrl = `${backendApi}/auth/register`;
      await axiosInstances.post('/auth/register', formData)
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
    <div className='flex min-h-screen bg-cover items-center justify-around' style={{backgroundImage:'url(/Assets/landing.avif)'}}>
      <div className='flex flex-col items-center justify-center'>
        <p className='font-bold text-3xl mb-2'>Hello!</p>
       <p className='font-semibold text-2xl mb-2 text-white'>Do you have a account ?</p>
       <Link to={'/auth/login'} className='mt-2'><button className='bg-blue-500 text-white rounded-md w-72 py-2 px-4 hover:bg-blue-700 font-medium'>Sign in</button></Link>
      </div>
<div className="flex justify-center bg-white py-2 px-10 rounded-lg relative">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div>
          <h2 className="text-2xl mb-4 font-bold absolute right-12">FriendsBook</h2>
          <h2 className='text-xl font-semibold'>Create an account</h2>
          <h2 className='text-md font-medium mb-2 text-gray-500'>Sign up to Continue</h2>
          <label htmlFor="first" className="font-medium">Firstname</label>
          <br />
          <input  type="text"  name="firstName"  placeholder="First Name"  onChange={handleChange} id='first'  className="rounded-md border-gray-400 border p-2 mb-2 w-96" required/>
          <br />
          <label htmlFor="last" className="font-medium">Lastname</label>
          <br />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} id='last' className="rounded-md border-gray-400 border p-2 mb-2 w-96"/>
          <br />
          <label htmlFor="user" className="font-medium">Username</label>
           <br />
          <input type="text" name="userName" placeholder="User Name" onChange={handleChange} id='user' className="rounded-md border-gray-400 border p-2 mb-2 w-96" required/>
          <br />
          <label htmlFor="email" className="font-medium">Email</label>
          <br />
          <input type="email" name="email" id='email' placeholder="Email" onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-2 w-96" required/>
          <br />
          <label htmlFor="pass" className="font-medium">Password</label>
          <br />
          <div className='relative'>
          <input type={passwordVisible ? 'text':'password'} name="password" placeholder="Password" onChange={handleChange} id='pass' className="rounded-md border-gray-400 border p-2 mb-2 w-96" required/>
          <button type='button' className='absolute mb-2 right-2 inset-y-0' onClick={togglePassword}>{passwordVisible ? <FiEye/> :<FiEyeOff/>}</button>
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-96 hover:bg-blue-700 mb-4 mt-4"> Register </button>
        </div>
      </form>
    </div>
    </div>
    
  );
}

export default Register;
