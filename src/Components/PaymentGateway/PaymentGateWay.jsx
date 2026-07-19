import { useEffect, useRef, useState } from "react"
import ApiService from "../../Utils/ApiService"
import { Toasts } from "../../Utils/Toasts"
import { NavLink } from "react-router-dom"
import Constant from "../../Utils/Constant"

const PaymentGateWay = () => {

    const [formData, setformData] = useState({
        amount: "",
    })
    const [razorpay_order_id, set_razorpay_order_id] = useState("")

    const verifyPayment = (paymentData) => {
        try {
            // console.log(razorpay_order_id)
            // return false
            var datastring = {
                razorpayOrderId: paymentData.razorpay_order_id,
                razorpayPaymentId: paymentData.razorpay_payment_id,
                razorpaySignature: paymentData.razorpay_signature,
                orderId: razorpay_order_id
            }
            ApiService.postData("/payment/verify-order", datastring).then((res) => {
                if (res?.status === 200) {
                            console.log(res?.msg)
                        } else {
                            console.log(res?.msg)
                        }

            })
        } catch (error) {
            toast.error('Payment verification failed');

        }
    };


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
            ApiService.postData("payment/create-order", formData).then((res) => {
                if (res?.status === 200) {
                    Toasts.sucess(res?.msg)
                    set_razorpay_order_id(res?.data?.id)
                    const options = {
                        "key": Constant.RAZORPAY_SECRETE_KEY,
                        "amount": res?.data?.amount,
                        "currency": res?.data?.currency,
                        "name": "Nitesh Yadav",
                        "description": "Payment for your product",
                        "order_id": res?.data?.id,
                        handler: function (response) {
                            verifyPayment(response);
                        },
                        ondismiss: function () {
                            console.log("User closed checkout");
                        },
                        "prefill": {
                            "name": "User Name",
                            "email": "user@example.com",
                        }
                    }
                    // return false
                    const rzp1 = new Razorpay(options);

                    rzp1.on('payment.error', function (response) {
                        console.log(response);
                        paymentFailed(response)
                        if (res?.status === 200) {
                            Toasts.sucess(res?.msg)
                        } else {
                            Toasts.error(res?.msg)
                        }
                    });

                    rzp1.open();
                } else {
                    Toasts.error(res?.msg)
                }
            })
        }

    }
    const paymentFailed = (res) => {
        console.log(res.error.code);
        try {

            var dataString = {
                orderId: res.error.metadata.order_id,
                razorpayPaymentId: res.error.metadata.payment_id
            }

            ApiService.postData("payment/failed", dataString).then((res) => {
                console.log(res);

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
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Enter Amount: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text"
                                            className="form-control required"
                                            placeholder="Enter Value"
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