import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Toasts } from "../../Utils/Toasts"
import { NavLink, useNavigate } from "react-router-dom"
import Constant from "../../Utils/Constant"

const PaymentGateWay = () => {

    const [formData, setformData] = useState({
        name:"",
        email:"",
        contact:"",
        amount: "",
    })
    
    const navigate = useNavigate();


    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };


    


    const submitForm =() => {
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
            ApiService.postData("payment/create-order", formData).then(async(res) => {
                if (res?.status == 200) {
                    const loaded = await loadRazorpay();
                    const options = {
                        "key": Constant.RAZORPAY_SECRETE_KEY,
                        "amount": res?.data?.amount,
                        "currency": res?.data?.currency,
                        "name": formData.name,
                        "description": "Payment for your product",
                        "order_id": res?.data?.id,
                        handler: function (response) {
                            verifyPayment(response);
                        },
                        
                        "prefill": {
                            "name": formData.name,
                            "email": formData.email,
                            "contact":formData.contact
                        },
                    }
                    // return false
                    const rzp1 = new window.Razorpay(options);

                    rzp1.on('payment.error', function (response) {
                        paymentFailed(response)

                    });

                    rzp1.open();
                } else {
                    Toasts.error(res?.msg)
                }
            })
        }

    }
    const verifyPayment = (paymentData) => {
        try {
            // console.log(paymentData)
            // return false
            var datastring = {
                razorpayOrderId: paymentData.razorpay_order_id,
                razorpayPaymentId: paymentData.razorpay_payment_id,
                razorpaySignature: paymentData.razorpay_signature,
            }
            ApiService.postData("/payment/verify-order", datastring).then((res) => {
                if (res?.status === 200) {
                    Toasts.sucess(res?.msg)
                    // navigate("/order")
                    return false
                    window.location.href="/admin/order"
                } else {
                    Toasts.error(res?.msg)
                }

            })
        } catch (error) {
            toast.error('Payment verification failed');

        }
    };
    const paymentFailed = (res) => {
        console.log(res.error.code);
        try {

            var dataString = {
                orderId: res.error.metadata.order_id,
                razorpayPaymentId: res.error.metadata.payment_id
            }

            ApiService.postData("payment/failed", dataString).then((res) => {
                if (res?.status === 200) {
                    Toasts.sucess(res?.msg)
                    // navigate("/order")
                    window.location.href="/admin/order"

                } else {
                    Toasts.error(res?.msg)
                }

            })
        } catch (error) {
            toast.error('Payment verification failed');

        }
    }
    const changeValue = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }
    return <>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-sm-0">Manage Pament</h4>
                            <div className="user-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a href="javascript: void(0);">Pament</a></li>
                                    <li className="breadcrumb-item active">Manage Pament</li>
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
                                    <h5 className="card-title my-1">Make Payment</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-body justify-content-sm-center">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Name: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Enter Name"
                                            name="name" onChange={changeValue} value={formData.name} />
                                    </div>
                                </div>
<div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Email: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Enter Email"
                                            name="email" onChange={changeValue} value={formData.email} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Mobile: <span style={{ color: "red" }}>*</span></label>
                                        <input type="number"
                                            className="form-control required"
                                            placeholder="Enter Mobile"
                                            name="contact" onChange={changeValue} value={formData.contact} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Enter Amount: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Enter Amount"
                                            name="amount" onChange={changeValue} value={formData.amount} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer  d-flex justify-content-between">
                            <button type="button" onClick={submitForm} className="btn btn-success">Make Payment</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>


    </>


}

export default PaymentGateWay