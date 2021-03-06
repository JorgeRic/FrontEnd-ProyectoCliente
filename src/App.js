import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/Layout/Header'

import Clientes from './components/Clientes/Clientes'
import NuevoCliente from './components/Clientes/NuevoCliente'
import EditarCliente from './components/Clientes/EditarCliente'
import ClienteDetail from './components/Clientes/ClienteDetail'

import NuevoProducto from './components/Productos/NuevoProducto'
import Productos from './components/Productos/Productos'
import EditarProducto from './components/Productos/EditarProducto'

import NuevoPedido from './components/Pedidos/NuevoPedido'
import PedidosCliente from './components/Pedidos/PedidosCliente'

import Panel from './components/Panel/Panel'

import Registro from './components/Auth/Registro'
import Login from './components/Auth/Login'

import Session from './components/Session'

const App = ({refetch, session}) => {
  console.log(session)
  const { obtenerUsuario } = session

  const mensaje = (obtenerUsuario) ? `Bienvenido ${obtenerUsuario.nombre}` : <Redirect to="/login"/>

    return (
        
          <Router>
            <Fragment>
            {/* Para que solo se muestre a los usuarios autentificados */}
              <Header session={session}/>
              <div className="container">
                <h4 className="text-right">{mensaje}</h4>
                <Switch>
                  <Route exact path='/clientes' component={Clientes}/>
                  <Route exact path='/clientes/nuevo' component={NuevoCliente}/>
                  <Route exact path='/clientes/editar/:id' component={EditarCliente}/>
                  <Route exact path='/clientes/:id' component={ClienteDetail}/>
                  <Route exact path='/productos' component={Productos}/>
                  <Route exact path='/productos/nuevo' component={NuevoProducto}/>
                  <Route exact path='/productos/editar/:id' component={EditarProducto}/>
                  <Route exact path='/pedidos/nuevo/:id' component={NuevoPedido}/>
                  <Route exact path='/pedidos/:id' component={PedidosCliente}/>
                  <Route exact path='/panel' component={Panel}/>
                  <Route exact path='/registro' component={Registro} />
                  <Route exact path='/login' render = {()=> <Login refetch = {refetch}/>}/>
                </Switch>
              </div>
            </Fragment>
          </Router>

    )
 }

const RootSession = Session(App)
export { RootSession }