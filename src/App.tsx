import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageDashboard } from './pages/PageDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { ComponentNavbar } from './components/component-navbar/ComponentNavbar';  

function App() {
    return (
        <Router>
            <ComponentNavbar />  

            <Routes>
                <Route path="/" element={<PageDashboard />} />  {/* Ruta para el Dashboard */}
                <Route path="/pages/login" element={<Login />} />     {/* Ruta para el Login */}
                <Route path="/pages/register" element={<Register />} /> {/* Ruta para el Registro */}
            </Routes>
        </Router>
    );
}

export default App;
