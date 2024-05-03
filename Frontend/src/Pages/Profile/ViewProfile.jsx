import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstances from '../../Components/Instances/AxiosInstances';
import Navbar from '../../Components/Navbar/Navbar';

function ViewProfile() {
  let [data,setData] = useState(null);
  const backendApi = import.meta.env.VITE_BACKEND_API;
  useEffect(()=>{
    async function getData(){
      const requestUrl = `${backendApi}/user/profile`;
      await axiosInstances.get(requestUrl)
      .then((res)=>{
      setData(res.data);
      })
      .catch((e)=>{
        console.log("Failed to get profile axios error: ",e);
      })
    }
    getData();
  },[])

  async function DeleteEducation(){
    const deleteUrl = `${backendApi}/user/delete-education`
    await axiosInstances.delete(deleteUrl)
    .then((res)=>{
     if(res.status == 200){
      alert('Successfully deleted the education.')
      setData(res.data)
     }
    })
    .catch((e)=>{
      console.log("failed to delete education axios error: ",e)
    })
  }
  return (
    <div>
      <Navbar/>
      <button className='bg-gray-300 text-gray-800 mt-2 py-2 px-4 rounded-md mb-2'><Link to={'/user/update-profile'}>Update Profile</Link></button>
     {data ? (
     <div>
      <h2>Firstname: {data.firstName}</h2>
      <h2>Lastname: {data.lastName}</h2>
      <h2>Username: {data.userName}</h2>
      <h2>Email Address: {data.email}</h2>
      <h2>Mobile No.: {data.phone}</h2>
      <div>{data.education ? (
        <>
        <h2>Educational Qualifications</h2>
        <h2>School Name: {data.education.school.name}</h2>
        <h2>Higher Education: {data.education.school.class}</h2>
        <h2>Year of Schooling: {data.education.school.year}</h2>
        <h2>College Name: {data.education.college.name}</h2>
        <h2>Field: {data.education.college.class}</h2>
        <h2>Year of Graduation: {data.education.college.year}</h2>
        <button className='bg-gray-300 text-gray-800 mt-2 py-2 px-4 rounded-md me-2'><Link to={'/user/update-education'}>Update Education</Link></button>
        <button className='bg-red-300 text-red-800 mt-2 py-2 px-4 rounded-md' onClick={DeleteEducation}>Delete Education</button>
        </>
      ):(
        <p>Want to add Educational Qualification ? <button className='bg-blue-300 text-blue-800 rounded-md mt-2 py-2 px-4'><Link to={'/user/add-education'}>Add Education</Link></button></p>
      )}
      </div>
     </div>
     ):(
      <p>Loading...</p>
     )}
    </div>
  )
}

export default ViewProfile