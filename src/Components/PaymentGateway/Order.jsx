import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Toasts } from "../../Utils/Toasts"
import { NavLink } from "react-router-dom"

const Order = () => {

    const [orderData, setorderData] = useState([])
    const didMountRef = useRef(true)

    useEffect(() => {
        if (didMountRef.current) {

            ApiService.fetchData("/payment/all-order").then((res) => {
                if (res?.status == 200) {
                    setorderData(res?.data)
                }
            })
        }
        didMountRef.current = false
    }, [])




    return <>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-sm-0">Manage Order</h4>
                            <div className="user-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="javascript: void(0);">Order</a></li>
                                    <li className="breadcrumb-item active">Manage Order</li>
                                </ol>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card bg-secondary rounded h-100 p-4">
                        <div className="card-header">
                            <div className="row align-items-center gy-3">
                                <div className="col-sm">
                                    <h5 className="card-title my-1">Order</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-body justify-content-sm-center">
                            <div className="row align-items-center gy-3">
                                <div className="col-lg-12">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "60px" }}>S.no.</th>
                                                <th >Order Id</th>
                                                <th >Payment Method</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Date and Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderData && orderData.length > 0 ?

                                                <>
                                                    {orderData.map((value, index) =>
                                                        <tr key={value?.id}>
                                                            <th >{index + 1}</th>

                                                            <td > {value?.orderId} </td>
                                                            <td > {value?.paymentMethod} </td>


                                                            <td className="text-center"><button className="btn">
                                                                <span
                                                                    className={`badge ${value?.status === "captured"
                                                                            ? "bg-success-subtle"
                                                                            : value?.status === "failed"
                                                                                ? "bg-danger-subtle"
                                                                                : value?.status === "created"
                                                                                    ? "bg-warning-subtle"
                                                                                    : value?.status === "authorized"
                                                                                        ? "bg-info-subtle"
                                                                                        : "bg-secondary-subtle"
                                                                        } text-uppercase`}
                                                                >
                                                                    {value?.status === "captured"
                                                                        ? "Captured"
                                                                        : value?.status === "failed"
                                                                            ? "Failed"
                                                                            : value?.status === "created"
                                                                                ? "Created"
                                                                                : value?.status === "authorized"
                                                                                    ? "Authorized"
                                                                                    : "Unknown"}
                                                                </span>
                                                            </button>
                                                            </td>
<td className="text-center"><span>{new Date(value.createdAt).toLocaleDateString()}</span> <span>{new Date(value.createdAt).toLocaleTimeString()}</span></td>
                                                        </tr>
                                                    )}
                                                </>
                                                :
                                                <tr><td colSpan="5" style={{ textAlign: "center" }}>Data not Found</td></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>

}

export default Order