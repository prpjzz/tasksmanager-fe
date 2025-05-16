import {
    useState,
    useEffect,
} from "react";
import {
    login,
    logout,
    register,
    getCurrentUser
} from "../../services/authServices";
import Context from "./Context";
import * as userServices from "../../services/userServices";
import LoadingDialog from "../../components/LoadingDialog";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser();
                console.log("Current user:", response);    
                setUser(response);
            } catch (error) {
                if (error.response?.status === 401) {
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, []);

    const handleLogin = async (username, password) => {
        try {
            await login(username, password);
        } catch (error) {
            throw new Error("Login failed: " + error.message);
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    const handleRegister = async (userData) => {
        try {
            await register(userData);
        } catch (error) {
            throw new Error("Registration failed: " + error.message);
        }
    };

    const handleSaveUser = (userData) => {
        setUser(userData);
    }

    const handleUpdateUser = async (updatedUser) => {
        try {
            const updatedUserData = await userServices.updateUser(user._id, updatedUser);
            setUser(updatedUserData.data);
            return updatedUserData.data;
        } catch (error) {
            throw new Error("Update failed: " + error.message);
        }
    };

    if (loading) {
        return <LoadingDialog open={loading} />;
    }

    return (
        <Context.Provider
            value={{
                user,
                login: handleLogin,
                logout: handleLogout,
                register: handleRegister,
                updateUser: handleUpdateUser,
                saveUser: handleSaveUser,
            }}
        >
            {children}
        </Context.Provider>
    );
};