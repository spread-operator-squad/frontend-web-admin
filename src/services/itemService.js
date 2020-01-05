import {customMessage, handleErrors} from "../util/Exception";
import { getAuthHeader, getToken } from "./authenticationService";
import {getSelectedStore} from "./storeService";

export async function fetchItem() {
    return await fetch(`/items/store?id=${getSelectedStore()}`,
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

export async function saveItem(payload) {
    return await fetch('/items',
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

export async function deleteItemById(id) {
    return await fetch(`/items/${id}`,
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
