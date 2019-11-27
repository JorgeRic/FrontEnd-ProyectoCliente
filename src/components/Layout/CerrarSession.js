import React, { Fragment } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const cerrarSessionUsuario = (cliente, history) => {
  localStorage.removeItem('token', '');
  cliente.resetStore();
  history.push('/login')
}

function CerrarSession({history}) {
  return(
  <ApolloConsumer>
    { cliente => {
      return (
        <Fragment>
          <button
            type="button"
            className="btn btn-light mt-2 mt-md-0 ml-md-2"
            onClick = {() => cerrarSessionUsuario(cliente, history)}
          >
            Cerrar Session
          </button>
        </Fragment>
      )
    }
  }
  </ApolloConsumer>
  )
}

export default withRouter (CerrarSession)
