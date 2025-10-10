import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/Menu/MenuBar'
import Dashboard from './Components/Dashboard/Dashboard'
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
import Role from './Components/User/Role'
import DataContext from './Utils/DataContext'
import Permission from './Components/User/Permission'
import Register from './Components/Login/Register'

function App() {
  const [isadminValid, setisadminValid] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const didMountRef = useRef(true)

  let token = JSON.parse(localStorage.getItem("TOKEN"))
  const { userRole } = useContext(DataContext)
  const [permissionn,setPermissionn]=useState([])
  useEffect(() => {
    if (didMountRef.current) {
      const token = localStorage.getItem("TOKEN");

      if (!token) {
        setisadminValid(false);
        setIsLoading(false);
      } else {
        ApiService.fetchData("verify").then((res) => {
          if (res?.status === 200) {
            setisadminValid(true);
          } else if (res?.status === 401) {
            localStorage.removeItem("TOKEN");
          }
          setIsLoading(false);
        });

        ApiService.fetchData("role-permission/permission/all-permission")
          .then((res) => {
            if (res?.status === 200) {
              setPermissionn(res.data);
            }
          })
          
      }
      didMountRef.current = false;
    }
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
              <Route path='/register' element={<Register />} />
              <Route path='/*' element={<Navigate to="/login" replace />} />
            </Routes>
          </> : <>
            <MenuBar />
            <div className="content">
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/' element={<Dashboard />} />


                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ALLMEDIA" && value?.status == 1) ? <>
                  <Route path='/all-media' element={<AllMedia />} />
                  <Route path='/add-media' element={<AddMedia />} />
                </>
                  : false}
                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ALLPRODUCT" && value?.status == 1) ? <>
                  <Route path='/all-product' element={<AllProduct />} />
                  <Route path='/all-product/:filterstatusslug' element={<AllProduct />} />
                </> : false}
                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ADDPRODUCT" && value?.status == 1) ? <>
                  <Route path='/add-product' element={<AddProduct />} />
                  <Route path='/add-product/:id' element={<AddProduct />} />
                </> : false}
                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "PRODUCTCATEGORY" && value?.status == 1) ? <>
                  <Route path='/product-category' element={<ProductCategory />} />
                </>
                  : false}

                {/* Role And Permisssion */}
                <Route path='/user' element={<AllUser />} />

                <Route path='/role-permission/role' element={<Role />} />
                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "PERMISSION" && value?.status == 1) ? <>
                  <Route path='/role-permission/permission' element={<Permission />} />
                </>
                  : false}
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
