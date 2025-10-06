import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";

const Role = () => {

    const didMountRef = useRef(true)

    const [roleData, setroleData] = useState({
        "id": 0,
        "roleName": "",
    })
    const [roleGetData, setroleGetData] = useState({
        "id": 0,
        "roleName": "",
    })

    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData("role-permission/role/all-role").then((res) => {
                if (res?.status === 200) {
                    setroleGetData(res?.data)
                }
            })
        }
        didMountRef.current = false
    }, [])

    const namechangemetaupdate = (e) => {
        const catSlug = e.target.value.trim().toLowerCase().replace(/\s+/g, "-");
        // setRoleData({roleData.cat_slug:catSlug})
        setroleData({
            ...roleData, "roleName": e.target.value
        })
    }
    const handleChange = (e) => {
        setroleData({
            ...roleData, [e.target.name]: e.target.value.toUpperCase()
        })
    }

    const statusChange = (e) => {

        ApiService.fetchData(`role-permission/role/role-status-update/${e}`).then((res) => {
            window.location.reload()
            if (res?.status === 200) {
                Toasts.sucess(res?.msg)
            } else {
                Toasts.error(res?.msg)
            }
        })
    }
    const deleteconfirm = (e) => {
        // console.log(e)
        const isConfirmed = confirm("Are You Sure You Want To Delete User?");
        if (!isConfirmed) {
            return;
        }
        ApiService.fetchData(`role-permission/role/role-delete/${e}`).then((res) => {
            if (res?.status === 200) {
                setroleGetData(roleGetData.filter((value, index) => {
                    return value.id !== e
                }))
                Toasts.sucess(res?.msg)
            } else {
                Toasts.error(res?.msg)
            }
        })
    }

    const submitForm = () => {
        console.log(roleData);
        
        let required = document.getElementsByClassName("required");
        let counter = 0
        for (let i = 0; i < required.length; i++) {
            if (required[i].value === "") {
                required[i].style.border = "1px solid red";
                counter++
            }
        }
        if (counter > 0) {
            Toasts.error("Please Fill Required Field")
            return false
        } else {
            ApiService.postData("role-permission/role/role-add-process", roleData).then((res) => {
                if (res?.status === 200) {
                    // navigate("/all-media")
                    window.location.reload()
                    Toasts.sucess(res?.msg)
                } else {
                    Toasts.error(res?.msg)
                }
            })
        }
    }
    const editCat = (e) => {
        ApiService.fetchData(`role-permission/role/find-role-by-id/${e}`).then((res) => {
            if (res?.status === 200) {
                console.log(res?.data)
                setroleData(res?.data)
            } else {
                Toasts.error(res?.msg)
            }
        })
    }

    return (
        <>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="mb-sm-0">Manage Role</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Role</a></li>
                                            <li className="breadcrumb-item active">Manage Role</li>
                                        </ol>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div id="formsubmit">
                                <input type="hidden" name="id" value={roleData?.id} />
                                <div className="card bg-secondary rounded p-3">
                                    <div className="card-header">
                                        <div className="row align-items-center gy-3">
                                            <div className="col-sm">
                                                <h5 className="card-title my-1">Add Role</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body justify-content-sm-center">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Role Name: <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text"
                                                        className="form-control required" onChange={handleChange}
                                                        placeholder="Role Name" onBlur={namechangemetaupdate} id='roleName_id'
                                                        value={roleData?.roleName}
                                                        name="roleName" />

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card-footer  d-flex justify-content-between">
                                        <button type="submit" id='button' className="btn btn-success"
                                            onClick={submitForm}>Save</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card bg-secondary rounded p-2">
                                <div className="card-header">
                                    <div className="row align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title my-1">Role</h5>
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
                                                        <th>Role Name</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {roleGetData && roleGetData.length > 0 ?
                                                        roleGetData.map((value, index) =>
                                                            <React.Fragment key={index}>
                                                                <tr >
                                                                    <th>{index + 1}</th>
                                                                    <td>{value.roleName}</td>

                                                                    {value?.status == 1 ? <>
                                                                        <td className="text-center"><button onClick={(e) => statusChange(value?.id)} className="btn"><span className="badge bg-success-subtle text-uppercase">Active</span></button>
                                                                        </td>
                                                                    </> : <>
                                                                        <td className="text-center"><button className="btn" onClick={(e) => statusChange(value?.id)}><span className="badge bg-danger-subtle text-uppercase">Inactive</span></button>
                                                                        </td>
                                                                    </>}
                                                                    <td className="text-center">
                                                                        <a onClick={(e) => editCat(value?.id)} className="btn btn-info btn-sm btnaction"><i
                                                                            className="fas fa-pencil-alt"></i></a>
                                                                        <a onClick={(e) => deleteconfirm(value?.id)}
                                                                            className="btn btn-danger  btn-sm btnaction"><i
                                                                                className="fas fa-trash "></i></a>
                                                                    </td>
                                                                </tr>
                                                            </React.Fragment>
                                                        )
                                                        :
                                                        <tr>
                                                            <td className="text-center" colSpan="5">No Data Found</td>
                                                        </tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer listing justify-content-sm-center">
                                    <p>Sowing 1 of 1</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Role