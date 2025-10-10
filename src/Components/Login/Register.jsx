import { useEffect, useRef, useState } from "react";
import { Toasts } from "../../Utils/Toasts";
import ApiService from "../../Utils/ApiService";
import { NavLink } from "react-router-dom";

const Register = () => {

    const [formData, setformData] = useState({
        "id": 0,
        "username": "",
        "password": "",
        "email": "",
        "roleId": 0,
        "mobile": "",
    })

    const didMountRef = useRef(true)

    const changeValue = (e) => {

        setformData({ ...formData, [e.target.name]: e.target.value })
    }
    const formLogin = (e) => {
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
            const validateEmail = (email) => {
                const trimmedEmail = email.trim();
                const re = /\S+@\S+\.\S+/;
                return re.test(email);
            };

            if (!validateEmail(formData.email)) {
                Toasts.error('Email is Invalid')
                return false
            }
            ApiService.postData("register", formData).then((res) => {
                if (res?.status === 200) {
                    Toasts.sucess(res?.msg)
                    window.location.href("/login")
                } else {
                    Toasts.error(res?.msg)
                }
            })
        }
    }


    return <>
        <div className="needs-validation">
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <img className="rounded-circle" src="/public/assets/img/paradise.png" alt=""
                                    style={{ width: "75px", height: "75px" }} />
                                <h3>Paradise</h3>
                            </div>
                            <div className=" mb-3">
                                <label className="form-label">User Name: <span style={{ color: "red" }}>*</span></label>
                                <input type="text"
                                    className="form-control required"
                                    placeholder="User Name"
                                    name="username" onChange={changeValue} value={formData.username} />
                            </div>
                            <div className=" mb-3 ">
                                <label className="form-label">User Password: <span style={{ color: "red" }}>*</span></label>
                                <input type="password"
                                    className="form-control required"
                                    placeholder="*****"
                                    name="password" onChange={changeValue} value={formData.password} />
                            </div>
                            <div className=" mb-3 ">
                                <label className="form-label">User Email: <span style={{ color: "red" }}>*</span></label>
                                <input type="text"
                                    className="form-control required"
                                    placeholder="Email"
                                    name="email" onChange={changeValue} value={formData.email} />
                            </div>
                            <div className=" mb-3 ">
                               <label className="form-label">User Mobile: <span style={{ color: "red" }}>*</span></label>
                            <input type="text"
                                className="form-control"
                                placeholder="Mobile"
                                name="mobile" onChange={changeValue} value={formData.mobile} />
                            </div>
                            <button type="submit" className="btn btn-success py-3 w-100 mb-4" onClick={formLogin}>Sign Up</button>
                            <NavLink to="/login">Sign In</NavLink>

                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    </>
}
export default Register