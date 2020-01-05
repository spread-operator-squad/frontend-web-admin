import {customMessage, handleErrors} from "../util/Exception";
import {getAuthHeader, getToken} from "./authenticationService";
import {getSelectedStore} from "./storeService";

export async function fetchService() {
    return await fetch(`/services/store?id=${getSelectedStore()}`,
        {
            method: "GET",
            headers: getAuthHeader()
        })
        .then(handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return customMessage(error.name, error.message);
        })
}

export async function saveService(payload) {
    return await fetch('/services',
        {
            method: payload.id === undefined ? "POST" : "PUT",
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }),
            body: JSON.stringify(payload)
        })
        .then(handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return customMessage(error.name, error.message);
        })
}

export async function deleteServiceById(id) {
    return await fetch(`/services/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeader()
        })
        .then(handleErrors)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return customMessage(error.name, error.message);
        })
}
