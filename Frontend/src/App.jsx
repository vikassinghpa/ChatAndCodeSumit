import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ViewProfile from './Pages/Profile/ViewProfile'
import AddEducation from './Pages/Profile/AddEducation'
import UpdateEducation from './Pages/Profile/UpdateEducation'
import UpdateProfile from './Pages/Profile/UpdateProfile'
import ViewPost from './Pages/Post/ViewPost'
import AddPost from './Pages/Post/AddPost'
import Suggestion from './Pages/Home/Suggestion'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/user/profile' element={<ViewProfile/>}/>
        <Route path='/user/update-profile' element={<UpdateProfile/>}/>
        <Route path='/user/add-education' element={<AddEducation/>}/>
        <Route path='/user/update-education' element={<UpdateEducation/>}/>
        <Route path='/user/my-posts' element={<ViewPost/>}/>
        <Route path='/user/add-post' element={<AddPost/>}/>
        <Route path='/user/friends' element={<Suggestion/>}/>
      </Routes>
    </div>
  )
}

export default App