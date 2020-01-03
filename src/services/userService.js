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
