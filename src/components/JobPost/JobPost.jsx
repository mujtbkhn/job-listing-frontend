import React, { useState } from "react";
import "./JobPost.css";
import { DEFAULT_SKILLS } from "../../utils/constants";
import { createJobPost } from "../../apis/job";

const JobPost = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "",
    locationType: "",
    location: "",
    description: "",
    about: "",
    skills: [],
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
      !formData.jobPosition ||
      !formData.monthlySalary ||
      !formData.jobType ||
      !formData.locationType ||
      !formData.location ||
      !formData.description ||
      !formData.about ||
      !formData.skills
    ) {
        console.log("error occurred ")
      return;
    }
    await createJobPost(formData);
  };
  return (
    <>
      <div>JobPost</div>
      <div className="job_post_main">
        <div className="job__post__left">
          <h1>Add job description</h1>
          <div>
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              name="companyName"
              id=""
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="logoUrl">Add Logo URL</label>
            <input
              type="text"
              name="logoUrl" // Corrected name attribute
              id=""
              onChange={handleChange}
              value={formData.logoUrl}
            />
          </div>
          <div>
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              name="jobPosition"
              id=""
              onChange={handleChange}
              value={formData.jobPosition}
            />
          </div>
          <div>
            <label htmlFor="monthlySalary">Monthly Salary</label>
            <input
              type="text"
              name="monthlySalary"
              id=""
              onChange={handleChange}
              value={formData.monthlySalary}
            />
          </div>
          <div>
            <label htmlFor="jobType">Job Type</label>
            <select
              name="jobType"
              id=""
              onChange={handleChange}
              value={formData.jobType}
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>
          </div>
          <div>
            <label htmlFor="locationType">Location Type</label>
            <select
              name="locationType"
              id=""
              onChange={handleChange}
              value={formData.locationType}
            >
              <option value="">Select</option>
              <option value="">Remote</option>
              <option value="">Office</option>
            </select>
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id=" "
              onChange={handleChange}
              value={formData.location}
            />
          </div>
          <div>
            <label htmlFor="description">Job Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="add your description"
              value={formData.description}
            ></textarea>
          </div>
          <div>
            <label htmlFor="about">About the company</label>
            <textarea
              name="about"
              onChange={handleChange}
              placeholder="about the company"
              value={formData.about}
            ></textarea>
          </div>
          <div>
            <label htmlFor="skills">Skills</label>
            <select name="skills" id="" onChange={addSkills}>
              <option>Please select skills </option>
              {DEFAULT_SKILLS.map((element) => (
                <option value={element}>{element}</option>
              ))}
            </select>
          </div>
          <div>
            {formData?.skills?.map((ele) => (
              <div>
                {ele}&nbsp;
                <button onClick={() => removeSkill(ele)}>X</button>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <button>Cancel</button>
        </div>
        <div className="job__post__right">Right</div>
      </div>
    </>
  );
};

export default JobPost;
