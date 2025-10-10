import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import DataContext from "../../Utils/DataContext";
import ApiService from "../../Utils/ApiService";

const MenuSideBar = () => {

    const location = useLocation();
    const didMountRef = useRef(true)

    const { userRole, permission } = useContext(DataContext)
    const [permissionn, setPermissionn] = useState([])
    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData("role-permission/permission/all-permission")
                .then((res) => {
                    if (res?.status === 200) {
                        setPermissionn(res.data);
                    }
                })
        }
        didMountRef.current = false
    }, [])

    const isproductactive = location.pathname.startsWith("/all-product") ||
        location.pathname.startsWith("/add-product") || location.pathname.startsWith("/product-category");
    const isrolepermissionactive = location.pathname.startsWith("/role-permission/role") ||
        location.pathname.startsWith("/role-permission/permission") || location.pathname.startsWith("/user");
    return <>
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                {/* <a href="index.html" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>DarkPan</h3>
                    </a> */}
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <a href="/">
                            <img className="rounded-circle" src="/public/assets/img/paradise.png" alt="" style={{ width: "40px", height: "40px" }} />
                        </a>
                        <div
                            className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                        </div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Paradise</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">

                    <NavLink to="/dashboard" className={({ isActive }) =>
                        `nav-item nav-link ${isActive ? "active" : ""}`
                    }><i className="fa fa-tachometer-alt me-2"></i>Dashboard</NavLink>
                    {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "PERMISSION" && value?.status == 1) ? <>

                        <div className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${isrolepermissionactive ? "active" : ""}`} data-bs-toggle="dropdown"><i
                                className="fa fa-user me-2"></i>Role & Permission</a>
                            <div className={`dropdown-menu bg-transparent border-0 ${isrolepermissionactive ? "show" : ""}`}>
                                <NavLink to="/user" className={({ isActive }) =>
                                    `dropdown-item ${isActive ? "active" : ""}`
                                }>User</NavLink>
                                <NavLink to="/role-permission/role" className={({ isActive }) =>
                                    `dropdown-item ${isActive ? "active" : ""}`
                                }>Role</NavLink>
                                <NavLink to="/role-permission/permission" className={({ isActive }) =>
                                    `dropdown-item ${isActive ? "active" : ""}`
                                }>Permission</NavLink>

                            </div>
                        </div>
                    </> : false}
                    {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ALLMEDIA" && value?.status == 1) ? <>
                        <NavLink to="/all-media" className={({ isActive }) =>
                            `nav-item nav-link ${isActive ? "active" : ""}`
                        }><i className="fa fa-image me-2"></i>Media</NavLink>
                    </>
                        : false}
                    {permissionn.find((value) => (value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ALLPRODUCT" && value?.status == 1) || (value?.permissionRoleId == userRole?.roleId && value?.permissionType === "PRODUCTCATEGORY" && value?.status == 1) || (value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ADDPRODUCT" && value?.status == 1)) ? <>
                        <div className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${isproductactive ? "active" : ""}`} data-bs-toggle="dropdown"><i
                                className="fa fa-shopping-bag me-2"></i>Products</a>
                            <div className={`dropdown-menu bg-transparent border-0 ${isproductactive ? "show" : ""}`}>
                                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ALLPRODUCT" && value?.status == 1) ?
                                    <NavLink to="/all-product" className={({ isActive }) =>
                                        `dropdown-item ${isActive ? "active" : ""}`
                                    }>All Products</NavLink>
                                    : false}
                                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ADDPRODUCT" && value?.status == 1) ?
                                    <NavLink to="/add-product" className={({ isActive }) =>
                                        `dropdown-item ${isActive ? "active" : ""}`
                                    }>Add Product</NavLink>
                                    : false}
                                {permissionn.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "PRODUCTCATEGORY" && value?.status == 1) ?
                                    <NavLink to="/product-category" className={({ isActive }) =>
                                        `dropdown-item ${isActive ? "active" : ""}`
                                    }>Product Category</NavLink>
                                    : false}
                            </div>
                        </div>
                    </>
                        : false}

                </div>
            </nav>
        </div>
    </>
}

export default MenuSideBar
