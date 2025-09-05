import { useState } from "react";
import { Toasts } from "../../Utils/Toasts";
import ApiService from "../../Utils/ApiService";

const Login = () => {
    const [formdata, setformdata] = useState({
        "username": "",
        "password": ""
    })
    const changeValue = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
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
            console.log(formdata);

            ApiService.postData("login", formdata).then((res) => {
                if (res.status === 'Success') {
                    // console.log(res.token)
                    Toasts.sucess("Admin Login Successfully")
                    localStorage.setItem("TOKEN", `"${res?.token}"`)
                    window.location.reload()

                } else {
                    Toasts.error("Enter Valid Login Detail")
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
                            <div className="form-floating mb-3">
                                <input type="email" name="username" className="form-control required" id="useremail" placeholder="name@example.com" onChange={changeValue} value={formdata.username} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3 ">
                                <input type="password" className="form-control pe-5 password required " name="password" id="password-input" onChange={changeValue} placeholder="Password" value={formdata.password} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button type="submit" className="btn btn-success py-3 w-100 mb-4" onClick={formLogin}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Login