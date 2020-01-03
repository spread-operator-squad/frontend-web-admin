import {customMessage, handleErrors} from "../util/Exception";
const jwtDecode = require('jwt-decode');

export async function doLogin(payload) {
    return await fetch('/auth/login?type=web',
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
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

