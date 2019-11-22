import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_PRODUCTO  } from '../../queries'
import { ACTUALIZAR_ESTADO } from '../../mutations'
import ResumenProducto from './ResumenProducto'

function Pedido(props) {
  const pedido = props.pedido
  const fecha = new Date(Number(pedido.fecha))
  const estado = pedido.estado
  let clase;
  if(estado === 'CANCELADO'){
    clase = 'border-danger'
  }else if(estado === 'PENDIENTE'){
    clase = 'border-light'
  }else {
    clase = 'border-success'
  }
  return (
    <Fragment>
      <div className="col-md-4">
        <div className={`card mb-3 ${clase}`} >
          <div className="card-body">
            <p className="card-text font-weight-bold ">Estado:
              <Mutation 
                mutation={ACTUALIZAR_ESTADO}
              >
                {actualizarEstado=> (
                  <select 
                    className="form-control my-3"
                    value = {pedido.estado}
                    onChange={e=>{
                      const input = {
                        id: pedido.id,
                        fecha: pedido.fecha,
                        total: pedido.total,
                        cliente: props.cliente,
                        estado: e.target.value
                      }
                      actualizarEstado({
                        variables: {input}
                      })
                    }}
                  >
                          <option value="PENDIENTE">PENDIENTE</option>
                          <option value="COMPLETADO">COMPLETADO</option>
                          <option value="CANCELADO">CANCELADO</option>
                  </select>
                )}
              </Mutation>
            </p> 
            <p className="card-text font-weight-bold">Pedido ID:
                <span className="font-weight-normal"> {pedido.id}</span>
            </p> 
            <p className="card-text font-weight-bold">Fecha Pedido: 
                <span className="font-weight-normal"> {fecha.toLocaleDateString()}</span>
            </p>
            <p className="card-text font-weight-bold">Total: 
                <span className="font-weight-normal"> {pedido.total} $</span>
            </p>

          <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
            {pedido.pedido.map((producto, index)  => {
              const {id} = producto
              // console.log(producto, 'hola')
              return (
                <Query
                  key={pedido.id + index}
                  query = { GET_PRODUCTO } 
                  variables = {{id}}
                >
                  {({loading, error, data})=> {
                    if(loading) return "Cargando ..."
                    if(error) return `Error ${error.message}`
                    // console.log(data)
                  return (
                    <ResumenProducto
                      producto = {data.getProducto}
                      cantidad = {producto.cantidad}
                      key = {producto.id}
                    />
                  )
                  }}
                </Query>
              )
            })}
          </div>
        </div>
      </div>
    </Fragment>
      
   
  )
}

export default Pedido
