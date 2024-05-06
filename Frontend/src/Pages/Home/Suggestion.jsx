import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import SetupAxiosInstances from '../../Components/Instances/SetupAxiosInstances';

function Suggestion() {
  let [data,setData] = useState([]);
  let navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);
  
  useEffect(()=>{
  async function getData(){
    let res = await axiosInstances.get('/user/friends')
    .then((res)=>{
       if(res.status == 200){
        setData(res.data);
      }
    })
    .catch((e)=>{
      console.log("Failed to get list axios error: ",e);
    })
  }
  getData();
  },[])

  async function handleAdd(receiverId){
    await axiosInstances.post('/user/send-request',{receiverId})
    .then((res)=>{
     if(res.data == 'Success'){
      alert("send the requested successfully");
     }else if(res.data == 'Already Sent'){
      alert("You already sent friend request to him/her.");
     }else if(res.data == 'Already Friend'){
      alert("he/she is already your friend.");
     }
    })
    .catch((e)=>{
      console.log("failed to send request axios error: ",e);
    })
  }

  return (
    <>
    <Navbar/>
    <div>
      {
        data.map((item,index)=>{
          return(
            <div key={item._id} className='bg-gray-200 rounded-md mt-2 mx-2 py-2 px-4 border-2'>
             <h2>FirstName: {item.firstName}</h2>
             <h2>UserName: {item.userName}</h2>
             <h2>Email: {item.email}</h2>
              <button className='bg-blue-300 text-blue-800 rounded-md mt-2 py-2 px-4' onClick={()=>handleAdd(item._id)}>Add Friend</button>
            </div>
            )
          })
        }
      </div>
    </>    
  )
}

export default Suggestion