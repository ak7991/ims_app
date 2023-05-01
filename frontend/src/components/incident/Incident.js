import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { useCookies } from "react-cookie";

import "./Incident.css";

import FormIncident from "./FormIncident";
import DetailIncident from "./DetailIncident";

import dotenv from 'dotenv';
import LoginPageRedirect from "../pages/LoginRedirect";

dotenv.config();
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Incident = () => {
  const [incidents, setIncidents] = useState([]);
  const [loggedInStatus, setLoggedInStatus] = useState([]);

  const [token] = useCookies(["loginToken"]);

  useEffect(() => {
    if (token && token["loginToken"]) {
      setLoggedInStatus(true);
      fetch(`${BACKEND_URL}api/incident`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token["loginToken"]}`,
        },
      })
      .then((response) => response.json())
      .then((data) => setIncidents(data))
      .catch((error) => console.log(error));
    } else {
      setLoggedInStatus(false);
      LoginPageRedirect();
    }
  }, [token]);

  const [IncidentInstance, setIncidentInstance] = useState(null);

  const editIncidentBtn = (incident) => {
    setIncidentInstance(incident);
  };

  const updatedIncidents = (incident) => {
    const new_incident = incidents.map((myincident) => {
      if (myincident.id === incident.id) {
        return incident;
      } else {
        return myincident;
      }
    });
    setIncidents(new_incident);
  };

  const incidentNewForm = () => {
    setIncidentInstance({
      name: "",
      deadline: "",
      description: "",
      status: "",
      client: "",
    });
  };

  const createdIncident = (incident) => {
    const new_incident = [...incidents, incident];
    setIncidents(new_incident);
  };

  const [ActiveIncident, setActiveIncident] = useState();

  const viewIncidentDetail = (incident) => {
    setActiveIncident(incident);
    fetch(`${BACKEND_URL}api/incident?incident=${incident.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loginToken"]}`,
      },
    })
      .then((response) => response.json());
  };

  const incidentElement = (incident) => {
      return (
        <div key={incident.id} className="">
          <h3>{incident.name}</h3>
          <p>Incident ID: {incident.incident_id} </p>
          <p>Reported_on: {dateFormat(incident.date_created, "hh:MM mmmm dS, yyyy")}</p>
          <p>Description: {incident.description}</p>
          <p>Priority: {incident.priority}</p>
          <p>Status: {String(incident.closed_status)}</p>
          <div className="incident-btn-wrapper">
            <button
              onClick={() => viewIncidentDetail(incident)}
              className="btn btn-primary btn-sm"
            >
              View
            </button>
            <button
              onClick={() => editIncidentBtn(incident)}
              className="btn btn-primary btn-sm mx-3"
            >
              Update
            </button>
          </div>
          <hr />

        </div>
      );
  };
  const loggedInContent = () => {
    return (<div style={{ marginTop: "5em" }}>
    <div className="d-flex align-items-center justify-content-between">
      <div className="incident-header">
        <h1 style={{ color: "burlywood" }}>Reported Incidents</h1>
      </div>
      <div className="incident-header-btn d-flex">
        <div className="input-group">
          <select className="custom-select" id="inputGroupSelect01">
            <option selected>Filter...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <button
          className="btn btn-primary btn-sm incident-add-btn"
          onClick={incidentNewForm}
        >
          &#43; Report Incident
        </button>
      </div>
    </div>

    <hr className="bg-light" />
    <div className="proj-wrapper text-white">
    {incidents.map((incident) => incidentElement(incident))}
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
  </div>);
  };
  
  if (loggedInStatus) {
    return loggedInContent();
  } else {
    return LoginPageRedirect();
  }
};

export default Incident;
