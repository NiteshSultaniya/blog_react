import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Toasts } from "../../Utils/Toasts"
import { NavLink } from "react-router-dom"

const AllProduct = () => {

    const [productData, setproductData] = useState([])
    return <>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-sm-0">Manage Product</h4>
                            <div className="user-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="javascript: void(0);">Product</a></li>
                                    <li className="breadcrumb-item active">Manage Product</li>
                                </ol>
                            </div>
                        </div>
                        <div>
                            <NavLink to={"/add-product"} className="btn btn-primary"><i
                                className="ri-add-line me-2"></i>Add New</NavLink>
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
                                    <h5 className="card-title my-1">Product</h5>
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
                                                <th className="text-center">Product</th>
                                                <th className="text-center">Product Name</th>
                                                <th className="text-center">Product Url</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productData && productData.length > 0 ?

                                                <>
                                                    {productData.map((value, index) => (<>
                                                        <tr key={value?.id}>
                                                            <th >{index + 1}</th>
                                                            <td className="text-center">
                                                                <img style={{ objectFit: "cover", width: "50px", height: "50px" }} src={product_image_path ? product_image_path + value.product_url : ""} alt="" />
                                                            </td>
                                                            <td className="text-center">{value?.product_name}</td>
                                                            <td className="text-center"> <a href={product_image_path ? product_image_path + value.product_url : ""} target="_new">{product_image_path ? product_image_path + value.product_url : ""}</a> </td>

                                                            {value?.status == 1 ? <>
                                                                <td className="text-center"><button onClick={(e) => statusChange(value?.id)} className="btn"><span className="badge bg-success-subtle text-uppercase">Active</span></button>
                                                                </td>
                                                            </> : <>
                                                                <td className="text-center"><button className="btn" onClick={(e) => statusChange(value?.id)}><span className="badge bg-danger-subtle text-uppercase">Inactive</span></button>
                                                                </td>

                                                            </>}

                                                            <td className="text-center">

                                                                <button
                                                                    onClick={(e) => deleteconfirm(value?.id)}
                                                                    className="btn btn-danger  btn-sm btnaction"><i
                                                                        className="fas fa-trash "></i></button>
                                                            </td>
                                                        </tr>
                                                    </>))}
                                                </>
                                                : <>
                                                    <tr><td colSpan="5" style={{ textAlign: "center" }}>Data not Found</td></tr>
                                                </>}
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

export default AllProduct