import * as httpRequest from '../utils/httpRequest';

const authKey = 'AUTH_KEY';

export const saveUser = (user) => {
    localStorage.setItem(authKey, user);
}

export const login = async (email, password) => {
    try {
        const res = await httpRequest.post('/auth/login', { email, password });
        saveUser(res.data.token);
        return res.data.token;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    }
}

export const register = async (user) => {
    try {
        await httpRequest.post('/auth/register', user);
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    }
}

export const logout = () => {
    localStorage.removeItem(authKey);
}

export const getCurrentUser = () => {
    const token = localStorage.getItem(authKey);
    return token ?? null;
}