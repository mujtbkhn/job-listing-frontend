import axios from "axios";
const backend_url = "https://job-listing-backend-cpk7.onrender.com";
export const registerUser = async ({ name, email, password, mobile }) => {
  try {
    const url = `${backend_url}/auth/register`;
    const response = await axios.post(url, {
      name,
      email,
      password,
      mobile,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const url = `${backend_url}/auth/login`;
    const response = await axios.post(url, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
