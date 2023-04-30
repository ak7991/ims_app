import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { useCookies } from "react-cookie";

import "./Project.css";

import FormProject from "./FormProject";
import DetailProject from "./DetailProject";

import dotenv from 'dotenv';
dotenv.config();
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Incident = () => {
  const [projects, setProjects] = useState([]);
  // const [incident, setIncidents] = useState([]);

  const [token] = useCookies(["loginToken"]);

  useEffect(() => {
    fetch(`${BACKEND_URL}api/project`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loginToken"]}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.log(error));
  }, [token]);

  const [ProjectInstance, setProjectInstance] = useState(null);

  const editProjectBtn = (project) => {
    setProjectInstance(project);
  };

  const updatedProjects = (project) => {
    const new_project = projects.map((myproject) => {
      if (myproject.id === project.id) {
        return project;
      } else {
        return myproject;
      }
    });
    setProjects(new_project);
  };

  const projectNewForm = () => {
    setProjectInstance({
      name: "",
      deadline: "",
      description: "",
      status: "",
      client: "",
    });
  };

  const createdProject = (project) => {
    const new_project = [...projects, project];
    setProjects(new_project);
  };

  const [ActiveProject, setActiveProject] = useState();

  const viewProjectDetail = (project) => {
    setActiveProject(project);
    fetch(`${BACKEND_URL}api/project?project=${project.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loginToken"]}`,
      },
    })
      .then((response) => response.json());
  };

  return (
    <div style={{ marginTop: "5em" }}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="project-header">
          <h1 style={{ color: "burlywood" }}>Reported Incidents</h1>
        </div>
        <div className="project-header-btn d-flex">
          <div className="input-group">
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>Filter...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <button
            className="btn btn-primary btn-sm project-add-btn"
            onClick={projectNewForm}
          >
            &#43; Report Incident
          </button>
        </div>
      </div>

      <hr className="bg-light" />
      <div className="proj-wrapper text-white">
        {projects.map((project) => {
          return (
            <div key={project.id} className="">
              <h3>{project.name}</h3>
              <p>Incident ID: {project.incident_id} </p>
              <p>Reported_on: {dateFormat(project.date_created, "hh:MM mmmm dS, yyyy")}</p>
              <p>Description: {project.description}</p>
              <p>Priority: {project.priority}</p>
              <p>Status: {String(project.closed_status)}</p>
              <div className="project-btn-wrapper">
                <button
                  onClick={() => viewProjectDetail(project)}
                  className="btn btn-primary btn-sm"
                >
                  View
                </button>
                <button
                  onClick={() => editProjectBtn(project)}
                  className="btn btn-primary btn-sm mx-3"
                >
                  Update
                </button>
              </div>
              <hr />

            </div>
          );
        })}
      </div>
      {ProjectInstance ? (
        <FormProject
          ProjectInstance={ProjectInstance}
          setProjectInstance={setProjectInstance}
          updatedProjects={updatedProjects}
          createdProject={createdProject}
        />
      ) : null}

      {ActiveProject ? (
        <DetailProject
          ActiveProject={ActiveProject}
          setActiveProject={setActiveProject}
        />
      ) : null}
    </div>
  );
};

export default Incident;
