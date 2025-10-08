import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import DataContext from "../../Utils/DataContext";

const MenuSideBar = () => {

    const location = useLocation();
    const didMountRef = useRef(true)

    const { userRole, permission ,userrolewisepermisson} = useContext(DataContext)
    const [permissionn, setPermissionn] = useState(Array.isArray(permission) ? permission : [])

    useEffect(() => {
        if (didMountRef.current) {
            console.log(userRole);
            console.log(permission);
        }
        didMountRef.current = false
    }, [])


    // check if current path starts with /all-page or /add-page
    const isPageActive = location.pathname.startsWith("/all-page") ||
        location.pathname.startsWith("/add-page");
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
                    {permission.find((value) => value?.permissionRoleId == userRole?.roleId && value?.permissionType === "ALLMEDIA" && value?.status == 1) ? <>
                        <NavLink to="/all-media" className={({ isActive }) =>
                            `nav-item nav-link ${isActive ? "active" : ""}`
                        }><i className="fa fa-image me-2"></i>Media</NavLink>
                    </>
                        : false}
                    <div className="nav-item dropdown">
                        <a href="#" className={`nav-link dropdown-toggle ${isproductactive ? "active" : ""}`} data-bs-toggle="dropdown"><i
                            className="fa fa-shopping-bag me-2"></i>Products</a>
                        <div className={`dropdown-menu bg-transparent border-0 ${isproductactive ? "show" : ""}`}>
                            <NavLink to="/all-product" className={({ isActive }) =>
                                `dropdown-item ${isActive ? "active" : ""}`
                            }>All Products</NavLink>
                            <NavLink to="/add-product" className={({ isActive }) =>
                                `dropdown-item ${isActive ? "active" : ""}`
                            }>Add Product</NavLink>
                            <NavLink to="/product-category" className={({ isActive }) =>
                                `dropdown-item ${isActive ? "active" : ""}`
                            }>Product Category</NavLink>
                        </div>
                    </div>

                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i
                            className="fa fa-window-restore me-2"></i>Page</a>
                        <div className={`dropdown-menu bg-transparent border-0 ${isPageActive ? "show" : ""}`}>
                            <NavLink to="/all-page" className={({ isActive }) =>
                                `dropdown-item ${isActive ? "active" : ""}`
                            }>All Page</NavLink>
                            <NavLink to="/add-page" className={({ isActive }) =>
                                `dropdown-item ${isActive ? "active" : ""}`
                            }>Add Page</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
}

export default MenuSideBar
