import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";
import UserModel from "./UserModel";

const AllUser = () => {

    const [userData, setuserData] = useState({});
    const [modelToggle, setmodelToggle] = useState(false);
    const [editmodelToggle, seteditmodelToggle] = useState({});
    const didMountRef = useRef(true)

    const modelTogglee = () => {
        setmodelToggle(!modelToggle)
        // console.log(modelToggle)
        seteditmodelToggle("")
    }

    const hideloginmodal = () => {
        setmodelToggle(!modelToggle);
    }

    useEffect(() => {
        if (didMountRef.current) {

            ApiService.fetchData("all-user").then((res) => {
                if (res?.status === "success") {
                    setuserData(res?.data)
                    // console.log(res?.data)
                }
            })
        }
        didMountRef.current = false

    }, [])

    const statusChange = (e) => {
        // console.log(e)
        const isConfirmed = confirm("Are You Sure You Want To Update The Status?");

        if (!isConfirmed) {
            return;
        }
        ApiService.fetchData(`user-status/${e}`).then((res) => {
            if (res?.status === "success") {
                Toasts.sucess(res?.msg)
            } else {

                Toasts.error(res?.msg)
            }
            window.location.reload()

        })
    }

    const deleteconfirm = (e) => {
        // console.log(e)
        const isConfirmed = confirm("Are You Sure You Want To Delete User?");

        if (!isConfirmed) {
            return;
        }
        ApiService.fetchData(`user-delete/${e}`).then((res) => {
            if (res?.status === 200) {
                Toasts.sucess(res?.msg)
            } else {

                Toasts.error(res?.msg)
            }
            window.location.reload()

        })
    }

    const editUser = (userId) => {
        console.log(userId);
        ApiService.fetchData(`find-by-id/${userId}`).then((res) => {
            if (res?.status === "success") {
                // console.log(res.data);
                modelTogglee()
                seteditmodelToggle(res.data)
            } else {
                Toasts.error(res?.msg)
            }
        })
    }

    return <>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-sm-0">Manage Users</h4>
                            <div className="user-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="javascript: void(0);">Users</a></li>
                                    <li className="breadcrumb-item active">Manage Users</li>
                                </ol>
                            </div>
                        </div>
                        <div>
                            <button onClick={modelTogglee} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i
                                className="ri-add-line me-2"></i>Add New</button>
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
                                    <h5 className="card-title my-1">Users</h5>
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
                                                <th>User Name</th>
                                                <th>User Email</th>
                                                <th>User Address</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData && userData.length > 0 ?
                                                <>
                                                    {userData.map((value, index) => (<>
                                                        <tr key={value?.id}>
                                                            <th>{index + 1}</th>
                                                            <td>{value?.username}</td>
                                                            <td>{value?.email}</td>
                                                            <td>{value?.role}</td>

                                                            {value?.status == 1 ? <>
                                                                <td className="text-center"><button onClick={(e) => statusChange(value?.id)} className="btn"><span className="badge bg-success-subtle text-uppercase">Active</span></button>
                                                                </td>
                                                            </> : <>
                                                                <td className="text-center"><button className="btn" onClick={(e) => statusChange(value?.id)}><span className="badge bg-danger-subtle text-uppercase">Inactive</span></button>
                                                                </td>

                                                            </>}

                                                            <td className="text-center">
                                                                <button className="btn btn-info btn-sm btnaction" onClick={(e) => editUser(value?.id)}><i
                                                                    className="fas fa-pencil-alt"></i></button>
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

        {
            modelToggle && <UserModel modelToggle={modelToggle} hideloginmodal={hideloginmodal} editmodelToggle={editmodelToggle}/>
        }

    </>

}

export default AllUser