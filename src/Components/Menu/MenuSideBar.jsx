import { NavLink, useLocation } from "react-router-dom"

const MenuSideBar = () => {

    const location = useLocation();

  // check if current path starts with /all-page or /add-page
  const isPageActive = location.pathname.startsWith("/all-page") || 
                       location.pathname.startsWith("/add-page");
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

                    <NavLink to="/" className={({ isActive }) =>
                        `nav-item nav-link ${isActive ? "active" : ""}`
                    }><i className="fa fa-tachometer-alt me-2"></i>Dashboard</NavLink>
                    <NavLink to="/user" className={({ isActive }) =>
                        `nav-item nav-link ${isActive ? "active" : ""}`
                    }><i className="fa fa-tachometer-alt me-2"></i>User</NavLink>

                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i
                            className="fa fa-laptop me-2"></i>Page</a>
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
