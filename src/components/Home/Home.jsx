import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../apis/job";
import { DEFAULT_SKILLS, USER_AVATAR } from "../../utils/constants";
const Home = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const login = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };
  const fetchAllJobs = async () => {
    const filterSkills = skills?.join(",");
    const result = await getAllJobs({ title, skills: filterSkills });
    console.log(result?.data);
    setJobs(result?.data);
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleSkill = (event) => {
    const newArr = skills.filter((element) => element === event.target.value);
    if (!newArr.length) {
      setSkills([...skills, event.target.value]);
    }
  };

  const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newArr]);
  };
  return (
    <>
      <div>
        <div className="navbar">
          <button onClick={() => navigate("/")}>
            <h1>JobFinder</h1>
          </button>{" "}
          <div className="navbar__right">
            {!!token ? (
              <>
                <button onClick={logout}>Logout</button>
                <h2>Hello!Recruiter</h2>
                <img className="user_image" src={USER_AVATAR}/>
              </>
            ) : (
              <>
                <button onClick={login}>Login</button>
                <button onClick={register}>Register</button>{" "}
              </>
            )}
          </div>
        </div>
        <div className="search__job">
          <div className="input">
            <input
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              value={title}
              name="search"
              placeholder="Type any job title"
            />
          </div>
          <div className="skills">
            {/*   */}
            <select onChange={handleSkill}>
              <option value="">Skills</option>
              {DEFAULT_SKILLS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            {skills?.map((skill) => {
              return (
                <span style={{ display: "flex" }} key={skill}>
                  {skill}
                  {/*  */}
                  <div onClick={() => removeSkill(skill)}>X</div>
                </span>
              );
            })}
            <button onClick={() => navigate("/job-post")}>+Add Job</button>
          </div>
          <div className="clear__button">
            <button
              onClick={() => {
                setSkills([]);
                setTitle("");
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="apply_filter">
          <button onClick={fetchAllJobs}>Apply Filter</button>
        </div>
      </div>
      <div>
        {jobs?.map((data) => {
          return (
            <div className="jobs" key={data._id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div>
                    <img src={data.logoURL} />
                    <h1>{data.title}</h1>
                    <p style={{ display: "flex", gap: "10px" }}>
                      {/* <span>11-50</span> */}
                      <span>{data.salary}</span>
                      <span>{data.location}</span>
                    </p>
                    <p>
                      <span>{data.locationType}</span>
                      <span>{data.jobType}</span>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {data?.skills?.map((skill) => {
                      return (
                        <span className="skill" key={skill}>
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="edit__job"
                      onClick={() =>
                        navigate("/job-post", {
                          state: { id: data._id, edit: true },
                        })
                      }
                    >
                      Edit job
                    </button>
                    <button
                      className="view__details"
                      onClick={() => navigate(`/job-details/${data._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
