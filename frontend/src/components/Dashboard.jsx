import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {

    const {logout} = useContext(AuthContext);
    const [message, setMessage] = useState('Loading secure components...');

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('userToken');
            try{
                const response = await fetch('http://localhost:5000/api/dashboard', {
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