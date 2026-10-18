import { createContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const savedUser = localStorage.getItem('userData');
        if(token &&  savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    },[]);

    const login = async (email,password) => {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password}),
        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.message || 'Login failed');

        localStorage.setItem('userToken',data.token);
        localStorage.setItem('userData',JSON.stringify({name:data.name, email: data.email }));
        setUser({name: data.name, email: data.email});
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    );

};