import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
    // console.log(token)
    let Authtoken = "";
    if (token !== null || token !== undefined || token !== "") {
        Authtoken = token;
    }
    let config = {
        headers: { "Authorization": `Bearer ${Authtoken}` }
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
            return e.response.data
        }
    }
    
    static async postData(url, data) {
        try {
            const response = await client.post(url, data, getAuthToken());
            return response.data;
        }
        catch (e) {
            return e.response.data
            // console.log(e.response.data)
        }
    }

}