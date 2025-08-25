const Login = () => {
    return <>
        <form className="needs-validation" method="post" id="loginformSubmit">
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
                                <input type="email" name="admin_email" className="form-control required" id="useremail" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>

                            </div>
                            <div className="form-floating mb-3 ">
                                <input type="password" className="form-control pe-5 password required " name="admin_password" id="password-input" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>

                            </div>


                            <button type="submit" className="btn btn-success py-3 w-100 mb-4" >Sign In</button>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}
export default Login