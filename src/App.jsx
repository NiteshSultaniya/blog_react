import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/Menu/MenuBar'
import Dashboard from './Components/Dashboard/Dashboard'
import AllPage from './Components/Page/AllPage'
import AddPage from './Components/Page/AddPage'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import { useContext, useEffect, useRef, useState } from 'react'
import ApiService from './Utils/ApiService'
import AllUser from './Components/User/AllUser'
import AddMedia from './Components/Media/AddMedia'
import AllMedia from './Components/Media/AllMedia'
import AllProduct from './Components/Product/AllProduct'
import AddProduct from './Components/Product/AddProduct'
import ProductCategory from './Components/Product/ProductCategory'
import {jwtDecode} from "jwt-decode";
import Role from './Components/User/Role'
import DataContext from './Utils/DataContext'

function App() {
  const [isadminValid, setisadminValid] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const didMountRef = useRef(true)
  const {userRole}=useContext(DataContext)
  
  let token = JSON.parse(localStorage.getItem("TOKEN"))
  
  useEffect(() => {
    if (didMountRef.current) {
      console.log(typeof(userRole))
      if (token == undefined || token == null || token == "") {
        setisadminValid(false)
        setIsLoading(false)
      }
      else {

        ApiService.fetchData("verify").then((res) => {
          if (res?.status === 200) {
            setisadminValid(true)
            setIsLoading(false)
          } else if (res?.status === 401) {
            localStorage.removeItem("TOKEN")
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

      <BrowserRouter basename='/admin'>
        <ToastContainer />
        {
          !isadminValid ? <>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/*' element={<Navigate to="/login" replace />} />
            </Routes>
          </> : <>
            <MenuBar />
            <div className="content">
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/all-page' element={<AllPage />} />
                <Route path='/user' element={<AllUser />} />
                <Route path='/add-page' element={<AddPage />} />
                <Route path='/all-media' element={<AllMedia />} />
                <Route path='/add-media' element={<AddMedia />} />

                <Route path='/all-product' element={<AllProduct />} />
                <Route path='/all-product/:filterstatusslug' element={<AllProduct />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/add-product/:id' element={<AddProduct />} />
                <Route path='/product-category' element={<ProductCategory />} />
                <Route path='/add-page/:id' element={<AddPage />} />


                {/* Role And Permisssion */}
                <Route path='/role-permission/role' element={<Role />} />
                {/* Role And Permisssion End */}









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
