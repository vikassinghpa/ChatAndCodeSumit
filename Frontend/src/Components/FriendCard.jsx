import React from 'react'
import { useState } from 'react';

function FriendCard({item}) {
  let [pictureLoad,setPictureLoad] = useState(false);

  return (
    <div className='flex w-full py-2 px-2 mt-2 bg-gray-200'>
    <div className='w-1/4'>
    {item.photo && !pictureLoad ?
      (
        <>
        <img src={item.photo} onError={()=>setPictureLoad(true)} className='w-24 h-24'/>
        </>
      ):(
        <>
        <img src="/Assets/profile.png" className='w-24 h-24 border border-black rounded-md'/>
        </>
      )}
    </div>
    <div className='w-3/4 font-semibold text-xl'>
    <h2>Name: {item.firstName} {item.lastName && (item.lastName)}</h2>
     <h2>Username: {item.userName}</h2>
    </div>
    </div>
  )
}

export default FriendCard