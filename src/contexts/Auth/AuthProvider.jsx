import {
    useState,
    useEffect,
} from "react";
import { jwtDecode } from 'jwt-decode';
import {
    login,
    logout,
    register,
    getCurrentUser,
    saveUser
} from "../../services/authServices";
import Context from "./Context";
import * as userServices from "../../services/userServices";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(jwtDecode(storedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const token = await login(username, password);
            setUser(jwtDecode(token));
        } catch (error) {
            throw new Error("Login failed: " + error.message);
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    const handleRegister = async (userData) => {
        try {
            await register(userData);
        } catch (error) {
            throw new Error("Registration failed: " + error.message);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            const updatedUserData = await userServices.updateUser(user.id, updatedUser);
            saveUser(updatedUserData);
            setUser(updatedUserData);
            return updatedUserData;
        } catch (error) {
            throw new Error("Update failed: " + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Context.Provider
            value={{
                user,
                login: handleLogin,
                logout: handleLogout,
                register: handleRegister,
                updateUser: handleUpdateUser,
            }}
        >
            {children}
        </Context.Provider>
    );
};