import React, { useState } from 'react'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {  sesionIniciada } from '../../redux/loginSlice';
//import jwt_decode from "jwt-decode";

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const enviarLogearse = () => {
        history.push('/login');
    }
    const enviarRegister = () => {
        const url = 'http://localhost:4000/api/v1/auth/register';
        const params = {
            name,
            email,
            password
        }
        axios.post(url, params)
            .then(response => {
                console.log('recibido', response.data.token);
                const token = response.data.token;
                
                dispatch(sesionIniciada(token))
                localStorage.setItem('token', token);

                //if (decoded.is_superuser == true || decoded.type_user == 4 || decoded.type_user == 2) {
                //    localStorage.setItem('usuario', decoded.type_user);
                    history.push('/login');
                    alert("Usuario registrado con exito");
                //} else {
                //    history.push('/login');
                //}
            }).catch(error => {
                console.log(error);
            });
    }
    
    return (
        <Row className="mt-5 p-5 bg-secondary rounded">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3 shadow-lg border border-success">

                    <Card.Body>
                        <Card.Title className='d-flex align-items-center justify-content-center mt-3'>Registrarse</Card.Title>

                        <div><label>Name:</label></div>
                        <div><input className="form-control border border-success" type="email" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} /></div>

                        <div><label>Email:</label></div>
                        <div><input className="form-control border border-success" type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} /></div>

                        <div><label>Contraseña:</label></div>
                        <div><input className="form-control border border-success" type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} /></div>

                        <div class="d-flex align-items-center justify-content-center mt-3">
                            <button className="btn btn-primary mt-3" onClick={enviarRegister}>
                                Registrarse
                            </button>
                        </div>

                        <div class="d-flex align-items-center justify-content-center mt-3">
                            <button className="btn btn-danger" onClick={enviarLogearse}>
                                Logearse
                            </button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Register;