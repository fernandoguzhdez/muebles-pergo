import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";
import { withParamsAndNavigate } from "../getParamsAndNavigate.js";
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import { Apiurl } from '../services/apirest';

function Dashboard(props) {

    const [datos, setDatos] = useState([]);
    const [hoy, setHoy] = useState([]);
    const [mes, setMes] = useState([]);
    const [seconds, setSeconds] = useState(0);
    let [url, setUrl] = useState("");
    let contador = 0;
    let interval;
    let navigate;

    const formatterPeso = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    useEffect(() => {
        const { navigate } = props;
        interval = setInterval(() => {
            contador += 1;
            if (contador === 500) {
                navigate('/')
                localStorage.removeItem('token');
                localStorage.removeItem('Username');
            }
            console.log(interval)
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {

        const cargarDatos = async () => {

            const config = {
                headers: {
                    header: axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
                }
            };
            const url = localStorage.getItem('url') + '/List_Sales';

            const result = await axios.get(url, config);

            setDatos(result.data)

            //Filtro de mes y dia
            setHoy(result.data.filter((result) => result.Tiempo === 'Hoy'));
            setMes(result.data.filter((result) => result.Tiempo === 'Mes'));
        }

        cargarDatos();
    }, []);

    const eventoClick = () => {
        reiniciarSesion();
    }

    const handleScroll = () => {
        reiniciarSesion();
    }

    const reiniciarSesion = () => {
        contador = 0;
        console.log(contador)
    }

    const cerrarSesion = () => {
        const { navigate } = props;
        navigate('/')
        localStorage.removeItem('token');
        localStorage.removeItem('Username');
    }


    console.log(window.addEventListener)
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', eventoClick);


    return (
        <div className="font-link" onClick={eventoClick}>
            <Navbar className='Navbar d-flex justify-content-start p-2' expand="lg" onClick={eventoClick}>
                <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={localStorage.getItem('Username')}
                    menuVariant="dark"
                >
                    <NavDropdown.Item href="/#/" onClick={cerrarSesion}>
                        Cerrar Sesion
                    </NavDropdown.Item>
                </NavDropdown>
                <h3>Ventas</h3>
            </Navbar>
            <div className='container mt-3' onClick={eventoClick}>

                <Card onClick={eventoClick} >
                    <Card.Header className='header-title'>Hoy</Card.Header>
                    <Card.Body>
                        {
                            hoy.map((datoHoy, i) => {
                                return (
                                    <Accordion key={i}>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header>
                                                {datoHoy.Description === 'Cotizado' ? <BsFillFileEarmarkTextFill className='m-1 display-6' /> : datoHoy.Description === 'Vendido' ? <GiTakeMyMoney className='m-1 display-6' /> : <GiReceiveMoney className='m-1 display-6' />}
                                                {datoHoy.Description}
                                                <strong className='Total'>
                                                    {formatterPeso.format(datoHoy.Total)} ({datoHoy.Count})
                                                </strong>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup as="ol" numbered>
                                                    {
                                                        datoHoy.Detalle.map((detalleHoy, x) => {
                                                            return (
                                                                <ListGroup.Item
                                                                    key={x}
                                                                    as="li"
                                                                    className="d-flex justify-content-between align-items-start"
                                                                >
                                                                    <div className="ms-2 me-auto">
                                                                        <div className="fw-bold">{detalleHoy.CardName}</div>
                                                                        {formatterPeso.format(detalleHoy.Total)}
                                                                    </div>
                                                                    <Badge bg="primary" pill>
                                                                        {detalleHoy.CountDoc}
                                                                    </Badge>
                                                                </ListGroup.Item>
                                                            )
                                                        })
                                                    }
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )
                            })
                        }

                    </Card.Body>
                    <Card.Header className='header-title'>Mes</Card.Header>
                    <Card.Body>
                        {
                            mes.map((datoMes, i) => {
                                return (
                                    <Accordion key={i}>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header >
                                                {datoMes.Description === 'Cotizado' ? <BsFillFileEarmarkTextFill className='m-1 display-6' /> : datoMes.Description === 'Vendido' ? <GiTakeMyMoney className='m-1 display-6' /> : <GiReceiveMoney className='m-1' />}
                                                {datoMes.Description}
                                                <strong className='Total'>
                                                    {formatterPeso.format(datoMes.Total)} ({datoMes.Count})
                                                </strong>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup as="ol" numbered>
                                                    {
                                                        datoMes.Detalle.map((detalle, x) => {
                                                            return (
                                                                <ListGroup.Item
                                                                    key={x}
                                                                    as="li"
                                                                    className="d-flex justify-content-between align-items-start"
                                                                >
                                                                    <div className="ms-2 me-auto">
                                                                        <div className="fw-bold">{detalle.CardName}</div>
                                                                        {formatterPeso.format(detalle.Total)}
                                                                    </div>
                                                                    <Badge bg="primary" pill>
                                                                        {detalle.CountDoc}
                                                                    </Badge>
                                                                </ListGroup.Item>
                                                            )
                                                        })
                                                    }
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )
                            })
                        }

                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default withParamsAndNavigate(Dashboard);
