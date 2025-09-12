import { useEffect, useState } from "react";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";
import Constant from "../../Utils/Constant";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [formData, setformData] = useState({
        id: 0,
        product_name: "",
        product_slug: "",
        product_description: "",
        product_quantity: "",
        product_quantity_gms: "",
        product_mrp: "",
        product_discount_price: "",
        product_selling_price: "",
        meta_title: "",
        meta_keyword: "",
        meta_description: "",
        product_image: null,
    })


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

            setformData({ ...formData, product_image: file });
        }
    }

    const namechangemetaupdate = (e) => {
        const productslug = e.target.value.trim().toLowerCase().replace(/\s+/g, "-");
        setformData({
            ...formData, "product_name": e.target.value, "product_slug": productslug
        })

    }

    const changeValue = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    function priceCheck(event) {
        if (event.target.name === "product_mrp") {
            const mrp = parseFloat(event.target.value) || 0;

            setformData({
                ...formData,
                product_mrp: mrp,
                product_discount_price: "",
                product_selling_price: mrp,
            })
            return false
        }
        if (event.target.name === "product_discount_price") {
            const discount = parseFloat(event.target.value) || 0;
            const mrp = parseFloat(formData.product_mrp) || 0

            if (discount > mrp || discount == mrp) {
                if (mrp=="") {
                    alert("Enter MRP Price First!");

                } else if (discount > mrp) {
                    alert("Discount price cannot be greater than MRP!");

                } else if (discount == mrp) {
                    alert("Discount price and MRP cannot be same!");

                }
                setformData({
                    ...formData,
                    product_discount_price: "",
                    product_selling_price: "",
                })
                return false
            } else {
                setformData({
                    ...formData,
                    product_discount_price: discount,

                    product_selling_price: mrp - discount,
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
                        <div >
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
                                                    name="product_name" onChange={changeValue} onBlur={namechangemetaupdate} value={formData.product_name} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Product Slug: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required " placeholder="slug"
                                                    readOnly
                                                    value={formData?.product_slug}
                                                    name="product_slug" />

                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Product Desc: </label>
                                                <textarea type="text"
                                                    className="form-control ckeditor" id="product_description"
                                                    placeholder="Product Desc"
                                                    name="product_description" onChange={changeValue} value={formData.product_description} ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Product Quantity: <span style={{ color: "red" }}>*</span></label>
                                                <select className="form-control required" onChange={changeValue} value={formData.product_quantity} name="product_quantity" placeholder="choose Product Quantity">
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
                                                <select className="form-control required" onChange={changeValue} value={formData.product_quantity_gms} name="product_quantity_gms" placeholder="choose Product Quantity">
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
                                                    name="product_mrp" onChange={(e) => { changeValue(e); priceCheck(e) }} value={formData.product_mrp} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label">Discount (In Rupee): <span style={{ color: "red" }}>*</span></label>
                                                <input type="number"
                                                    className="form-control required"
                                                    placeholder="Product Discount"
                                                    name="product_discount_price" onChange={(e) => { changeValue(e); priceCheck(e) }} value={formData.product_discount_price} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mb-3">
                                                <label className="form-label">Selling Price: <span style={{ color: "red" }}>*</span></label>
                                                <input type="number" readOnly
                                                    className="form-control required"
                                                    placeholder="Product Selling Price"
                                                    name="product_selling_price" onChange={(e) => { changeValue(e); priceCheck(e) }} value={formData.product_selling_price} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <div className="fileimg d-flex">
                                                <img src={Constant.DEFAULT_IMAGE} className="fileimg-preview logoimage mediaImage mt-2" style={{ width: "80px", height: "80px", marginRight: "10px", borderRadius: "5px" }} />
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
                                                    name="meta_title" onChange={changeValue} value={formData.meta_title} />
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
                                                    name="meta_keyword" onChange={changeValue} value={formData.meta_keyword} />
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
                                                    name="meta_description" onChange={changeValue} value={formData.meta_description} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer  d-flex justify-content-between">
                                    <button type="button" onClick={submitForm} className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProduct