import { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ApiService from '../../Utils/ApiService';
import { Toasts } from '../../Utils/Toasts';


const UserModel = ({ modelToggle, hideloginmodal, editmodelToggle ,roleData}) => {
    const [passwordCondition, setpasswordCondition] = useState(true)


    const [formData, setformData] = useState({
        "id": 0,
        "username": "",
        "password": "",
        "email": "",
        "roleId": "",
        "mobile": "",

    })

    const didMountRef = useRef(true)
    useEffect(() => {
        if (didMountRef.current) {
            if (editmodelToggle !== "") {
                setformData({ ...editmodelToggle, password: "" })
            }
        }
        didMountRef.current = false
    }, [])


    const changeValue = (e) => {

        if (e.target.name === "password") {
            setpasswordCondition(false)
        }
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
            // console.log(formData);
            // return false
            ApiService.postData("create-user", formData).then((res) => {
                if (res?.status === 200) {
                    Toasts.sucess(res?.msg)
                    setTimeout(() => {
                        // window.location.reload()
                    }, 2000);
                } else {
                    Toasts.error(res?.msg)
                }
            })

        }
    }

    return (
        <>
            <div style={{ backgroundColor: "#000" }}>
                <Modal show={modelToggle}>
                    <Modal.Header>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <input type="hidden" name="id"
                                value={formData.id} />
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Name: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="User Name"
                                            name="username" onChange={changeValue} value={formData.username} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Password: <span style={{ color: "red" }}>*</span></label>
                                        {passwordCondition && formData.id !== 0 ?
                                            <> <input type="password"
                                                className={`form-control ${formData.id > 0 ? "" : "required"}`}
                                                placeholder="*****"
                                                name="password" onChange={changeValue} value={""} /></>
                                            : <>
                                                <input type="password"
                                                    className={`form-control ${formData.id > 0 ? "" : "required"}`}
                                                    placeholder={`${formData.id > 0 ? "********" : "Password"}`}
                                                    name="password" onChange={changeValue} value={formData.password} />
                                            </>}

                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Email: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Email"
                                            name="email" onChange={changeValue} value={formData.email} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Mobile: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Mobile"
                                            name="mobile" onChange={changeValue} value={formData.mobile} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Role: <span style={{ color: "red" }}>*</span></label>
                                        <select className="form-control required" onChange={changeValue} value={formData.roleId} name="roleId" placeholder="Select Role">
                                            <option value="">Select Role</option>
                                            {roleData && roleData.length > 0 ?
                                                roleData.map((data) =><option key={data.id} value={data?.id}>{data?.roleName}</option>
                                                )
                                                : <>
                                                </>}

                                        </select>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hideloginmodal}>
                            Close
                        </Button>
                        <button className='btn btn-primary' onClick={formLogin}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default UserModel