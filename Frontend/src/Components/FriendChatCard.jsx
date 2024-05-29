import React from 'react'
import { useState } from 'react';
import SetupAxiosInstances from './Instances/SetupAxiosInstances';
import { useNavigate } from 'react-router-dom';

function FriendChatCard({item}) {
  let [pictureLoad,setPictureLoad] = useState(false);
  let [arr,setArr] = useState([]);
  let navigate = useNavigate();
  let axiosInstances = SetupAxiosInstances(navigate);

  let senderId = localStorage.getItem('userId');
  let receiverId;
  if(item.target[0] === senderId){
   receiverId = item.target[1];
  }else{
   receiverId = item.target[0];
  }
  async function handleClickChat(item){
  localStorage.removeItem('chatId');
  localStorage.removeItem('friendId');
  localStorage.setItem('chatId',item._id);
   try{
    await axiosInstances.get(`/chat?chatId=${item._id}`)
    .then((res)=>{
    if(res.status == 200){
      console.log("messages of array: ",res.data);
      let friendId;
      if(item.target[0]._id == senderId){
        friendId = item.target[1]._id;
        localStorage.setItem('friendId',friendId);
      }else{
        friendId = item.target[0]._id;
        localStorage.setItem('friendId',friendId);
      }
      console.log(res.data);
      console.log("friendid: ",friendId);
      setArr(res.data.message);
      navigate('/chat',{state:{arr:res.data.message}});
    }
    })
    .catch((e)=>{
      console.log("error in fetch message array axios: ",e);
    })
   }
   catch(e){
    console.log("error in fetch chat message axios: ",e);
   }
  }
  return (
    <div className='flex w-full py-2 px-2 mt-2 bg-blue-400 rounded-md cursor-pointer' onClick={()=>handleClickChat(item)}>
    <div className='w-1/4'>
    {receiverId.photo && !pictureLoad ?
      (
        <>
        <img src={receiverId.photo} onError={()=>setPictureLoad(true)} className='w-24 h-full'/>
        </>
      ):(
        <>
        <img src="/Assets/profile.png" className='w-24 h-full border border-black rounded-md'/>
        </>
      )}
    </div>
    <div className='w-3/4 font-semibold text-xl pw-2'>
    <h2>Name: {receiverId.firstName} {receiverId.lastName && (receiverId.lastName)}</h2>
     <h2>Username: {receiverId.userName}</h2>
    </div>
    </div>
  )
}

export default FriendChatCard