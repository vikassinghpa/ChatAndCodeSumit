import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../Components/Navbar/Navbar';
import SetupAxiosInstances from '../../Components/Instances/SetupAxiosInstances';

function ViewPost() {
  let [data ,setData] = useState([]);
  useEffect(()=>{
    getData();
  },[])
  let navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);
  async function getData(){
  await axiosInstances.get('/user/my-posts')
  .then((res)=>{
  setData(res.data);
  })
  .catch((e)=>{
    console.log("failed to access all posts axios error: ",e);
  })
  }

  async function handleDelete(id){
    await axiosInstances.delete(`/user/delete-post/${id}`)
    .then((res)=>{
     if(res.data == 'Success'){
      alert("Post deleted Successfully.")
      getData();
     }
    })
    .catch((e)=>{
      console.log("failed to delete post axios error: ",e);
    })
  }

  return (
    <>
    <div>
      <NavBar/>
       <p>Want to add New Post ? <button className='bg-blue-300 text-blue-800 m-2 py-2 px-4 rounded-md'><Link to={'/user/add-post'}>Add Post</Link></button></p>
      {data.map((item,index)=>{
       return (
        <div key={item._id} className='border bg-gray-200 rounded-md mt-2 p-2 mx-2'>
          <h2>Title: {item.title}</h2>
          <img src={item.upload} alt="" />
          <p>Description: {item.desc}</p>
          <button className='bg-red-300 text-red-800 mt-2 py-2 px-4 rounded-md' onClick={()=>handleDelete(item._id)}>Delete Post</button>
        </div>
       )
      })}
    </div>
    </>
    
  )
}

export default ViewPost