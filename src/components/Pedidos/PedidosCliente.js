import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { OBTENER_PEDIDOS } from '../../queries'
import Pedido from './Pedido' 

  const PedidosCliente = (props) => {

    const cliente = props.match.params.id;

    return (
      <Fragment>
        <h2 className="text-center mb-5">Pedidos del Cliente</h2>
        <div className="row">
          <Query 
            query={OBTENER_PEDIDOS}
            variables={{cliente}}
            pollInterval={500}
            >
          {({loading, error, data, startPolling, stopPolling})=> {
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
                // console.log(data)
            return(
              data.obtenerPedidos.map(pedido => (
                <Pedido 
                  key = {pedido.id}
                  pedido = {pedido}
                  cliente = {cliente}
                />
                ))
                )
              }}
          </Query>
        </div>
      </Fragment>
    )
}
export default PedidosCliente
