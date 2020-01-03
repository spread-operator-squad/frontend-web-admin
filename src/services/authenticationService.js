import {customMessage, handleErrors} from "../util/Exception";
import {CREDENTIAL} from "../util/Constants";

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

export function isAuthenticated() {
    return localStorage.getItem(CREDENTIAL) != null;
}

export function getAuthHeader() {
    return {Authorization: 'Bearer ' + localStorage.getItem(CREDENTIAL)}
}

export function getJsonToken() {
    return jwtDecode(localStorage.getItem(CREDENTIAL));
}

function getRoleUser() {
    let roles = [];
    getJsonToken().scopes.map(item => roles.push(item.authority));
    return roles;
}

export function getPathRedirect() {
    if (isAuthenticated()) {
        if ('ROLE_ADMINISTRATOR'.includes(getRoleUser())) {
            return '/admin/';
        } else if ('ROLE_OWNER'.includes(getRoleUser())) {
            return '/owner/';
        } else if ('ROLE_OPERATOR'.includes(getRoleUser())) {
            return '/operator/';
        }
    } else {
        return '/login';
    }
}
