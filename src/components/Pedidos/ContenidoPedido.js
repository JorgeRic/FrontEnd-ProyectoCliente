import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import Resumen from './Resumen'

// import Animated from 'react-select/lib/animated'

class ContenidoPedido extends Component {
  state={
    productos: '',
    total: 0
  }
  handleOnChange = (productos) => {
    this.setState({
      productos
    })
  }

  actualizarTotal = () => {
    const productos = this.state.productos
    if(productos.length === 0){
      this.setState({
        total: 0
      })
      return;
    }
    let nuevoTotal = 0;
    productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))
    this.setState({
      total: nuevoTotal
    })
  }

  actualizarCantidad = (cantidad, index) => {
    // console.log(cantidad)
    const productos = this.state.productos
    productos[index].cantidad = Number(cantidad)
    this.setState({
      productos,
    }, () => {
      this.actualizarTotal()
    })
  }

  eliminarProducto = (id) => {
    const productos = this.state.productos
    const productosRestantes = productos.filter(producto => producto.id !== id)
    this.setState({
      productos: productosRestantes
    }, () => {
      this.actualizarTotal()
    })
  }
  render() {
    return (
      <Fragment>
        <h2 className="text-center mb-2">Seleccionar Articulos</h2>
        <Select 
          options={this.props.productos} 
          //Permite añadir multiples campos
          isMulti = {true}
          //Crea una animación en el select
          // components={Animated()}
          placeholder={'Seleccionar Productos'}
          getOptionValue={(options) => options.id}
          getOptionLabel={(options) => options.nombre}
          onChange={this.handleOnChange}
          value={this.state.productos}
        />
        <Resumen 
        productos = { this.state.productos }
        actualizarCantidad = { this.actualizarCantidad }
        eliminarProducto = { this.eliminarProducto }
        />
        <p className="font-weight-bold float-right mt-3">Total:
          <span className="font-weigth-normal">{this.state.total} $</span>
        </p>
      </Fragment>
    )
  }
}
export default ContenidoPedido