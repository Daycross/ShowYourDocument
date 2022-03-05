import axios from "axios";

const apiConfig = {
  projectId: process.env.PROJECT_ID,
  publishedName: process.env.PUBLISHED_NAME,
  predictionKey: process.env.PREDICTION_KEY || ''
}

const api = axios.create({
  baseURL: `https://southcentralus.api.cognitive.microsoft.com/customvision/v3.1/prediction/c1532ae6-4dd9-46ef-baf6-c03863964c6c/classify/iterations/Iteration12`,
  });

export {api, apiConfig};