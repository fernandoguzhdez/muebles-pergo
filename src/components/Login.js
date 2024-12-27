import React from 'react';
import '../css/Login.css';
import Dashboard from '../components/Dashboard.js';
import axios from 'axios';
import { withParamsAndNavigate } from "../getParamsAndNavigate.js";
import { Apiurl } from '../services/apirest.js'
import { useState, useEffect } from 'react';
import Loading from '../components/Loading.js';
import logo from '../img/logo.png';

function Login(props) {

    const [isLoading, setIsLoading] = useState(false);
    let [url, setUrl] = useState("");
    const [state, setState] = useState({
        form: {
            "dspUser": "",
            "dspPassword": ""
        },
        error: false,
        errorMsg: "",
        load: false
    });

    useEffect(() => {
        fetch('urlApi.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                setUrl(myJson.url)
                localStorage.setItem("url", myJson.url);
            });
    }, []);

    const manejadorChange = async e => {
        await setState({
            form: {
                ...state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    const manejadorBoton = () => {
        console.log(url) //haber correolo ya esta corriendo en la otra pantalla
        setState({
            load: true,
        })
        const { navigate } = props;
        axios.post(url + '/Login', state.form)
            .then(response => {
                console.log(response);
                if (response.data.isError === false) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("Username", response.data.dspUser);
                    navigate('/dashboard')
                } else {
                    console.log("error");
                    setState({
                        error: true,
                        errorMsg: response.data.messageError
                    })
                }
                console.log(isLoading)
            })
            .catch(error => {
                console.log(error);
                setState({
                    error: true,
                    errorMsg: "Error al conectar con el api"
                });
            })
    }
    return (
        <div className="Auth-form-container">
            <div className="Auth-form-content w-100 h-100">
                <div className="text-center pb-5">
                    <img src={logo} />
                </div>

                <div className="form-group mt-3">
                    <label>Usuario</label>
                    <input
                        type="text"
                        name='dspUser'
                        className="form-control mt-1"
                        placeholder="Ingrese su usuario"
                        onChange={manejadorChange}
                    />
                </div>
                <div className="form-group mt-4">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name='dspPassword'
                        className="form-control mt-1"
                        placeholder="Ingrese su contraseña"
                        onChange={manejadorChange}
                    />
                </div>
                <div className="d-grid gap-2 mt-5">
                    <button type="submit" className="btn btn-primary 5rem" value="Login" onClick={() => manejadorBoton()} >Iniciar Sesion</button>
                </div>

                {state.load === true &&
                    <div className='Loading'>
                        <Loading />
                    </div>
                }

                {state.error === true &&
                    <div className="alert alert-danger w-100 mt-5" role="alert">
                        {state.errorMsg}
                    </div>
                }

            </div>
        </div>
    )
}

export default withParamsAndNavigate(Login);
