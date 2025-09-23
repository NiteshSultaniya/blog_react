import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Toasts } from "../../Utils/Toasts"
import { NavLink } from "react-router-dom"
import Constant from "../../Utils/Constant"
import InfiniteScroll from "react-infinite-scroll-component"

const AllProduct = () => {

    // const [productData, setproductData] = useState([])
    const [productData, setproductData] = useState([])
    const [totalPages, settotalPages] = useState(0)
    const [currentPages, setcurrentPages] = useState(0)
    const [product_image_path, setproduct_image_path] = useState([])
    const didMountRef = useRef(true)


    const fetchProduct = (nextpage = 0) => {
        // console.log(nextpage);

        ApiService.fetchData(`product/all-product?page=${nextpage}&size=5`).then((res) => {
            if (res?.status == 200) {
                setproductData(prev => [...prev, ...res.data.content]);
                // productData.push(res?.data?.content)
                setproduct_image_path(res?.product_image_path)
                settotalPages(res?.data?.totalPages)
                // setcurrentPages(res?.data?.number)
                // console.log(productData);

            }
        })
    }





    useEffect(() => {
        if (didMountRef.current) {
            fetchProduct()
        }
        didMountRef.current = false
    }, [])


    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
                console.log("productData");

            // setcurrentPages(currentPages + 1)
            setcurrentPages(()=>{
                nextpage()
                
                return currentPages+1})

        }
    };
    const nextpage = () => {
        console.log(currentPages)
        console.log(totalPages)
        if (currentPages < totalPages) {
            // setcurrentPages(currentPages + 1)
            fetchProduct(currentPages)
        }
    }

    const statusChange = (e) => {
        console.log(e)
        ApiService.fetchData(`product/product-status-update/${e}`).then((res) => {
            if (res?.status === 200) {
                window.location.reload()
            } else {
                Toasts.error(res?.msg)
            }
        })
    }
    const deleteconfirm = (e) => {
        let deleteomfirmation = confirm("Are You Sure You Wnat to Delete It?")
        if (!deleteomfirmation) {
            return false
        }

        ApiService.fetchData(`product/product-delete/${e}`).then((res) => {
            if (res?.status === 200) {
                Toasts.sucess(res?.msg)
                setproductData(productData.filter((value, index) => {
                    return value.id !== e
                }))
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
                                    <div style={{ maxHeight: "400px", overflowY: "auto" }} onScroll={handleScroll}>

                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "60px" }}>S.no.</th>
                                                    <th className="text-center">Product</th>
                                                    <th className="text-center">Product Name</th>
                                                    <th className="text-center">Product Quantity</th>
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
                                                                    <img style={{ objectFit: "cover", width: "50px", height: "50px" }} src={value?.productImage ? product_image_path + value?.productImage : Constant.DEFAULT_IMAGE} alt="" />
                                                                </td>
                                                                <td className="text-center">{value?.productName}</td>
                                                                <td className="text-center">{value?.productQuantity}</td>


                                                                {value?.status == 1 ? <>
                                                                    <td className="text-center"><button onClick={(e) => statusChange(value?.id)} className="btn"><span className="badge bg-success-subtle text-uppercase">Active</span></button>
                                                                    </td>
                                                                </> : <>
                                                                    <td className="text-center"><button className="btn" onClick={(e) => statusChange(value?.id)}><span className="badge bg-danger-subtle text-uppercase">Inactive</span></button>
                                                                    </td>
                                                                </>}
                                                                <td className="text-center">
                                                                    <NavLink to={`/add-product/${value?.id}`} className="btn btn-info btn-sm btnaction"><i
                                                                        className="fas fa-pencil-alt"></i></NavLink>
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
        </div>

    </>

}

export default AllProduct