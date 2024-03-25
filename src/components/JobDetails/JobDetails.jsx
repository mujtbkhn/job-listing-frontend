import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobPostById } from "../../apis/job";

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
      {id}
      {isLoggedIn ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button>Register</button>
        </>
      )}

      {jobDetails && (
        <>
          <h1>{jobDetails.companyName}</h1>
          <div style={{ display: "flex" }}>
            <h2>{jobDetails.title}</h2>
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
          <h2>{jobDetails.location}</h2>
          <h2>{jobDetails.duration}</h2>
          <h2>{jobDetails.salary}</h2>
          <h2>{jobDetails.about}</h2>
          <h2>{jobDetails.skills}</h2>
          <h2>{jobDetails?.information}</h2>
        </>
      )}
    </div>
  );
};

export default JobDetails;
