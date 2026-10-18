import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Dashboard() {

    const {logout} = useContext(AuthContext);
    const [message, setMessage] = useState('Loading secure components...');

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('userToken');
            try{
               const response = await fetch(`${API_BASE_URL}/dashboard`, {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${token}`}
                });
                const data = await response.json();
                if(response.ok) setMessage(data.message);
                else logout();
            }
            catch {
                setMessage('Network Connection Error.');
            }
        };
        fetchDashboard();
    }, [logout]);


return (
    <div style={{textAlign: 'center', marginTop: '100px',}}>
        <h1>Secure Platform Access</h1>
        <p style={{fontSize: '18px', color: '#555'}}>{message}</p>
        <button onClick={logout} >
            Log Out
        </button>
    </div>
)
}