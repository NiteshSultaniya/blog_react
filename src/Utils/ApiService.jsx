import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Toasts } from "./Toasts";

// const location=useLocation()

const client = axios.create({
    baseURL: "http://localhost:9090/api/",
});

client.interceptors.request.use(
    (config) => {
        return config;
    },
);

client.interceptors.response.use(
    (response) => {
        return response;
    },
);

function getAuthToken() {
    let tokenn = localStorage.getItem("TOKEN");
    let token = JSON.parse(tokenn);
    let config = "";
    if (token == null || token == undefined || token == "") {
        config = {
            headers: { "Authorization": `Bearer ` }
        }
    }
    else {
        let headers = {};
        headers["Authorization"] = `Bearer ${token}`;
        config = { headers };
    }
    return config;
}

export default class ApiService {
    static async fetchData(url) {
        try {
            const response = await client.get(url, getAuthToken());
            return response.data;
        }
        catch (e) {
            Toasts.error("Network Error")
            return e.response.data
        }
    }

    static async postData(url, data, isFileUpload = false) {
        try {
            const response = await client.post(url, data, getAuthToken(isFileUpload));
            return response.data;
        }
        catch (e) {
            Toasts.error("Network Error")
            return e.response.data
            // console.log(e.response.data)
        }
    }
    static async postFile(url, data) {
        try {
            let tokenn = localStorage.getItem("TOKEN");
            let token = JSON.parse(tokenn);
            const response = await client.post(url, data, {
                headers: {
                    "Authorization": token ? `Bearer ${token}` : `Bearer `,
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        }
        catch (e) {
            Toasts.error("Network Error")
            return e.response.data
        }
    }

}