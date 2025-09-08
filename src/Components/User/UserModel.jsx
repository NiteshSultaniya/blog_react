import { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ApiService from '../../Utils/ApiService';
import { Toasts } from '../../Utils/Toasts';


const UserModel = ({ modelToggle, hideloginmodal, editmodelToggle }) => {


    const [formData, setformData] = useState({
        "id": 0,
        "user_name": "",
        "user_password": "",
        "user_email": "",
        "user_address": "",

    })

    const didMountRef = useRef(true)
    useEffect(() => {
        if (didMountRef.current) {
            if (editmodelToggle !== "") {
                console.log(editmodelToggle);
                setformData(editmodelToggle)
            }
        }
        didMountRef.current = false
    }, [])


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

            if (!validateEmail(formData.user_email)) {
                Toasts.error('Email is Invalid')
                return false
            }
            // console.log(formData);
            ApiService.postData("add-user-process", formData).then((res) => {
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
                                            name="user_name" onChange={changeValue} value={formData.user_name} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Password: <span style={{ color: "red" }}>*</span></label>
                                        <input type="password"
                                            className={`form-control ${formData.id > 0 ? "" : "required"}`}
                                            placeholder={`${formData.id > 0 ? "********" : "Password"}`}
                                            name="user_password" onChange={changeValue} value={formData.user_password} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Email: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Email"
                                            name="user_email" onChange={changeValue} value={formData.user_email} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Address:</label>
                                        <textarea type="text"
                                            className="form-control"
                                            placeholder="Address"
                                            name="user_address" onChange={changeValue} value={formData.user_address} />
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