import { toast } from "react-toastify";

export class Toasts {
    static sucess(msg) {
        toast.success(msg, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            icon: "✅"
        });
    }
}