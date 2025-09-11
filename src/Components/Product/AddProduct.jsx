import { useEffect, useState } from "react";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";
import Constant from "../../Utils/Constant";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [formData, setformData] = useState({
        product_name: "",
        product_slug: "",
        product_desc: "",
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

            setformData({ ...formData, product_image:file });
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

    const submitForm=()=>{
        console.log(formData);
        
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
                                                <label className="form-label">Product Desc: <span style={{ color: "red" }}>*</span></label>
                                                <textarea type="text"
                                                    className="form-control ckeditor" id="product_desc"
                                                    placeholder="Product Desc"
                                                    name="product_desc" onChange={changeValue} value={formData.product_desc} ></textarea>
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
                                                            <input type="file" className="form-control " id="imageFile" name="product_image"
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={(e) => imageValidation(imageFile)} />

                                                        </div>
                                                        <small className="text-muted" style={{ fontSize: "11px" }}>Accepted: gif, png, jpg.
                                                            Max file size 2Mb</small>
                                                    </div>
                                                </div>
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