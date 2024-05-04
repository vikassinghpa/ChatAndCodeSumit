import React, { useEffect, useState } from 'react'
import axiosInstances from '../../Components/Instances/AxiosInstances'
import Navbar from '../../Components/Navbar/Navbar';

function FriendList() {
  let [data,setData] = useState([]);
  const backendApi = import.meta.env.VITE_BACKEND_API;
  useEffect(()=>{
    getData();
  },[])
  async function getData(){
    const requestUrl = `${backendApi}/user/friend-list`;
    await axiosInstances.get(requestUrl)
    .then((res)=>{
     if(res.status == 200){
      setData(res.data);
     }
    })
    .catch((e)=>{
      console.log("failed to get friend requests axios error: ",e);
    })
    }
  return (
    <>
    <Navbar/>
    <div>
    {
      data.map((item,index)=>{
        return(
          <div key={item._id} className='bg-gray-300 mt-2 py-2 px-4 rounded-md border-2 relative'>
            <h2>FirstName: {item.firstName}</h2>
            <h2>lastName: {item.lastName}</h2>
            <h2>Username: {item.userName}</h2>
          </div>
        )
      })
    }
    </div>
    </>
  )
}

export default FriendList