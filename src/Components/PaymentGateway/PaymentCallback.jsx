import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Toasts } from "../../Utils/Toasts"
import { NavLink } from "react-router-dom"

const PaymentCallback = () => {

    
    return <>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-sm-0">Manage callback</h4>
                            <div className="user-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="javascript: void(0);">callback</a></li>
                                    <li className="breadcrumb-item active">Manage callback</li>
                                </ol>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary" type="button" ><i
                                className="ri-add-line me-2"></i>Add New</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>


    </>
    

}

export default PaymentCallback