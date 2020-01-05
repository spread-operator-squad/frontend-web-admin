import {customMessage, handleErrors} from "../util/Exception";
import {CREDENTIAL, USER_DETAIL, USER_ROLE} from "../util/Constants";

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

export async function doRegister(payload) {
    return await fetch('/auth/registration',
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
    return getToken() != null;
}

export function getAuthHeader() {
    return {Authorization: 'Bearer ' + getToken()}
}

export function getToken() {
    return localStorage.getItem(CREDENTIAL);
}

export function getJsonToken() {
    return jwtDecode(getToken());
}

export function getUserDetail() {
    return localStorage.getItem(USER_DETAIL);
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
        } else {
            localStorage.clear();
            return '/login';
        }
    } else {
        return '/login';
    }
}
