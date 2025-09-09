import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"

const AllMedia = () => {

    const [mediaData, setmediaData] = useState([])
    const [media_image_path, setmedia_image_path] = useState([])
    const didMountRef = useRef(true)

    useEffect(() => {
        if (didMountRef.current) {

            ApiService.fetchData("/media/all-media").then((res) => {
                if (res?.status == 200) {
                    setmediaData(res?.data)
                    setmedia_image_path(res?.media_image_path)
                    // console.log(res?.data)
                }
            })
        }
        didMountRef.current = false
    }, [])


    const statusChange = (e) => {

    }
    const deleteconfirm = (e) => {

    }
    return <>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-sm-0">Manage Media</h4>
                            <div className="user-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="javascript: void(0);">Media</a></li>
                                    <li className="breadcrumb-item active">Manage Media</li>
                                </ol>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i
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
                                    <h5 className="card-title my-1">Media</h5>
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
                                                <th>Media Name</th>
                                                <th>Media Url</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mediaData && mediaData.length > 0 ?
                                                <>
                                                    {mediaData.map((value, index) => (<>
                                                        <tr key={value?.id}>
                                                            <th>{index + 1}</th>
                                                            <img style={{objectFit:"cover",width:"50px" ,height:"50px"}} src={media_image_path?media_image_path+value.media_url:""} alt=""/>

                                                                <td>{value?.media_name}</td>
                                                                <td>{value?.media_url}</td>

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

export default AllMedia