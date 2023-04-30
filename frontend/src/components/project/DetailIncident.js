import React from "react";
import styled from "styled-components";
import dateFormat from "dateformat";

const StyledIncidentDetail = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  .project-detail-card {
    background-color: rgb(20, 26, 31);
    width: 400px;
    padding: 1em 2em;
    position: relative;
  }
`;

const DetailIncident = (props) => {
  return (
    <StyledIncidentDetail>
      <div className="project-detail-card text-white">
        <div className="project-detail">
          <div className="project-detail-header d-flex align-items-center justify-content-between">
            <h3>Incident Details</h3>
            <button
              onClick={() => props.setActiveIncident(null)}
              className="btn btn-primary"
            >
              x
            </button>
          </div>
          <hr />
          <h5><strong>Incident ID: </strong>{props.ActiveIncident.incident_id}</h5>
          <h5><strong>Incident priority: </strong>{props.ActiveIncident.priority}</h5>
          <h5>
            <strong>Status: </strong>{String(props.ActiveIncident.closed_status)}
          </h5>
          <h5><strong>Reported Date: </strong>{dateFormat(props.ActiveIncident.reported_on, "mmmm dS, yyyy")}</h5>
          <h5><strong>Incident Details: </strong>{props.ActiveIncident.description}</h5>
        </div>
        <br />
        <br />
       
      </div>
    </StyledIncidentDetail>
  );
};

export default DetailIncident;
