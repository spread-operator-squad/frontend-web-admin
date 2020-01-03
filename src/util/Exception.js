export function CustomException(code, message) {
    const error = new Error(message);
    error.name = code;
    return error;
}

export async function handleErrors(response) {
    if (!response.ok) {
        const data = await response.json();
        throw new CustomException(data.status, data.message);
    }
    return response;
}

export function customMessage(code, message) {
    return {
        type: 'error',
        code: code,
        message: message
    };
}
