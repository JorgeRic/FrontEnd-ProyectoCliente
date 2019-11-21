import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { NUEVO_PEDIDO } from '../../mutations'
import { withRouter } from 'react-router-dom'


const validarPedido = (props) => {
  let noValido = !props.productos || props.total <= 0
  return noValido
}

function GenerarPedido(props) {
  return (
    <Fragment>
      {/* <h2 className="text-center">Generar Pedido</h2> */}
      <Mutation 
        mutation={NUEVO_PEDIDO}
        onCompleted={ () => props.history.push('/clientes')}
      >
      {nuevoPedido => (
        <button
          disabled = {validarPedido(props)}
          type="button"
          className="btn btn-warning mt-4"
          onClick={event => {
            event.preventDefault()
            const productosInput = props.productos.map(({nombre, precio, stock, ...objeto})=> 
            objeto)
            // console.log(productosInput)
            const input={
              pedido: productosInput,
              total: props.total,
              cliente: props.idCliente
            }
            // console.log(input)
            nuevoPedido({
              variables : {input}
            })
          }}
        >Generar Pedido</button>
      )}   
      </Mutation>
    </Fragment>
  )
}
export default withRouter (GenerarPedido)
