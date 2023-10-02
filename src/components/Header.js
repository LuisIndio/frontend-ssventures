import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sesionCerrada } from '../redux/loginSlice';
import { useHistory } from 'react-router';
const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.login.token);

    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
    }, [token])

    const cerrarSesion = () => {
        dispatch(sesionCerrada());
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">SS Ventures</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {token &&
                        <Nav className="me-auto">
                            <NavDropdown title="Eventos" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/evento">Ver Eventos</Link>
                                <Link className="dropdown-item" to="/evento/create">Crear Evento</Link>
                            </NavDropdown>

                            <button className="btn btn-link" onClick={cerrarSesion}>Cerrar sesión</button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;