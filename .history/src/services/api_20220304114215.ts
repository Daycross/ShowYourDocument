import axios from "axios";

const api = axios.create({
  baseURL: 'https://southcentralus.api.cognitive.microsoft.com/',
  headers : {
    'Content-Type' : 'multipart/form-data'
}});

export default api;