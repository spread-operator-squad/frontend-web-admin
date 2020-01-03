import {customMessage, handleErrors} from "../util/Exception";
import { getAuthHeader } from "./authenticationService";

export async function fetchOperator() {
    return await fetch('/stores/13',
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