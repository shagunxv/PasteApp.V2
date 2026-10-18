
import { useContext, useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import { Toaster } from 'react-hot-toast';
import { scheduleReminders } from './utils/reminders';

function AppContent() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      scheduleReminders();
   }
 }, [user]);

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Toaster position="top-right" />
      
      
  
  <Routes>
    <Route path="/" element={<Login />} />

    <Route
      path="/home"
      element={
        user ? (
          <>
            <Navbar />
            <Home />
          </>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />

    <Route
      path="/pastes"
      element={
        user ? (
          <>
            <Navbar />
            <Paste />
          </>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />

    <Route
      path="/pastes/:id"
      element={
        user ? (
          <>
            <Navbar />
            <ViewPaste />
          </>
        ) : (
          <Navigate to="/" replace />
        )
      }
    />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>


    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
