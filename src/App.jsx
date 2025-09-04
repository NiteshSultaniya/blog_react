import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/Menu/MenuBar'
import Dashboard from './Components/Dashboard/Dashboard'
import AllPage from './Components/Page/AllPage'
import AddPage from './Components/Page/AddPage'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import { useEffect, useRef, useState } from 'react'
import ApiService from './Utils/ApiService'

function App() {
  const [isadminValid, setisadminValid] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const didMountRef = useRef(true)

  let token = JSON.parse(localStorage.getItem("TOKEN"))

  useEffect(() => {
    if (didMountRef.current) {
      if (token == undefined || token == null || token == "") {
         setisadminValid(false)
            setIsLoading(false)

      } else {
         ApiService.fetchData("verify").then((res)=>{
          if(res?.status === 200)
          {
            setisadminValid(true)
            setIsLoading(false)
          }
        })
      }
    }
    didMountRef.current = false
  }, [])

if (isLoading) {
  return <div>Loading...</div> // Show loading indicator instead of login page
}

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {
          !isadminValid ? <>

            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/*' element={<Navigate to="/" replace />} />

            </Routes>
          </> : <>
            <MenuBar />
            <div className="content">
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/all-page' element={<AllPage />} />
                <Route path='/add-page' element={<AddPage />} />
                <Route path='/add-page/:id' element={<AddPage />} />
                <Route path='/*' element={<Navigate to="/" replace />} />
              </Routes>
            </div>

          </>
        }
      </BrowserRouter>
    </>
  )
}

export default App
