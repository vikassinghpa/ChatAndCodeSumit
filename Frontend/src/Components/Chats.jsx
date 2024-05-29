import React, { useEffect, useState } from 'react'
import SetupAxiosInstances from './Instances/SetupAxiosInstances';
import { useNavigate } from 'react-router-dom';
import FriendChatCard from './FriendChatCard';
import Navbar from './Navbar/Navbar';

function Chats() {
  let [data,setData] = useState([]);
  let navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);
  useEffect(()=>{
    async function getData(){
    await axiosInstances.get('/user/chat')
    .then((res)=>{
     if(res.status == 200){
      console.log('chat data: ',res.data);
      setData(res.data);
     }
    })
    .catch((e)=>{
      console.log("error in axios all chat: ",e);
    })
    }
    getData();
  },[])
  return (
    <>
    <Navbar/>
    <div className='relative top-14 mx-2'>
    {data && data.map((item,index)=>{
      return(
        <FriendChatCard key={item._id} item={item}/>
      )
    })}
    </div>
    </>
    
  )
}

export default Chats