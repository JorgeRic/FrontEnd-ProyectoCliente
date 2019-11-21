import React, { Fragment } from 'react'
import Producto from './Producto'

function Resumen(props) {
  const productos = props.productos
  if(productos.length === 0) return null
  // console.log(productos)
  return (
    <Fragment>
      <h2 className="text-center my-5">resumen y Cantidades</h2>
      <table className="table">
        <thead className="bg-success text-light">
          <tr className="font-weight-bold">
            <th>Producto</th>
            <th>Precio</th>
            <th>Inventario</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody className="">
          {productos.map((producto, index) => (
              <Producto 
                key = {producto.id}
                id= {producto.id}
                producto= {producto}
                index = {index}
                actualizarCantidad = {props.actualizarCantidad}
                eliminarProducto = {props.eliminarProducto}
              />
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

export default Resumen
