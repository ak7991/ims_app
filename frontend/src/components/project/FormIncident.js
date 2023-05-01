import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import "../Modal.css";

import APIService from "../../APIService";

function FormIncident(props) {
  const [IncidentIncidentId, setIncidentIncidentId] = useState();
  const [IncidentDescription, setIncidentDescription] = useState();
  const [IncidentPriority, setIncidentPriority] = useState();
  const [IncidentClosedStatus, setIncidentClosedStatus] = useState();

  const [token, setToken] = useCookies(["loginToken"]);

  useEffect(() => {
    setIncidentDescription(props.IncidentInstance.description);
    setIncidentPriority(props.IncidentInstance.priority);
    setIncidentClosedStatus(props.IncidentInstance.closed_status);
  }, [props.IncidentInstance]);

  const updateIncident = () => {
    APIService.UpdateIncident(
      props.IncidentInstance.id,
      {
        incident_id: IncidentIncidentId,
        description: IncidentDescription,
        priority: IncidentPriority,
        closed_status: IncidentClosedStatus,
      },
      token["loginToken"]
    ).then((response) => props.updatedIncidents(response));
  };

  const createIncident = () => {
    APIService.CreateIncident(
      {
        description: IncidentDescription,
        priority: IncidentPriority,
        closed_status: IncidentClosedStatus,
      },
      token["loginToken"]
    ).then((response) => props.createdIncident(response));
  };

  return (
    <div className="overlay">
      {props.IncidentInstance ? (
        <div className="mb-3 text-light modal-card">
          <button onClick={() => props.setIncidentInstance(null)}
            className="btn btn-primary close-btn"> x </button>
          <label htmlFor="description" className="form-label">
            Incident Description
          </label>
          <textarea
            className="form-control"
            rows="4"
            id="description"
            placeholder="Enter project's name..."
            value={IncidentDescription}
            onChange={(e) => setIncidentDescription(e.target.value)}
          />
          <br />
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            onChange={(e) => setIncidentPriority(e.target.value)}
            className="form-select"
            name="priority"
            id="priority"
            value={IncidentPriority}
            // placeholder="Enter Priority"
          >
            <option value="none" default>
              Select a priority...
            </option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <br />

          <label htmlFor="closed_status" className="form-label">
            Closed Status:
          </label>
          <select
            onChange={(e) => setIncidentClosedStatus(e.target.value)}
            className="form-select"
            name="closed_status"
            id="closed_status"
            value={IncidentClosedStatus}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <br />

          {props.IncidentInstance.id ? (
            <button onClick={updateIncident} className="btn btn-primary">
              Update Incident
            </button>
          ) : (
            <button onClick={createIncident} className="btn btn-primary">
              Create Incident
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default FormIncident;
