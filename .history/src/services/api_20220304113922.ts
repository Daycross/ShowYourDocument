import axios from "axios";

const api = axios.create({
  baseURL: 'https://southcentralus.api.cognitive.microsoft.com/',
});

export default api;