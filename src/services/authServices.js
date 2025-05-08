import * as httpRequest from '../utils/httpRequest';

const authKey = 'AUTH_KEY';

export const saveUser = (user) => {
    localStorage.setItem(authKey, JSON.stringify(user));
}

export const login = async (email, password) => {
    try {
        const res = await httpRequest.post('/auth/login', { email, password });
        if (res.status === 400) {
            throw new Error('Error: ' + res.data.message);
        } else {
            saveUser(res.data.token);
            return res.data.token;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Error logging in: ' + error.message);
    }
}

export const register = async (user) => {
    try {
        const res = await httpRequest.post('/auth/register', user);
        if (res.status === 400) {
            throw new Error('Error: ' + res.data.message);
        }
    } catch (error) {
        console.error('Error registering:', error);
        throw new Error('Error registering: ' + error.message);
    }
}

export const logout = () => {
    localStorage.removeItem(authKey);
    console.log('User logged out successfully');
}

export const getCurrentUser = () => {
    const token = localStorage.getItem(authKey);
    return token ?? null;
}