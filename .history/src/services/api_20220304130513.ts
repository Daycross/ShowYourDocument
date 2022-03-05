import axios from "axios";

const apiConfig = {
  projectId: process.env.PROJECT_ID,
  publishedName: process.env.PUBLISHED_NAME,
  predictionKey: process.env.PREDICTION_KEY || ''
}

const api = axios.create({
  baseURL: `https://southcentralus.api.cognitive.microsoft.com/customvision/v3.1/prediction/${apiConfig.projectId}/classify/iterations/${apiConfig.publishedName}`,
  });

export {api, apiConfig};