import {getAuthHeader} from "./authenticationService";
import {customMessage} from "../util/Exception";

export async function getUserById(id) {
    return await fetch(`/users/${id}`, {
        method: "GET",
        headers: getAuthHeader()
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return customMessage(error.name, error.message);
    })
}

export async function getAllUser() {
    return await fetch(`/users`, {
        method: "GET",
        headers: getAuthHeader()
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return customMessage(error.name, error.message);
        })
}

export async function getAllUserByActiveStatus(isActive) {
    return await fetch(`/users?active=${isActive}`, {
        method: "GET",
        headers: getAuthHeader()
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return customMessage(error.name, error.message);
    })
}

export async function blockUserById(id) {
    return await fetch(`/users/${id}/block`, {
        method: "PUT",
        headers: getAuthHeader()
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return customMessage(error.name, error.message);
    })
}

export async function activateUserById(id) {
    return await fetch(`/users/${id}/activate`, {
        method: "PUT",
        headers: getAuthHeader()
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return customMessage(error.name, error.message);
    })
}

export async function deleteUserById(id) {
    return await fetch(`/users/${id}`, {
        method: "DELETE",
        headers: getAuthHeader()
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return customMessage(error.name, error.message);
    })
}
