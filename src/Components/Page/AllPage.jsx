import { NavLink } from "react-router-dom";

const AllPage = () => {
   
    let pageData={}
    return <>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-sm-0">Manage Pages</h4>
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                    <li className="breadcrumb-item active">Manage Pages</li>
                                </ol>
                            </div>
                        </div>
                        <div>
                            <NavLink to="/add-page" className="btn btn-primary"><i
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
                                    <h5 className="card-title my-1">Pages</h5>
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
                                                <th>Page Name</th>
                                                <th>Page Url</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pageData && pageData.length > 0 ?
                                                <>
                                                    {pageData.map((value, index) => (<>
                                                        <tr key={index}>
                                                            <th>{index+1}</th>
                                                            <td>{value?.page_name}</td>

                                                            <td><a href={value?.page_url}>{value?.page_url}</a></td>
                                                            {value?.page_status == 1 ? <>

                                                                <td className="text-center"><a href=""><span className="badge bg-success-subtle text-uppercase">Active</span></a>
                                                                </td>
                                                            </> : <>
                                                                <td className="text-center"><a href=""><span className="badge bg-danger-subtle text-uppercase">Inactive</span></a>
                                                                </td>

                                                            </>}

                                                            <td className="text-center">
                                                                <NavLink to={`/add-page/${value?.page_id}`} className="btn btn-info btn-sm btnaction"><i
                                                                    className="fas fa-pencil-alt"></i></NavLink>
                                                                <NavLink to="#"
                                                                    onClick={(e) => deleteconfirm(value?.page_id)}
                                                                    className="btn btn-danger  btn-sm btnaction"><i
                                                                        className="fas fa-trash "></i></NavLink>
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

export default AllPage