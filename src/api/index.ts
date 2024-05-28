import axios from "axios";
import { API_BASE_URL } from "../constants";

interface Parameters {
  [key: string]: any;
}

export async function fetchModels() {
  const response = await axios.get(`${API_BASE_URL}/fetch_models`);
  return response.data;
}

export async function makePrediction(
  prompt: string,
  parameters: Parameters,
  selectedModel: string,
  region: string
) {
  const response = await axios.post(`${API_BASE_URL}/predict`, {
    prompt,
    parameters,
    endpoint_name: selectedModel,
    region,
  });
  return response;
}

export async function logFeedback(
  prompt: string | undefined,
  generatedAnswer: string,
  feedback: string
) {
  axios.post(`${API_BASE_URL}/logger`, {
    prompt: prompt,
    response: generatedAnswer,
    feedback: feedback,
  });
}
