import axios from "axios";

const apiConfig = {
  projectId: process.env.REACT_APP_PROJECT_ID,
  publishedName: process.env.REACT_APP_PUBLISHED_NAME,
  predictionKey: process.env.REACT_APP_PREDICTION_KEY || ''
}

const api = axios.create({
  baseURL: `https://southcentralus.api.cognitive.microsoft.com/customvision/v3.1/prediction/${apiConfig.projectId}/classify/iterations/${apiConfig.publishedName}`,
  });

export {api, apiConfig};