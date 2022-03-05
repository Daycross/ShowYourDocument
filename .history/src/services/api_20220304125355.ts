import axios from "axios";

const apiConfig = {
  projectId: process.env.PROJECT_ID,
  publishedName: process.env.PUBLISHED_NAME
}

const api = axios.create({
  baseURL: `https://southcentralus.api.cognitive.microsoft.com/customvision/v3.1/prediction/${apiConfig.projectId}/classify/iterations/${apiConfig.publishedName}/image?application=teste`,
  });

export default api;