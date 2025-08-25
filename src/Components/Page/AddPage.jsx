import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Toasts } from "../../Utils/Toasts";

const AddPage = () => {

    const [preview, setPreview] = useState("/public/assets/img/defaultimage.png"); // default image
    const [metaData, setmetaData] = useState("")
    const slug = useParams()
    const uniqueKey = () => { return Date.now() + "_" + Math.random().toString(36) };
    const [formData, setfromData] = useState({
        "page_id": uniqueKey(),
        "page_name": "",
        "page_url": "",
        "page_content": "",
        "page_header_image": "",
        "page_meta_title": "",
        "page_meta_keyword": "",
        "page_meta_description": "",
        "page_status": 1,
    })
    const navigate = useNavigate()
    const didMountRef = useRef(true);
    useEffect(() => {
        if (didMountRef.current) {
            if (slug.id !== undefined) {
                console.log(slug)
                const existingPageString = localStorage.getItem("pageDataSession")
                const existingPageData = existingPageString ? JSON.parse(existingPageString) : [];
                if (existingPageData.length > 0) {
                    const newpageData = existingPageData.find((sessionValue) => { return sessionValue.page_id === slug.id })
                    if (newpageData == undefined) {
                        navigate("/all-page")
                    }
                    setfromData(newpageData)
                } else {

                    navigate("/all-page")
                }
            }
        }
        didMountRef.current = false
    }, [])
    const handleChange = (e) => {
        setfromData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const formSubmit = (e) => {
        setfromData({ ...formData, "page_id": uniqueKey() })
        uniqueKey()
        e.preventDefault()
        let existingPageItemsString = localStorage.getItem('pageDataSession');

        const existingpageDataSession = existingPageItemsString ? JSON.parse(existingPageItemsString) : []
        if (existingpageDataSession.length > 0) {
            let checkeditcase = existingpageDataSession.findIndex((data) => { return (data.page_id === slug.id) })
            if (checkeditcase !== -1) {
                existingpageDataSession[checkeditcase] = formData
                localStorage.setItem("pageDataSession", JSON.stringify(existingpageDataSession))
            } else {
                let newsessionData = [...existingpageDataSession, formData]
                localStorage.setItem("pageDataSession", JSON.stringify(newsessionData))
            }
        } else {
            let newsessionData = [formData]

            localStorage.setItem("pageDataSession", JSON.stringify(newsessionData))
        }

        Toasts.sucess("Data Added Succefully")
        setTimeout(() => {
            navigate("/all-page")

        }, 2500);
    }
    const namechangemetaupdate = (e) => {
        const metaValue = e.target.value.trim().toLowerCase().replace(/\s+/g, "-");
        setmetaData(metaValue)
        setfromData({
            ...formData, "page_meta_title": e.target.value, "page_meta_keyword": e.target.value
        })

    }
    // handle file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // create preview URL
            setfromData({
                ...formData, "page_header_image": e.target.value
            })
        }
    };
    return <>

        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-sm-0">Add Pages</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                        <li className="breadcrumb-item active">Add Pages</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <form method="POST" encType="multipart/form-data"
                        onSubmit={formSubmit}>
                        <input type="hidden" name="page_id"
                        />
                        <div className="card bg-secondary rounded p-2">
                            <div className="card-header">
                                <div className="row align-items-center gy-3">
                                    <div className="col-sm">
                                        <h5 className="card-title my-1">Add Page</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body justify-content-sm-center">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">Page Name: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text"
                                                className="form-control require"
                                                placeholder="Site Title" id="page_name_id"
                                                value={formData.page_name}
                                                onBlur={namechangemetaupdate}
                                                onChange={handleChange}
                                                name="page_name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">Page Url: <span style={{ color: "red" }}>*</span></label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text page_urls"
                                                    id="basic-addon3">http://paradise.com</span>
                                                <input type="text"
                                                    className="form-control required " value={formData.page_url}
                                                    onChange={handleChange}
                                                    id="page_url_id" aria-describedby="basic-addon3" name="page_url"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">Page Content</label>
                                            <textarea type="email" value={formData.page_content} className="form-control ckeditor bg-dark" placeholder="Page Content" name="page_content" onChange={handleChange}>

                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <div className="fileimg d-flex">
                                                <img className="fileimg-preview logoimage mediaImage mt-2"
                                                    src={preview}
                                                    style={{ width: "80px", height: "80px", marginRight: "10px", borderRadius: "5px" }} />
                                                <div style={{ width: "100%" }}>
                                                    <label className="form-label">Page Header Image:<span
                                                        style={{ color: "red" }}>*</span></label>
                                                    <div className="input-group">
                                                        <input type="file" className="form-control " id="imageFile" value={formData.page_header_image}
                                                            name="page_header_image" accept="image/png, image/gif, image/jpeg"
                                                            onChange={handleImageChange} />

                                                    </div>
                                                    <small className="text-muted" style={{ fontSize: "11px" }}>Accepted: gif, png, jpg.
                                                        Max file size 2Mb</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card bg-secondary rounded p-2">
                            <div className="card-header">
                                <div className="row align-items-center gy-3">
                                    <div className="col-sm">
                                        <h5 className="card-title my-1">SEO - Meta Tags</h5>
                                        <p>Define page meta title, meta keywords and meta description to list your page in
                                            search engines

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body justify-content-sm-center">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Page Meta Title: <span style={{ color: "red" }}>*</span></label>
                                        <input type="te consxt" value={formData.page_meta_title}
                                            className="form-control required "
                                            placeholder="Page Meta Title" id="page_meta_title_id" name="page_meta_title" onChange={handleChange}
                                        />

                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Page Meta Keyword: </label>
                                        <input type="text" className="form-control" placeholder="Page Meta Keyword"
                                            name="page_meta_keyword" onChange={handleChange} id="page_meta_keyword_id" value={metaData}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Page Meta Description:</label>
                                        <input type="text" className="form-control" placeholder="Page Meta Desc" value={formData.page_meta_description}
                                            onChange={handleChange}
                                            name="page_meta_description" id="page_meta_description_id" />
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer  d-flex justify-content-between">
                                <button type="submit" id='button' className="btn btn-success"
                                >Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

}

export default AddPage