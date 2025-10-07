import { useContext, useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"
import DataContext from "../../Utils/DataContext";

const Dashboard = () => {

    const {userRole,permission}=useContext(DataContext)
    // console.log(userRole);
    // console.log(permission);
    
    return <>
        <div className="container-fluid pt-4 px-4">
            <div className="row">
                <div className="col-lg-12">
                    <h5>Good Morning {userRole?.sub}</h5>
                    <p>Here's what's happening with your store today.
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard