import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobPostById } from "../../apis/job";
import "./JobDetails.css";
import { USER_AVATAR } from "../../utils/constants";

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    fetchJobDetails();
  }, []);
  const navigate = useNavigate();

  const fetchJobDetails = async () => {
    if (!id) return;
    const result = await getJobPostById(id);
    // console.log(result.data._doc)
    // console.log(result.jobDetails);
    setJobDetails(result?.jobDetails);
    setIsEditable(result?.isEditable);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 50px",
            backgroundColor: "#ed5353",
            color: "white",
          }}
        >
          <button onClick={() => navigate("/")}>
            <h1>JobFinder</h1>
          </button>
          <div className="btn">
          <button onClick={logout}>Logout</button>
          <img className="user_image" src={USER_AVATAR}/> 
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 50px",
            backgroundColor: "#ed5353",
            color: "white",
          }}
        >
          <button onClick={() => navigate("/")}>
            <h1>JobFinder</h1>
          </button>{" "}
          <button onClick={() => navigate("/login")}>Login</button>
          <button>Register</button>
        </div>
      )}

      <div className="details__main">
        {jobDetails && (
          <>
            <div className="companyName">
              <h1>{jobDetails.companyName}</h1>
            </div>
            <div className="main">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>{jobDetails.title}</h1>
                {isLoggedIn && isEditable && (
                  <button
                    onClick={() => {
                      navigate("/job-post", {
                        state: {
                          jobDetails: jobDetails,
                          edit: true,
                        },
                      });
                    }}
                  >
                    Edit Job
                  </button>
                )}
              </div>
              <h3 style={{ color: "#ed5353" }}>{jobDetails.location}</h3>
              <div className="salary">
                <div className="">
                  <p>Duration</p>
                  <p>{jobDetails.duration}</p>
                </div>
                <div className="">
                  <p>Salary</p>
                  <p>{jobDetails.salary}</p>
                </div>
              </div>

              <div>
                <h2>About the company</h2>
                <p>{jobDetails.about}</p>
              </div>

              <div>
                <h2>Description</h2>
                <p>{jobDetails.description}</p>
              </div>
              <div>
                <h2>Skill(s) required</h2>
                <div className="skills-container">
                  {jobDetails?.skills?.map((skill, index) => (
                    <div key={index} className="skill">
                      <p>{skill}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h2>Information</h2>
              <p>{jobDetails?.information}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
