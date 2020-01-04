export const CREDENTIAL = 'credential';
export const STORE = 'store';

export function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export const USER_ROLE = {
    ADMIN: {
        label: 'admin',
        role: 'ROLE_ADMINISTRATOR'
    },
    OWNER: {
        label: 'owner',
        role: 'ROLE_OWNER'
    },
    OPERATOR: {
        label: 'operator',
        role: 'ROLE_OPERATOR'
    },
};
