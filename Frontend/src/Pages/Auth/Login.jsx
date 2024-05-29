import React from 'react'
import SetupAxiosInstances from '../../Components/Instances/SetupAxiosInstances';
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Login() {
  let [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  let [passwordVisible,setPasswordVisible] = useState(false);
 const togglePassword = ()=>{
  setPasswordVisible(!passwordVisible);
 }
  let navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstances.post('/auth/login', formData)
      .then((res)=>{
        if(res.data == 'username not exist'){
          alert("User does not exist");
        }else if(res.data == 'Incorrect Password'){
          alert('Invalid Email or Password. Please Check again');
        }else if(res.status == 200){
         const token = res.data.token;
         const userId = res.data.userId;
         localStorage.setItem('token',token);
         localStorage.setItem('userId',userId);
         const expirationTime = Date.now() + 3*60*60*1000;
         localStorage.setItem('expirationTime',expirationTime);
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
      console.error('Login form error:', error);
    }
  };

  return (
    <div className='flex min-h-screen bg-cover items-center justify-around' style={{backgroundImage:'url(/Assets/landing.avif)'}}>
      <div className='flex flex-col items-center justify-center'>
        <p className='font-bold text-3xl mb-2'>Hello!</p>
       <p className='font-semibold text-2xl mb-2 text-white'>Don't have a account yet?</p>
       <Link to={'/auth/register'} className='mt-2'><button className='bg-blue-500 text-white py-2 px-4 rounded-md w-72 hover:bg-blue-700 font-medium'>Create an account</button></Link>
      </div>
     <div className="flex justify-center bg-white py-2 px-10 rounded-lg">
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <h2 className="text-2xl mb-4 font-bold">FriendsBook</h2>
          <h2 className='text-xl font-semibold'>Welcome Back!!</h2>
          <h2 className='text-md font-medium mb-2 text-gray-500'>Sign in to continue</h2>
          <label htmlFor="user" className='font-medium'>Email</label>
          <br />
          <input type="email" name="email" placeholder="Email address" id='user' onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-3 w-64" required />
          <br />
          <label htmlFor="pass" className='font-medium'>Password</label>
          <br />
          <div className='relative'>
          <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" id='pass' onChange={handleChange} className="rounded-md border-gray-400 border p-2 mb-3 w-64" required />
          <button className='absolute inset-y-0 right-2 mb-3' type='button' onClick={togglePassword}>{passwordVisible ? <FiEye/> : <FiEyeOff/>}</button>
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-700 mt-4 mb-10"> Login </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
