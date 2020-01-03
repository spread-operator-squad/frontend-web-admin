import {customMessage, handleErrors} from "../util/Exception";
import {CREDENTIAL, USER_ROLE} from "../util/Constants";

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
        if (USER_ROLE.ADMIN.role.includes(getRoleUser())) {
            return '/admin/';
        } else if (USER_ROLE.OWNER.role.includes(getRoleUser())) {
            return '/owner/';
        } else if (USER_ROLE.OPERATOR.role.includes(getRoleUser())) {
            return '/operator/';
        }
    } else {
        return '/login';
    }
}
