import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import Navbar from './Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import SetupAxiosInstances from './Instances/SetupAxiosInstances';
import Chat from '../../../Backend/Models/ChatModel'

function ChatMessage() {
let [data,setData] = useState([]);
// let [socket,setSocket] = useState(null);
let [roomId,setRoomId] = useState('');
let [messages,setMessages] = useState([]);
let [selectFriend,setSelectFriend] = useState(null);

let navigate = useNavigate();
const axiosInstances = SetupAxiosInstances(navigate);
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
  const socket = io(import.meta.env.VITE_BACKEND_API,{
    auth:{
      token:localStorage.getItem('token'),
    }
  });
useEffect(()=>{
  getData();
  socket.on('connect',()=>{
    console.log(`connected frontend user ${socket.id}`)
  })
  return ()=>{
    socket.disconnect();
  }
},[])

useEffect(()=>{
  if (socket) {
    socket.on('receive_message', ({ chatId, message }) => {
      if (chatId === roomId) {
        setMessages((prevMessages)=>[...prevMessages,message]);
      }
    });

    socket.on('chat_info', ({ chatId, messages }) => {
      setRoomId(chatId);
      setMessages(messages);
    });

    socket.on('error',(error)=>{
      console.error("socket error: ",error);
    })
  }
  return () => {
    if (socket) {
      socket.off('receive_message');
      socket.off('chat_info');
      socket.off('error');
    }
  };
},[socket,messages,roomId])

let friendId;
if(selectFriend !== null){
  friendId = selectFriend._id;
}
  const handleChat = (friend)=>{
    setSelectFriend(friend);
    const friendId = friend._id;
    socket.emit('join_room',{friendId})
  }
  const sendMessage = (messageContent)=>{
      socket.emit('send_message',{chatId:roomId , message:messageContent});
  }

useEffect(() => {
  async function fetchMessages() {
    if (socket && selectFriend) {
      const friendId = selectFriend._id;
      const chat = await Chat.findOne({
        $or: [{ source: socket.userId, target: friendId }, { source: friendId, target: socket.userId }],
      }).populate('message');

      if (chat) {
        setRoomId(chat._id);
        setMessages(chat.message || []);
      }
    }
  }

  fetchMessages();
}, [socket, selectFriend]);
  return (
    <>
    <Navbar/>
    <div className='fixed flex bottom-0 w-full top-14 bg-green-400'>
    <div className='w-1/3 bg-gray-200 p-2 overflow-y-auto'  style={{scrollbarWidth:"none"}}>
     {data.map((item,index)=>{
      return (
        <div key={item._id} className='bg-green-400 py-2 px-4 rounded-md cursor-pointer mt-2' onClick={()=>handleChat(item)}>
          <div>
          <h2>Name: {item.firstName} {item.lastName &&(<span>{item.lastName}</span>)}</h2>
          <h2>Username: {item.userName}</h2>
          </div>
        </div>
      )
     })}
    </div>
    <div className='w-2/3 h-screen bg-gray-700'>
     {selectFriend && (
      <div className="h-full flex flex-col">
      <div className="bg-gray-800 text-white p-4 fixed top-14 w-2/3 z-20">
        <h2 className="text-lg font-semibold">{selectFriend.firstName} {selectFriend.lastName}</h2>
      </div>
      <MessageList messages={messages} friendId={friendId}/>
      <MessageInput sendMessage={sendMessage}/>
    </div>
     )}
    </div>
    </div>
    </>
  )
}

function MessageList({messages,friendId}){
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 pt-20 px-4 pb-36" style={{scrollbarWidth:"none"}}>    
       {messages && messages.map((message,index) => (
         <div key={index} className={`flex ${message.sender !== friendId ? "justify-end" : "justify-start"} mb-2`}>
         <div className={`p-2 rounded-lg ${message.sender !== friendId ? "bg-green-400 text-white" : "bg-gray-300"}`}> {message.content}
         </div>
       </div>
        ))}
      </div>
  )
}
function MessageInput({sendMessage}){
const [inputVal,setInputVal] = useState('');
const handleSubmit = (e) => {
  e.preventDefault();
  if (inputVal.trim() !== '') {
    sendMessage(inputVal.trim());
    setInputVal('');
  }
};

return(
  <form onSubmit={handleSubmit}>
   <div className="bg-gray-200 p-4 fixed bottom-0 w-2/3">
        <input type="text" placeholder="Type a message..." className="w-4/5 rounded-lg border-none outline-none p-2" value={inputVal} onChange={(e)=> setInputVal(e.target.value)}/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" type='submit'>Send</button>
    </div>
  </form>
)
}
export default ChatMessage
