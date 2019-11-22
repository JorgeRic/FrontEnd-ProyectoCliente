import React, { Fragment }from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphqlErrors}) => {
    console.log('graphErrors', graphqlErrors)
    console.log('networkError', networkError)
  }
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
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
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
