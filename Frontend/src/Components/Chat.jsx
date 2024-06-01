
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from './Navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import SetupAxiosInstances from './Instances/SetupAxiosInstances';
import FriendChatCard from './FriendChatCard';

function Chat() {
  const location = useLocation();
  const arr = location.state?.arr || [];
  let [messages, setMessages] = useState([...arr]);
  const socket = useRef();
  const inputRef = useRef(null);

  let navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BACKEND_API, {
      auth: {
        serverOffset: 0,
      },
    });

    let room = localStorage.getItem('chatId');
    console.log(room);
    socket.current.emit('joinRoom', room);

    socket.current.on('message', (obj) => {
      setMessages((prevMessages) => [...prevMessages, obj]);
    });

    return () => {
      socket.current.emit('leaveRoom', room);
      socket.current.disconnect();
    };
  }, []);

  let userId = localStorage.getItem('userId');

  function handleClick() {
    if (inputRef.current.value && inputRef.current.value.trim() !== '') {
      const msg = {
        sender: localStorage.getItem('userId'),
        chatId: localStorage.getItem('chatId'),
        message: inputRef.current.value.trim(),
      };
      console.log(messages)
      // setMessages([...messages, msg]);
      socket.current.emit('message', msg);
      inputRef.current.value = '';
    }
  }

  return (
    <>
      <Navbar />
      <div className="fixed flex bottom-0 w-full top-14 bg-green-400">
        <div
          className="w-1/3 bg-gray-200 p-2 overflow-y-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* {data && data.map((item, index) => {
            return <FriendChatCard key={item._id} item={item} />;
          })} */}
        </div>
        <div className="w-2/3 h-screen bg-gray-700">
          <div className="h-full flex flex-col w-full">
            <div className="bg-gray-800 text-white p-4 fixed top-14 w-2/3 z-20">
              <h2 className="text-lg font-semibold">Sam Vohra Kumar</h2>
            </div>
            <div className="w-2/3 z-20 relative top-14">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === userId
                      ? 'justify-end'
                      : 'justify-start'
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === userId
                        ? 'bg-green-400 text-white'
                        : 'bg-gray-300'
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              <div className="flex fixed bottom-0 w-2/3">
                <input
                  ref={inputRef}
                  className="bg-slate-300 w-full rounded-md h-10"
                  type="text"
                />
                <button
                  onClick={handleClick}
                  className="bg-red-500 rounded-md w-20 h-10"
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
