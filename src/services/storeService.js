import {getAuthHeader, getToken} from "./authenticationService";
import {customMessage, handleErrors} from "../util/Exception";
import {STORE} from "../util/Constants";

export async function getStoreByOwnerId(id) {
    return await fetch(`/stores/owner?id=${id}`,
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

export async function saveStore(payload) {
    return await fetch('/stores',
        {
            method: "POST",
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

export function saveSelectedStore(store) {
    return localStorage.setItem(STORE, store.id);
}

export function getSelectedStore() {
    return localStorage.getItem(STORE);
}

export function isSelectedStore() {
    return localStorage.getItem(STORE) != null;
}
