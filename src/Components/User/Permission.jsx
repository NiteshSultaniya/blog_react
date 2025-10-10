import React, { useContext, useEffect, useRef, useState } from "react";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";
import DataContext from "../../Utils/DataContext";

const Permission = () => {
    const [roleData, setroleData] = useState({})
    const didMountRef = useRef(true)
    const { permission } = useContext(DataContext)
    const [permissionn, setPermissionn] = useState([])

    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData("role-permission/role/all-active-role").then((res) => {
                if (res?.status === 200) {
                    setroleData(res?.data)
                }
            })
            ApiService.fetchData("role-permission/permission/all-permission")
                .then((res) => {
                    if (res?.status === 200) {
                        setPermissionn(res.data);
                    }
                })
        }
        didMountRef.current = false
    }, [])

    const permissionUpdate = (permissionRoleId, permissionType) => {
        const existingPermissionIndex = permissionn.findIndex((value) =>
            value?.permissionRoleId == permissionRoleId &&
            value?.permissionType === permissionType
        );

        let updatedPermission = [...permissionn];

        if (existingPermissionIndex !== -1) {
            updatedPermission[existingPermissionIndex] = {
                ...updatedPermission[existingPermissionIndex],
                status: updatedPermission[existingPermissionIndex].status === 1 ? 0 : 1
            };
        } else {
            updatedPermission.push({
                permissionRoleId,
                permissionType,
                status: 1
            });
        }

        setPermissionn(updatedPermission);


        let dataString = {
            permissionRoleId: permissionRoleId,
            permissionType: permissionType,
        }

        ApiService.postData("role-permission/permission/add-permission", dataString).then((res) => {
            if (res?.status === 200) {
                Toasts.sucess("Permission Updated Succesfully")
            }
        })

    }

    return (<>
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-sm-0">Manage Permission</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Permission</a></li>
                                        <li className="breadcrumb-item active">Manage Permission</li>
                                    </ol>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Manage Permission
                        </h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">Permission</th>
                                    {
                                        roleData && roleData.length > 0 ? roleData.map((data) =>
                                            (<th scope="col" key={data?.id}>{data.roleName}</th>)
                                        ) : (<>
                                        </>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-inherit"><h5>Permission</h5></td>
                                </tr>
                                <tr>
                                    <td className="border-inherit text-white-50">All Permission</td>
                                    {
                                        roleData && roleData.length > 0 ? roleData.map((data) =>
                                        (<td className="border-inherit" key={data?.id}>
                                            <input type="checkbox" id="country-floating" name="permissionRoleId" onChange={() => permissionUpdate(data?.id, "PERMISSION")}
                                                checked={permissionn.find((value) => value?.permissionRoleId == data?.id && value?.permissionType === "PERMISSION" && value?.status == 1) ? true : false}
                                            />
                                        </td>)
                                        ) : (<>
                                        </>)
                                    }
                                </tr>
                                <tr>
                                    <td className="border-inherit"><h5>Media</h5></td>
                                </tr>
                                <tr>
                                    <td className="border-inherit text-white-50">All Media</td>
                                    {
                                        roleData && roleData.length > 0 ? roleData.map((data) =>
                                        (<td className="border-inherit" key={data?.id}>
                                            <input type="checkbox" id="country-floating" name="permissionRoleId" onChange={() => permissionUpdate(data?.id, "ALLMEDIA")}
                                                checked={permissionn.find((value) => value?.permissionRoleId == data?.id && value?.permissionType === "ALLMEDIA" && value?.status == 1) ? true : false}
                                            />
                                        </td>)
                                        ) : (<>
                                        </>)
                                    }
                                </tr>



                                <tr>
                                    <td className="border-inherit"><h5>Product</h5></td>
                                </tr>
                                <tr>
                                    <td className="border-inherit text-white-50">All Product</td>
                                    {
                                        roleData && roleData.length > 0 ? roleData.map((data) =>
                                        (<td className="border-inherit" key={data?.id}>
                                            <input type="checkbox" id="country-floating" name="permissionRoleId" onChange={() => permissionUpdate(data?.id, "ALLPRODUCT")}
                                                checked={permissionn.find((value) => value?.permissionRoleId == data?.id && value?.permissionType === "ALLPRODUCT" && value?.status == 1) ? true : false}
                                            />
                                        </td>)
                                        ) : (<>
                                        </>)
                                    }
                                </tr>
                                <tr>
                                    <td className="border-inherit text-white-50">Add Product</td>
                                    {
                                        roleData && roleData.length > 0 ? roleData.map((data) =>
                                        (<td className="border-inherit" key={data?.id}>
                                            <input type="checkbox" id="country-floating" name="permissionRoleId" onChange={() => permissionUpdate(data?.id, "ADDPRODUCT")} checked={permissionn.find((value) => value?.permissionRoleId == data?.id && value?.permissionType === "ADDPRODUCT" && value?.status == 1) ? true : false} />
                                        </td>)
                                        ) : (<>
                                        </>)
                                    }
                                </tr>
                                <tr>
                                    <td className="border-inherit text-white-50">Product Category</td>
                                    {
                                        roleData && roleData.length > 0 ? roleData.map((data) =>
                                        (<td className="border-inherit" key={data?.id}>
                                            <input type="checkbox" id="country-floating" name="permissionRoleId" onChange={() => permissionUpdate(data?.id, "PRODUCTCATEGORY")} checked={permissionn.find((value) => value?.permissionRoleId == data?.id && value?.permissionType === "PRODUCTCATEGORY" && value?.status == 1) ? true : false} />
                                        </td>)
                                        ) : (<>
                                        </>)
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Permission