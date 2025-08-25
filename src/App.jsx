import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/Menu/MenuBar'
import Dashboard from './Components/Dashboard/Dashboard'
import AllPage from './Components/Page/AllPage'
import AddPage from './Components/Page/AddPage'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [isadminSession, setisadminSession] = useState(false)
  const didMountRef = useRef(true)
  useEffect(() => {

    if (didMountRef.current) {
      let admin = JSON.parse(localStorage.getItem("AdminSession"))
      // console.log(admin)
      if (admin !== undefined && admin !== null) {
        setisadminSession(true)
      }
    }
    didMountRef.current = false
  }, [])


  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {
          !isadminSession ? <>

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
