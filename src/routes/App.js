import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login.js';
import Dashboard from '../components/Dashboard.js';
import Protected from './Protected.js';
import '../css/App.css';

function App() {

  return (
    <React.Fragment>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="*" component={NotFound} />
        </Routes>
      </HashRouter>
    </React.Fragment>
  );
}

function NotFound() {
  return <>Ha llegado a una página que no existe</>;
}

export default App;
