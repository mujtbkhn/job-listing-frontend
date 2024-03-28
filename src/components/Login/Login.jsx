import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import image from "../../assets/images/login-image.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setIsError({ error: "Please fill out all the fields" });
      return;
    }

    try {
      const result = await loginUser(formData);
      if (result?.data && result?.data?.token) {
        navigate("/");
      } else {
        setIsError({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.log(error);
      setIsError({ error: "an error occurred while logging in " });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <>
      <div className="login__main">
        <div className="login__left">
          <h1>Already have an account?</h1>
          <p>Your personal Job Finder</p>
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
            />
          </div>

          <button onClick={handleSubmit}>Sign In</button>
          {isError ? (
            <p style={{ color: "black" }}>
              some error occurred: {isError.error}
            </p>
          ) : (
            ""
          )}
          <div className="sign__in">
            <h3>Don't have an account?</h3>
            <span onClick={() => navigate("/register")}>Sign Up</span>
          </div>
        </div>
        <div className="login__right">
          <img src={image} alt="main image" />
        </div>
      </div>
    </>
  );
};

export default Login;
