import React from 'react'
import { Route, Switch } from 'react-router';
import Login from '../pages/Auth/Login';
import FormEvento from '../pages/Evento/FormEvento';
import ListaEventos from '../pages/Evento/ListaEvento';
import Register from '../pages/Auth/Register';
import DetalleEventos from '../pages/Evento/DetalleEvento';

const RouterConfig = () => {
    return (
        <Switch>
            <Route path="/eventodetalle/:id" exact>
                <DetalleEventos/>
            </Route>

            <Route path="/login" exact>
                <Login />
            </Route>

            <Route path="/register" exact>
                <Register />
            </Route>

            <Route path="/evento" exact>
                <ListaEventos/>
            </Route>

            <Route path="/evento/create">
                <FormEvento />
            </Route>

            <Route path="/evento/edit/:id" component={FormEvento}>
            </Route>

            <Route path="/">
                <Login />
            </Route>

        </Switch>
    );
}

export default RouterConfig;