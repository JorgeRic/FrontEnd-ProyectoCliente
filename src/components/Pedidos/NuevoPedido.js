import React, { Component, Fragment } from 'react'
import DatosCliente from './DatosCliente'
import ContenidoPedido from './ContenidoPedido'
import { Query } from 'react-apollo'
import { PRODUCTOS_QUERY } from'../../queries';

class NuevoPedido extends Component {
  state = {

  }
  render() {
    const { id } = this.props.match.params;
    return (

      <Fragment>
        <h1 className="text-center mb-5">Nuevo pedido</h1>
        <div className="row">
          <div className="col-md-3">
              <DatosCliente
                id={id}
              />
            </div>
            <div className="col-md-9">
              <Query 
                query={ PRODUCTOS_QUERY }
                variables={{stock: true}}
              >
                {({ loading, error, data }) => {
                  if(loading) return (
                    <div className="sk-chase">
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                    </div>
                  )
                  if(error) return `Error ${error.message}`
                 
                  return(
                    <ContenidoPedido
                      productos = {data.getProductos}
                      id={id}
                    />
                  )
                }}

              </Query>
            </div>
          </div>
      </Fragment>


    )
  }
}
export default NuevoPedido