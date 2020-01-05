import {customMessage, handleErrors} from "../util/Exception";
import { getAuthHeader } from "./authenticationService";
import {getSelectedStore} from "./storeService";

export async function fetchOperator() {
    return await fetch(`/stores/${getSelectedStore()}`,
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
