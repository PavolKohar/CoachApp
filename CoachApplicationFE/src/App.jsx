import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/Home'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'



function App() {
  

  return (
    <>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/register' element={<Register />} />

        
      </Routes>
    </>
  )
}

export default App
