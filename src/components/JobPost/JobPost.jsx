import React, { useState } from "react";
import "./JobPost.css";
import { DEFAULT_SKILLS } from "../../utils/constants";
import { createJobPost, updateJobPostById } from "../../apis/job";
import { useLocation } from "react-router-dom";
import image from "../../assets/images/job-post.png"

const JobPost = () => {
  const { state } = useLocation();
  // console.log(state)
  const [stateData] = useState(state?.jobDetails);
  const [formData, setFormData] = useState({
    companyName: "" || stateData?.companyName,
    logoUrl: "" || stateData?.logoUrl,
    title: "" || stateData?.title,
    salary: "" || stateData?.salary,
    jobType: "" || stateData?.jobType,
    locationType: "" || stateData?.locationType,
    location: "" || stateData?.location,
    duration: "" || stateData?.duration,
    description: "" || stateData?.description,
    about: "" || stateData?.about,
    skills: [] || stateData?.skills,
    information: "" || stateData?.information,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const addSkills = (event) => {
    const skill = event.target.value;
    const actualSkillSet = formData.skills;
    const filteredSkills = actualSkillSet.filter((ele) => {
      ele === skill;
    });
    if (!filteredSkills.length) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skill) => {
    const filteredSkills = formData.skills.filter((ele) => ele !== skill);
    setFormData({ ...formData, skills: filteredSkills });
  };

  const handleSubmit = async () => {
    if (
      !formData.companyName ||
      !formData.logoUrl ||
      !formData.title ||
      !formData.salary ||
      !formData.jobType ||
      !formData.locationType ||
      !formData.location ||
      !formData.description ||
      !formData.about ||
      !formData.skills
    ) {
      console.log("error occurred ");
      return;
    }
    console.log("success");
    if (state?.edit) {
      await updateJobPostById(stateData?._id, formData);
      return;
    }
    await createJobPost(formData);
  };
  return (
    <>
      {/* <div>JobPost</div> */}
      <div className="job_post_main">
        <div className="job__post__left">
          <h1>Add job description</h1>
          <div className="group">
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="group">
            <label htmlFor="logoUrl">Add Logo URL</label>
            <input
              type="text"
              name="logoUrl" // Corrected name attribute
              onChange={handleChange}
              value={formData.logoUrl}
            />
          </div>
          <div className="group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div className="group">
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter job duration"
            />
          </div>
          <div className="group">
            <label htmlFor="salary">Monthly Salary</label>
            <input
              type="text"
              name="salary"
              onChange={handleChange}
              value={formData.salary}
            />
          </div>
          <div className="group">
            <label htmlFor="jobType">Job Type</label>
            <select
              name="jobType"
              onChange={handleChange}
              value={formData.jobType}
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="locationType">Location Type</label>
            <select
              name="locationType"
              onChange={handleChange}
              value={formData.locationType}
            >
              <option value="remote">Remote</option>
              <option value="office">Office</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={formData.location}
            />
          </div>
          <div className="group">
            <label htmlFor="description">Job Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="add your description"
              value={formData.description}
            ></textarea>
          </div>
          <div className="group">
            <label htmlFor="about">About the company</label>
            <textarea
              name="about"
              onChange={handleChange}
              placeholder="about the company"
              value={formData.about}
            ></textarea>
          </div>
          <div className="group">
            <label htmlFor="skills">Skills</label>
            <div>
              <select
                className="skills"
                name="skills"
                type="text"
                onChange={addSkills}
              >
                <option disabled selected>
                  Please select skills{" "}
                </option>
                {DEFAULT_SKILLS.map((element) => (
                  <option>{element}</option>
                ))}
              </select>

              {formData?.skills?.map((ele) => (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  {ele}&nbsp;
                  <button
                    className="skill-btn"
                    onClick={() => removeSkill(ele)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="group">
            <label htmlFor="information">Information:</label>
            <input
              type="text"
              name="information"
              value={formData.information}
              onChange={handleChange}
              placeholder="information"
            />
          </div>
          <div style={{display: 'flex', justifyContent: "flex-end"}}> 

          <button>Cancel</button>
          <button onClick={handleSubmit}>
            {state?.edit ? "Edit Job" : "+Add Job"}
          </button>
          </div>
        </div>
        <div className="job__post__right">
          <img src={image} alt="image"/>
        </div>
      </div>
    </>
  );
};

export default JobPost;
