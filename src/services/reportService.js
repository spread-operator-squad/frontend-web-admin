import {customMessage, handleErrors} from "../util/Exception";
import { getAuthHeader } from "./authenticationService";
import {getSelectedStore} from "./storeService";

export async function fetchReport() {
    return await fetch(`/transactions/store?id=${getSelectedStore()}`,
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
