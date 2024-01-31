import axios from "axios";

const instance = axios.create({
  baseURL: "https://time-sheet-server.onrender.com/api/v1",
  // baseURL: "http://localhost:2000/api/v1",
  // withCredentials: true,
});

export default instance;
