import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'

function App() {
  return (
    <div>
        <Navbar/>
      <Routes>
        <Route path='/register' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App