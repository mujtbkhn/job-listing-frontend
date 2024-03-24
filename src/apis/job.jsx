import axios from "axios";
const backend_url = "http://localhost:3000/api/v1";

export const createJobPost = async (JobPostPayload) => {
  try {
    const reqUrl = `${backend_url}/job/create`;
    const response = axios.post(reqUrl, JobPostPayload);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
