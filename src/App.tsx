import React from 'react';
import { Route, Routes } from 'react-router';
import './App.scss';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Registr/Registr';
import { Admin } from './Pages/Admin/Admin';
import { Notfound } from './Pages/Notfound/NotFound';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/admin/:token" element={<Admin />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
