import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import LandingPage from './pages/LandingPage'
// import Login from './pages/Login'
import ServicePage from './pages/ServicePage'



const queryClient = new QueryClient()

function App() {


  return (
  <QueryClientProvider client={queryClient}>
      <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage /> } />
        <Route path='/home' element={<LandingPage /> } />
        <Route path='/services' element={ <ServicePage />  } />
        {/* <Route path='/aboutclinic' element={<AboutClinic /> } /> */}
        {/* <Route path='/login' element={<Login />} /> */}
      </Routes>
       
      </BrowserRouter>
      
     {/* */}
     {/**/}
     {/* */}
     
    </div>
  </QueryClientProvider>
  )
}

export default App
