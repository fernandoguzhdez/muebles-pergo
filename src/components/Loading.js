import { React } from 'react';
import { Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Loading.css';
import logo from '../img/logo.png';

function Loading() {
    return (
        <div className="loading-container">
            <img src={logo} alt="Company Logo" className="company-logo" />
            <div class="contenedor-loader">
                <div class="loader1"></div>
                <div class="loader2"></div>
                <div class="loader3"></div>
                <div class="loader4"></div>
            </div>
            <div class="cargando">Cargando...</div>
        </div>
    )
}

export default Loading;