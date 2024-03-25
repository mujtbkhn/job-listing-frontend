import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../apis/job";
import { DEFAULT_SKILLS } from "../../utils/constants";
const Home = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");

  const logout = () => {
    localStorage.clear()
    navigate("/login");
  };
  const fetchAllJobs = async () => {
    const filterSkills = skills?.join(",")
    const result = await getAllJobs({title, skills: filterSkills});
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
        {!!token ? <button onClick={logout}>Logout</button> : ""}
        <div>
          <input
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            value={title}
            name="search"
            placeholder="Type any job title"
          />
        </div>
        <div>
          {/*   */}
          <select onChange={handleSkill} name="remote">
            <option value="">Skills</option>
            {DEFAULT_SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {skills?.map((skill) => {
            return (
              <span key={skill}>
                {skill}
                {/*  */}
                <span onClick={() => removeSkill(skill)}>X</span>
              </span>
            );
          })}
          <button
            onClick={() => {
              setSkills([]);
              setTitle("");
            }}
          >
            Clear
          </button>
          <button onClick={fetchAllJobs}>Apply Filter</button>
          <button onClick={() => navigate("/job-post")}>Add Job</button>
        </div>
      </div>
      {/* <div > */}
      {jobs?.map((data) => {
        return (
          <div key={data._id}>
            <div>
              <div>
                <img src={data.logoURL} />
              </div>
              <div>
                <p>{data.position}</p>
                <p>
                  <span>11-50</span>
                  <span>{data.salary}</span>
                  <span>{data.location}</span>
                </p>
                <p>
                  <span>{data.locationType}</span>
                  <span>{data.jobType}</span>
                  <button onClick={() => navigate(`/job-details/${data._id}`)}>
                    View Details
                  </button>
                </p>
              </div>
            </div>
            <div>
              <div>
                {data?.skills?.map((skill) => {
                  return <span key={skill}>{skill}</span>;
                })}
              </div>
              <div>
                <button
                  onClick={() =>
                    navigate("/addJob", {
                      state: { id: data._id, edit: true },
                    })
                  }
                >
                  Edit job
                </button>
                <button onClick={() => navigate(`/job-details/${data._id}`)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {/* </div> */}
    </>
  );
};

export default Home;
