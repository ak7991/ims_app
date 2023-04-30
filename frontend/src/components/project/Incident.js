import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { useCookies } from "react-cookie";

import "./Incident.css";

import FormIncident from "./FormIncident";
import DetailIncident from "./DetailIncident";

import dotenv from 'dotenv';
dotenv.config();
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Incident = () => {
  const [projects, setIncidents] = useState([]);
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
      .then((data) => setIncidents(data))
      .catch((error) => console.log(error));
  }, [token]);

  const [IncidentInstance, setIncidentInstance] = useState(null);

  const editIncidentBtn = (project) => {
    setIncidentInstance(project);
  };

  const updatedIncidents = (project) => {
    const new_project = projects.map((myproject) => {
      if (myproject.id === project.id) {
        return project;
      } else {
        return myproject;
      }
    });
    setIncidents(new_project);
  };

  const projectNewForm = () => {
    setIncidentInstance({
      name: "",
      deadline: "",
      description: "",
      status: "",
      client: "",
    });
  };

  const createdIncident = (project) => {
    const new_project = [...projects, project];
    setIncidents(new_project);
  };

  const [ActiveIncident, setActiveIncident] = useState();

  const viewIncidentDetail = (project) => {
    setActiveIncident(project);
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
                  onClick={() => viewIncidentDetail(project)}
                  className="btn btn-primary btn-sm"
                >
                  View
                </button>
                <button
                  onClick={() => editIncidentBtn(project)}
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
      {IncidentInstance ? (
        <FormIncident
          IncidentInstance={IncidentInstance}
          setIncidentInstance={setIncidentInstance}
          updatedIncidents={updatedIncidents}
          createdIncident={createdIncident}
        />
      ) : null}

      {ActiveIncident ? (
        <DetailIncident
          ActiveIncident={ActiveIncident}
          setActiveIncident={setActiveIncident}
        />
      ) : null}
    </div>
  );
};

export default Incident;
