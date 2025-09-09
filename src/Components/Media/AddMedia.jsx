import { useEffect, useState } from "react";
import ApiService from "../../Utils/ApiService";
import { Toasts } from "../../Utils/Toasts";

const AddMedia = () => {
    const [formData, setformData] = useState({
        media_name: "",
        file: null,
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

            setformData({ ...formData, file });
        }
    }

    useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]);


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
        ApiService.postData("media/add-media-process", formData, true).then((res) => {
            if (res?.status === 200) {
                Toasts.sucess(res?.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } else {
                Toasts.error(res?.msg)
            }
        })
    }   

    }

    const changeValue = (e) => {
            setformData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="mb-sm-0">Manage Add Media</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Add Media</a></li>
                                            <li className="breadcrumb-item active">Manage Add Media</li>
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
                                            <h5 className="card-title my-1">Add Media</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body justify-content-sm-center">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Media Name: <span style={{ color: "red" }}>*</span></label>
                                                <input type="text"
                                                    className="form-control required"
                                                    placeholder="Media Name"
                                                    name="media_name" onChange={changeValue} value={formData.media_name} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <div className="fileimg d-flex">
                                                    <img className="fileimg-preview logoimage mediaImage mt-2" style={{ width: "80px", height: "80px", marginRight: "10px", borderRadius: "5px" }} />
                                                    <div style={{ width: "100%" }}>
                                                        <label className="form-label">Media Image:<span
                                                            style={{ color: "red" }}>*</span></label>
                                                        <div className="input-group">
                                                            <input type="file" className="form-control " id="imageFile" name="file"
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
export default AddMedia