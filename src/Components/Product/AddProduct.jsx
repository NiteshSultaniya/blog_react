import { useEffect, useRef, useState } from "react";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";
import Constant from "../../Utils/Constant";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
    const [formData, setformData] = useState({
        id: 0,
        productName: "",
        productSlug: "",
        productDescription: "",
        productQuantity: "",
        productQuantityGms: "",
        productMrp: "",
        productDiscountPrice: "",
        productSellingPrice: "",
        metaTitle: "",
        metaKeyword: "",
        metaDescription: "",
        file: "fgdfg",
    })
    const [productImage, setProductImage] = useState("")
    const [productImageURL, setProductImageURL] = useState("")

    const didMountRef = useRef(true)
    const slug = useParams()
    useEffect(() => {
        if (didMountRef.current) {
            if (slug?.id !== "" && slug?.id !== undefined) {
                ApiService.fetchData(`product/find-product-by-id/${slug?.id}`).then((res) => {
                    if (res?.status === 200) {
                        setformData(res?.data)
                        setProductImage(res?.data?.productImage)
                        setProductImageURL(res?.product_image_path)
                    } else {
                        Toasts.error(res?.msg)
                    }
                })
            }
        }
        didMountRef.current = false
    }, [])


    var allowedMimes = ["png", "jpg", "jpeg", "gif"]; //allowed image mime types
    var maxMb = 2; //maximum allowed size (MB) of image

    const imageValidation = (imageFile) => {
        var fileInput = document.getElementById("imageFile");
        // console.log(fileInput);
        // return false

        var mime = fileInput.value.split(".").pop();
        var fsize = fileInput.files[0].size;
        var file = fsize / 1024;
        var mb = file / 1024; // convert kb to mb
        if (mb > maxMb) {
            alert("Image size must be less than 2mb");
        } else if (!allowedMimes.includes(mime)) {
            // if allowedMimes array does not have the extension
            alert("Only png, jpg, jpeg alowed");
        } else {
            let reader = new FileReader();
            reader.onload = function (event) {
                $(".mediaImage").attr("src", event.target.result);
            };
            reader.readAsDataURL(fileInput.files[0]);
            const file = fileInput.files[0];

            setformData({ ...formData, file: file });
        }
    }

    const namechangemetaupdate = (e) => {
        const productslug = e.target.value.trim().toLowerCase().replace(/\s+/g, "-");
        setformData({
            ...formData, "productName": e.target.value, "productSlug": productslug
        })

    }

    const changeValue = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    function priceCheck(event) {
        if (event.target.name === "productMrp") {
            const mrp = parseFloat(event.target.value) || 0;

            setformData({
                ...formData,
                productMrp: mrp,
                productDiscountPrice: "",
                productSellingPrice: mrp,
            })
            return false
        }
        if (event.target.name === "productDiscountPrice") {
            const discount = parseFloat(event.target.value) || 0;
            const mrp = parseFloat(formData.productMrp) || 0

            if (discount > mrp || discount == mrp) {
                if (mrp == "") {
                    alert("Enter MRP Price First!");

                } else if (discount > mrp) {
                    alert("Discount price cannot be greater than MRP!");

                } else if (discount == mrp) {
                    alert("Discount price and MRP cannot be same!");

                }
                setformData({
                    ...formData,
                    productDiscountPrice: "",
                    productSellingPrice: "",
                })
                return false
            } else {
                setformData({
                    ...formData,
                    productDiscountPrice: discount,

                    productSellingPrice: mrp - discount,
                })
            }

        }
    }



    const submitForm = () => {
        console.log(formData);
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
            ApiService.postFile("product/product-add-process", formData).then((res) => {
                if (res?.status === 200) {
                    // navigate("/all-media")
                    // window.location.reload()
                    Toasts.sucess(res?.msg)
                } else {
                    Toasts.error(res?.msg)
                }
            })
        }

    }
    return (
        <>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="mb-sm-0">Manage Add Product</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Add Product</a></li>
                                            <li className="breadcrumb-item active">Manage Add Product</li>
                                        </ol>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card bg-secondary rounded p-2">
                                <div className="card-header">
                                    <div className="row align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title my-1">Add Product</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body justify-content-sm-center">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Product Name: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required"
                                                    placeholder="Product Name"
                                                    name="productName" onChange={changeValue} onBlur={namechangemetaupdate} value={formData.productName} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Product Slug: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required " placeholder="slug"
                                                    readOnly
                                                    value={formData?.productSlug}
                                                    name="productSlug" />

                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Product Desc: </label>
                                                <textarea type="text"
                                                    className="form-control ckeditor" id="productDescription"
                                                    placeholder="Product Desc"
                                                    name="productDescription" onChange={changeValue} value={formData.productDescription} ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Product Quantity: <span style={{ color: "red" }}>*</span></label>
                                                <select className="form-control required" onChange={changeValue} value={formData.productQuantity} name="productQuantity" placeholder="choose Product Quantity">
                                                    <option value="">Choose Quantity</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Product Quantity(In Grams): <span style={{ color: "red" }}>*</span></label>
                                                <select className="form-control required" onChange={changeValue} value={formData.productQuantityGms} name="productQuantityGms" placeholder="choose Product Quantity">
                                                    <option value="">Choose Quantity</option>
                                                    <option value="250GM">250 GM</option>
                                                    <option value="500GM">500 GM</option>
                                                    <option value="1KG">1 KG</option>
                                                    <option value="2KG">2 KG</option>
                                                    <option value="5KG">5 KG</option>
                                                    <option value="10KG">10 KG</option>
                                                </select>

                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label">MRP: <span style={{ color: "red" }}>*</span></label>
                                                <input type="number"
                                                    className="form-control required"
                                                    placeholder="Product MRP"
                                                    name="productMrp" onChange={(e) => { changeValue(e); priceCheck(e) }} value={formData.productMrp} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label">Discount (In Rupee): <span style={{ color: "red" }}>*</span></label>
                                                <input type="number"
                                                    className="form-control required"
                                                    placeholder="Product Discount"
                                                    name="productDiscountPrice" onChange={(e) => { changeValue(e); priceCheck(e) }} value={formData.productDiscountPrice} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label">Selling Price: <span style={{ color: "red" }}>*</span></label>
                                                <input type="number" readOnly
                                                    className="form-control required"
                                                    placeholder="Product Selling Price"
                                                    name="productSellingPrice" onChange={(e) => { changeValue(e); priceCheck(e) }} value={formData.productSellingPrice} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <div className="fileimg d-flex">
                                                <img src={productImage !== "" ? productImageURL + productImage : Constant.DEFAULT_IMAGE} className="fileimg-preview logoimage mediaImage mt-2" style={{ width: "80px", height: "80px", marginRight: "10px", borderRadius: "5px" }} />
                                                <div style={{ width: "100%" }}>
                                                    <label className="form-label">Media Image:<span
                                                        style={{ color: "red" }}>*</span></label>
                                                    <div className="input-group">
                                                        <input type="file" className="form-control" id="imageFile" name="product_image"
                                                            accept="image/png, image/gif, image/jpeg"
                                                            onChange={(e) => imageValidation(imageFile)} />

                                                    </div>
                                                    <small className="text-muted" style={{ fontSize: "11px" }}>Accepted: gif, png, jpg.
                                                        Max file size 2Mb</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Meta Title: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required"
                                                    placeholder="Meta Title"
                                                    name="metaTitle" onChange={changeValue} value={formData.metaTitle} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Meta Keyword: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required"
                                                    placeholder="Meta Keyword"
                                                    name="metaKeyword" onChange={changeValue} value={formData.metaKeyword} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Meta Description:</label>
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Meta Description"
                                                    name="metaDescription" onChange={changeValue} value={formData.metaDescription} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer  d-flex justify-content-between">
                                    <button type="button" onClick={submitForm} className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card bg-secondary rounded p-2 mb-2">
                                <div className="card-header">
                                    <div className="row align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title my-1">Publish</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body justify-content-sm-center bordered">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <button type="button" id="button" className="btn btn-success" >
                                                    Publish
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-secondary rounded p-2 mb-2">
                                <div className="card-header">
                                    <h5>Category</h5> </div>
                                <div className="card-body justify-content-sm-center bordered">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <p style={{lineHeight: "20px"}}><small className="text-muted">Select category in which you want to display this blog. You can also select multiple categories for this blog.</small></p>
                                                <div style={{height: "250px", overflowX: "hidden", border: "1px solid #5d5959", padding: "10px", background:" #414141"}}>

                                                    <div className="form-check form-check-inline" style={{width: "100%", marginBottom: "10px",marginLeft:"0px", cursor:"pointer"}}>
                                                        <input className="form-check-input categorychcked" style={{cursor:"pointer"}} type="checkbox" id="inlineCheckbox{{ $count }}" value="{{ $data-> cat_id}}" name="category_id[]" />
                                                        <label className="form-check-label" style={{cursor:"pointer" }} htmlFor="inlineCheckbox1">MEN</label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <a href="product-category"> <span><i className="ri-add-line me-2"></i></span> Add Category</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- <div className="card-footer"> <a href="https://bybv.in/csadmin/category" target="_blank">+ Add New Category</a> </div> --> */}
                            </div>
                            {/* <div className="card bg-secondary rounded p-2 mb-2">
                                <div className="card-header">
                                    <div className="row align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title my-1">Product Image</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body justify-content-sm-center bordered">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <div className="">
                                                    <img className="fileimg-preview logoimage mediaImage mt-2" src="" style={{height: "225px", width: "100%", objectFit: 'contain', border: "1px solid rgba(72, 94, 144, 0.16)", cursor:"pointer"}} />
                                                    <div style="width:100%" className="text-center">
                                                        <div className="input-group mb-2 d-none">
                                                            <input type="file" className="form-control " id="imageFile" name="product_image" accept="image/png, image/gif, image/jpeg" />
                                                        </div>
                                                        <small className="text-muted " style="font-size:11px;">Accepted: gif, png, jpg. Max file size 2Mb</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProduct