import React, {  Fragment }from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Clientes from './components/Clientes'
import NuevoCliente from './components/NuevoCliente'
import EditarCliente from './components/EditarCliente'

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
                <Route exact path='/' component={Clientes}/>
                <Route exact path='/cliente/nuevo' component={NuevoCliente}/>
                <Route exact path='/cliente/editar/:id' component={EditarCliente}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
