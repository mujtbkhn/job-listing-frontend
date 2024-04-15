import axios from "axios";
const backend_url = "https://job-listing-backend-82pe.onrender.com";

export const createJobPost = async (JobPostPayload) => {
  try {
    const reqUrl = `${backend_url}/job/create`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, JobPostPayload);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getJobPostById = async (JobPostId) => {
  try {
    const reqUrl = `${backend_url}/job/job-details/${JobPostId}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateJobPostById = async (JobPostId, updateFormData) => {
  try {
    const reqUrl = `${backend_url}/job/update/${JobPostId}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, updateFormData);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (filter) => {
  try {
    const reqUrl = `${backend_url}/job/all?title=${
      filter?.title || ""
    }&skills=${filter?.skills || ""}`;
    // debugger
    const response = await axios.get(reqUrl);
    // console.log(response?.data);
    return response.data
  } catch (error) {
    console.log(error);
  }
};
