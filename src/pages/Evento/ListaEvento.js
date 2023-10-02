import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const ListaEventos = () => {
    const token = localStorage.getItem('token')
   //const permisos = useSelector(state => state.login.permisos);
    const history = useHistory();

    const [evento, setEvento] = useState([]);
    const [miseventos, setMiseventos] = useState([]);

    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        
        obtenerListaEventos();
        obtenerMisEventos();
    }, []);

    const obtenerListaEventos = () => {
        setCargando(true);
        axios.get('http://localhost:4000/api/v1/events', {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            console.log('response', response.data);
            console.log(localStorage.getItem('token'));
            
            setEvento(response.data);
            setCargando(false);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const obtenerMisEventos = () => {
        setCargando(true);
        axios.get('http://localhost:4000/api/v1/events/user', {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            console.log('response', response.data);
            console.log(localStorage.getItem('token'));
            
            setMiseventos(response.data);
            setCargando(false);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const eliminarEvento = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://3.144.249.52:4000/api/v1/events/' + id + '/';
        axios.delete(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
            ).then((response) => {
                obtenerListaEventos();
        }).catch(error => {
            console.log(error);
        });
    }
    return <div>
        {cargando === true && <h1>Cargando...</h1>}
        {cargando === false &&
        
            <Card className="mt-3">

                <Card.Body>
                    <Card.Title>Eventos</Card.Title>
                    <table className='table table-hover table-bordered border border-primary'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evento.map(item =>
                                <tr key={"item-" + item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card.Body>
                <Card.Body>
                    <Card.Title>Mis Eventos</Card.Title>
                    <table className="table border border-success table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {miseventos.map(item =>
                                <tr key={"item-" + item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <Link className="btn btn-primary" to={"/eventodetalle/" + item.id}>Ver Evento</Link>
                                    </td>
                                    <td>
                                        <Link className="btn btn-primary" to={"/evento/edit/" + item.id}>Editar</Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { eliminarEvento(item.id) }}>Eliminar</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        }
    </div >;
}

export default ListaEventos;