import * as userServices from './userServices';

const authKey = 'AUTH_KEY';

export const saveUser = (user) => {
    localStorage.setItem(authKey, JSON.stringify(user));
}

export const login = async (email, password) => {
    try {
        const user = await userServices.getAllUsers();
        const foundUser = user.data.find(u => u.email === email && u.password === password);
        if (foundUser) {
            saveUser(foundUser);
            return foundUser;
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Error logging in: ' + error.message);
    }
}

export const register = async (user) => {
    try {
        const existingUsers = await userServices.getAllUsers();
        if (existingUsers.data.some(existingUser => existingUser.email === user.email)) {
            throw new Error('Email already exists');
        }
        const newUser = await userServices.createUser(user);
        saveUser(newUser.data);
        return newUser.data;
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
    const user = localStorage.getItem(authKey);
    return user ? JSON.parse(user) : null;
}
export const updatePassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await userServices.getUserById(userId);
    if (user.data.password !== currentPassword) {
      throw new Error('Mật khẩu hiện tại không đúng');
    }
    const updatedUser = { ...user.data, password: newPassword };
    await userServices.updateUser(userId, updatedUser);
    saveUser(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Error updating password: ' + error.message);
  }
};