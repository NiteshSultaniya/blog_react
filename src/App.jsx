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
import AllUser from './Components/User/AllUser'
import AddMedia from './Components/Media/AddMedia'
import AllMedia from './Components/Media/AllMedia'
import AllProduct from './Components/Product/AllProduct'
import AddProduct from './Components/Product/AddProduct'
import ProductCategory from './Components/Product/ProductCategory'

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
      }
      else {
        ApiService.fetchData("verify").then((res) => {
          if (res?.status === 200) {
            setisadminValid(true)
            setIsLoading(false)
          }else if(res?.status === 401){
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
                <Route path='/user' element={<AllUser />} />
                <Route path='/add-page' element={<AddPage />} />
                <Route path='/all-media' element={<AllMedia />} />
                <Route path='/add-media' element={<AddMedia />} />

                <Route path='/all-product' element={<AllProduct />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/product-category' element={<ProductCategory />} />
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
