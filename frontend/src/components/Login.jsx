import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false); // Tracks if we are in Login or Register mode
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const API_BASE_URL = `${import.meta.env.VITE_API_URL ||'http://localhost:5000/api'}/`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isRegister) {
      // 1. Handle Registration Flow
      try {
        const response = await fetch(`${API_BASE_URL}register`, {
          method: 'POST', // Sends a proper POST request
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          setSuccess('Account created successfully! You can now log in.');
          setIsRegister(false); // Switch back to login mode automatically
        } else {
          setError(data.message || 'Registration failed');
        }
      } catch (err) {
        setError('Could not connect to backend server');
      }
    } else {
      // 2. Handle Login Flow
      try {
        await login(email, password);
        navigate('/home')
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>{isRegister ? 'Create Account' : 'Sign In'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
          </div>
        )}
        <div>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ color: '#007BFF', cursor: 'pointer', decoration: 'underline' }}>
          {isRegister ? 'Sign In here' : 'Register here'}
        </span>
      </p>
    </div>
  );
}