const AddMedia = () => {
    var allowedMimes = ["png", "jpg", "jpeg", "gif"]; //allowed image mime types
    var maxMb = 2; //maximum allowed size (MB) of image

    function imageValidation(imageFile) {
        var fileInput = document.getElementById(imageFile);

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
                            <input type="hidden" name="media_id"
                                value="" />
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
                                                <div className="fileimg d-flex">
                                                    <img className="fileimg-preview logoimage mediaImage mt-2" style={{ width: "80px", height: "80px", marginRight: "10px", borderRadius: "5px" }} />
                                                    <div style={{width:"100%"}}>
                                                        <label className="form-label">Media Image:<span
                                                            style={{ color: "red" }}>*</span></label>
                                                        <div className="input-group">
                                                            <input type="file" className="form-control " id="imageFile" name="media"
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
                                    <button type="submit" id='button' className="btn btn-success">Save</button>
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