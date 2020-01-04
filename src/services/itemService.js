import {customMessage, handleErrors} from "../util/Exception";
import { getAuthHeader } from "./authenticationService";
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

export async function deleteItemById(id) {
    return await fetch(`/items/${id}`, {
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
