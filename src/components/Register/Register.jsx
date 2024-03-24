import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/auth";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [isFormChecked, setIsFormChecked] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.mobile
    ) {
      setIsError({ error: "Please fill out all the fields" });
      return;
    }
    if (!isFormChecked) {
      setIsError({ error: "please agree to the terms and conditions" });
      return;
    }

    await registerUser(formData);
    navigate("/");
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <>
      <div className="register__main">
        <div className="register__left">
          <h1>Create an account</h1>
          <p>Your personal Job Finder</p>
          <div className="input">
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={handleOnChange}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleOnChange}
            />
            <input
              type="number"
              name="mobile"
              placeholder="mobile"
              onChange={handleOnChange}
            />
          </div>
          <div className="tandc">
            <input
              type="checkbox"
              name="checkbox"
              onChange={(event) => setIsFormChecked(event.target.checked)}
            />
            <p>
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
          </div>
          <button onClick={handleSubmit}>Create Account</button>
          {isError ? (
            <p style={{ color: "black" }}>
              some error occurred: {isError.error}
            </p>
          ) : (
            ""
          )}
          <div className="sign__in">
            <h3>Already have an account?</h3>
            <span onClick={() => navigate("/login")}>
              Sign In
            </span>
          </div>
        </div>
        <div className="register__right">
          <h1>Right</h1>
        </div>
      </div>
    </>
  );
};

export default Register;
