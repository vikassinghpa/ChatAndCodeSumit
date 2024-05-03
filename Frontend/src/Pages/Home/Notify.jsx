import React, { useEffect, useState } from 'react'
import axiosInstances from '../../Components/Instances/AxiosInstances'
import Navbar from '../../Components/Navbar/Navbar';

function Notify() {
  let [data,setData] = useState([]);
  const backendApi = import.meta.env.VITE_BACKEND_API;
  useEffect(()=>{
    async function getData(){
    const requestUrl = `${backendApi}/user/notifications`;
    await axiosInstances.get(requestUrl)
    .then((res)=>{
     if(res.status == 200){
      setData(res.data);
     }
    })
    .catch((e)=>{
      console.log("failed to get notifications axios error: ",e);
    })
    }
    getData();
  },[])
 
  async function handleAccept(receiverId){
    const requestUrl = `${backendApi}/user/accept-request`;
  await axiosInstances.post(requestUrl,{receiverId})
  .then((res)=>{
  if(res.data == 'Success'){
    alert("Friend request accepted successfully");
  }
  })
  .catch((e)=>{
    console.log("failed to accept request axios error: ",e);
  })
  }

  async function handleReject(receiverId){
    const requestUrl = `${backendApi}/user/reject-request`;
    await axiosInstances.post(requestUrl,{receiverId})
    .then((res)=>{
    if(res.data == 'Success'){
      alert("Friend request rejected successfully");
    }
    })
    .catch((e)=>{
      console.log("failed to rejected request axios error: ",e);
    })
  }

  return (
    <>
    <Navbar/>
    <div>
    {
      data.map((item,index)=>{
        return(
          <div key={item._id} className='bg-gray-300 mt-2 py-2 px-4 rounded-md border-2'>
            <h2>Name: {item.sender.firstName}</h2>
            <h2>last: {item.sender.lastName}</h2>
            <h2>User: {item.sender.userName}</h2>
            <button className='bg-green-300 text-green-900 rounded-md mt-2 py-2 px-4' onClick={()=>handleAccept(item.sender._id)}>Accept</button>
            <button className='bg-red-300 text-red-800 rounded-md mt-2 py-2 px-4' onClick={()=>handleReject(item.sender._id)}>Reject</button>
          </div>
        )
      })
    }
    </div>
    </>
  )
}

export default Notify