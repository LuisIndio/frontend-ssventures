import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const FormEvento = (props) => {
    const token = useSelector(state => state.login.token)

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosEvento(id);
    }, [id]);

    const fetchDatosEvento = (id) => {

        const url = 'http://localhost:4000/api/v1/events/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        )
            .then((response) => {
                console.log('fetchDatosEventos', response.data);
                const objEventos = response.data;
                console.log('objEventos', objEventos.name);

                setName(objEventos.name);
                setDescription(objEventos.description);
                setDate(objEventos.date);

            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }

    const enviarDatos = () => {

        const params = {
            "name": name,
            "description": description,
            "date":date
        };
        if (id === 0) {
            insertarEvento(params);
        } else {
            actualizarEvento(params);
        }
    }
    const insertarEvento = (params) => {

        const url = 'http://localhost:4000/api/v1/events';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/evento');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const actualizarEvento = (params) => {

        const url = 'http://localhost:4000/api/v1/events/' + id + '/';
        axios.patch(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/evento');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3 border border-success shadow-lg">

                    <Card.Body>
                        <Card.Title className='d-flex align-items-center justify-content-center mt-3'>Formulario de Eventos</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control border border-success" type="text" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} /></div>

                        <div><label>Descripción:</label></div>
                        <div><input className="form-control border border-success" type="text" value={description} onChange={(e) => {
                            setDescription(e.target.value);
                        }} /></div>

                        <div><label>Fecha:</label></div>
                        <div><input className="form-control border border-success" type="text" value={date} onChange={(e) => {
                            setDate(e.target.value);
                        }} /></div>

                        <div class="d-flex align-items-center justify-content-center mt-3">
                            <button className="btn mt-3 border border-success" onClick={enviarDatos}>
                                Guardar
                            </button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default FormEvento;