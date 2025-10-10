import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";

const ProductCategory = () => {

    const [categoryData, setcategoryData] = useState({})
    const didMountRef = useRef(true)

    const [formData, setfromData] = useState({
        "cat_id": 0,
        "cat_name": "",
        "cat_slug": "",
    })

    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData("product/category/all-category").then((res) => {
                if (res?.status === 200) {
                    setcategoryData(res?.data)
                }
            })
        }
        didMountRef.current = false
    }, [])

    const namechangemetaupdate = (e) => {
        const catSlug = e.target.value.trim().toLowerCase().replace(/\s+/g, "-");
        // setfromData({formData.cat_slug:catSlug})
        setfromData({
            ...formData, "cat_name": e.target.value, "cat_slug": catSlug
        })
    }
    const handleChange = (e) => {
        setfromData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const statusChange = (e) => {

        ApiService.fetchData(`product/category/category-status-update/${e}`).then((res) => {
            window.location.reload()
            if (res?.status === 200) {
                Toasts.sucess(res?.msg)
            } else {
                Toasts.error(res?.msg)
            }
        })
    }
    const deleteconfirm = (e) => {
        const isConfirmed = confirm("Are You Sure You Want To Delete User?");
        if (!isConfirmed) {
            return;
        }
        ApiService.fetchData(`product/category/category-delete/${e}`).then((res) => {
            if (res?.status === 200) {
                setcategoryData(categoryData.filter((value, index) => {
                    return value.cat_id !== e
                }))
                Toasts.sucess(res?.msg)
            } else {
                Toasts.error(res?.msg)
            }
        })
    }

    const submitForm = () => {
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
            ApiService.postData("product/category/category-add-process", formData).then((res) => {
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
        ApiService.fetchData(`product/category/find-category-by-id/${e}`).then((res) => {
            if (res?.status === 200) {
                setfromData(res?.data)
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
                                    <h4 className="mb-sm-0">Manage Category</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Category</a></li>
                                            <li className="breadcrumb-item active">Manage Category</li>
                                        </ol>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div id="formsubmit">
                                <input type="hidden" name="cat_id"
                                    value={formData.cat_id} />
                                <div className="card bg-secondary rounded p-3">
                                    <div className="card-header">
                                        <div className="row align-items-center gy-3">
                                            <div className="col-sm">
                                                <h5 className="card-title my-1">Add Category</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body justify-content-sm-center">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Category Name: <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text"
                                                        className="form-control required" onChange={handleChange}
                                                        placeholder="Menu Name" onBlur={namechangemetaupdate} id='cat_name_id'
                                                        value={formData?.cat_name}
                                                        name="cat_name" />

                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Category Slug: <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text"
                                                        className="form-control required " placeholder="slug"
                                                        id="cat_slug_id" readOnly
                                                        value={formData?.cat_slug}
                                                        name="cat_slug" />

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
                                            <h5 className="card-title my-1">Category</h5>
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
                                                        <th>Category Name</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {categoryData && categoryData.length > 0 ?
                                                        categoryData.map((value, index) =>
                                                            <React.Fragment key={index}>
                                                                <tr >
                                                                    <th>{index + 1}</th>
                                                                    <td>{value.cat_name}</td>

                                                                    {value?.status == 1 ? <>
                                                                        <td className="text-center"><button onClick={(e) => statusChange(value?.cat_id)} className="btn"><span className="badge bg-success-subtle text-uppercase">Active</span></button>
                                                                        </td>
                                                                    </> : <>
                                                                        <td className="text-center"><button className="btn" onClick={(e) => statusChange(value?.cat_id)}><span className="badge bg-danger-subtle text-uppercase">Inactive</span></button>
                                                                        </td>
                                                                    </>}
                                                                    <td className="text-center">
                                                                        <a onClick={(e) => editCat(value?.cat_id)} className="btn btn-info btn-sm btnaction"><i
                                                                            className="fas fa-pencil-alt"></i></a>
                                                                        <a onClick={(e) => deleteconfirm(value?.cat_id)}
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

export default ProductCategory