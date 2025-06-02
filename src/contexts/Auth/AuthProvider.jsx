import {
    useState,
    useEffect,
} from "react";
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
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const validateLogin = async (username, password) => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = storedUsers.find(
            (user) => user.username === username && user.password === password
        );

        return !!foundUser;
    };

    const handleLogin = async (username, password) => {
        try {
            const user = await login(username, password);
            setUser(user);
            return user;
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
            const user = await register(userData);
            return user;
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
    const handleUpdatePassword = async (currentPassword, newPassword) => {
  try {
    const updatedUser = await updatePassword(user.id, currentPassword, newPassword);
    setUser(updatedUser);
    return updatedUser;
  } catch (error) {
    throw new Error("Update password failed: " + error.message);
  }
};

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <Context.Provider
            value={{
                user,
                validateLogin: validateLogin,
                login: handleLogin,
                logout: handleLogout,
                register: handleRegister,
                updateUser: handleUpdateUser,
                updatePassword: handleUpdatePassword, // Thêm hàm mới
            }}
        >
            {children}
        </Context.Provider>
    );
};