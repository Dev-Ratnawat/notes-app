import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NotesDashboard from './pages/NotesDashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Notes</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<NotesDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
