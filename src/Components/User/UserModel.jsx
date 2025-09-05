import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const UserModel = ({ modelToggle, hideloginmodal }) => {

    const formChange=()=>{
        
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
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Name: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Site Title"
                                            name="user_name" onChange={formChange}/>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Password: <span style={{ color: "red" }}>*</span></label>
                                        <input type="password"
                                            className="form-control required"
                                            placeholder="Site Title"
                                            name="user_password" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Email: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Site Title"
                                            name="user_email" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">User Address:</label>
                                        <textarea type="text"
                                            className="form-control"
                                            placeholder="Site Title"
                                            name="user_address" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hideloginmodal}>
                            Close
                        </Button>
                        <Button variant="primary">
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default UserModel