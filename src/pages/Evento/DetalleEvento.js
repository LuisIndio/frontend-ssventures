import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const DetalleEventos = (props) => {
    const { id } = useParams()
    const token = useSelector(state => state.login.token)
    //console.log(useParams())

    //const { id } = props.match ? props.match.params : { id: 0 };

    const [detalle, setDetalle] = useState([]);

    useEffect(() => {
        obtenerEvento();
    }, [id]);

    const obtenerEvento = () => {
        axios.get(`http://localhost:4000/api/v1/events/${id}/`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        ).then(response => {
            console.log('response', response.data);
            const objEvento = response.data;

            setDetalle(objEvento);

        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
            }
        });
    }
    return (
        <table className="mt-5 table table border border-success table-hover table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                        <td>{detalle.id}</td>
                        <td>{detalle.name}</td>
                        <td>{detalle.description}</td>
                        <td>{detalle.date}</td>
                
            </tbody>
        </table>

    );
}

export default DetalleEventos;