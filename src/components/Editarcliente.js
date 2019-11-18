import React, { Component, Fragment } from 'react'
import { CLIENTE_QUERY } from '../queries/index'
import { Query } from 'react-apollo'
import { FormularioEditarCliente } from './FormularioEditarCliente'

class Editarcliente extends Component {
  state={

  }
  render() {
    const { id } = this.props.match.params
    console.log(id)
    return (
      <Fragment>
          <h2 className="text-center">Editar Cliente</h2>
          <Query query={ CLIENTE_QUERY } variables={{id}}>
            {({ loading, error, data }) => {
              if(loading) return 'Cargando....'
              if(error) return `Error: ${error.message}`
            }}
          </Query>
      </Fragment>
    )
  }
}
export default Editarcliente