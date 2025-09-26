import axios from "axios";
import constant from "./constant";
const token = localStorage.getItem('Rikosta')

const Axios = axios.create({
  baseURL: constant.BackendUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Authorization": token
  },
});

export default Axios;
