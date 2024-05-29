import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import SetupAxiosInstances from '../../Components/Instances/SetupAxiosInstances';
import FriendCard from '../../Components/FriendCard';
function FriendList() {
  let [data,setData] = useState([]);
  let navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);
  useEffect(()=>{
    getData();
  },[])
  async function getData(){
    await axiosInstances.get('/user/friend-list')
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
    <div className='relative top-14'>
    {
      data.map((item,index)=>{
        return(
          <FriendCard key={item._id} item={item}/>
        )
      })
    }
    </div>
    </>
  )
}

export default FriendList