import dotenv from 'dotenv';
dotenv.config();


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export default class APIService {

  static UpdateClient(client_id, body, token) {
    return fetch(`${BACKEND_URL}api/client/${client_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static UpdateIncident(incident_id, body, token) {
    return fetch(`${BACKEND_URL}api/incident/${incident_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static CreateIncident(body, token) {
    return fetch(`${BACKEND_URL}api/incident/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static CreateClient(body, token) {
    return fetch(`${BACKEND_URL}api/client/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static DeleteClient(client_id, token) {
    return fetch(`${BACKEND_URL}api/client/${client_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  static LoginUser(body) {
    return fetch(`${BACKEND_URL}auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static ForgotPassword(body) {
    return fetch(`${BACKEND_URL}auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static CreateUser(body) {
    return fetch(`${BACKEND_URL}api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}
