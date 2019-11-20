import React, { Component, Fragment } from 'react'
import Select from 'react-select'
// import Animated from 'react-select/lib/animated'

class ContenidoPedido extends Component {
  state={
    productos: '',
  }
  handleOnChange = (productos) => {
    this.setState({
      productos
    })
    // console.log(productos)
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
        />
      </Fragment>
    )
  }
}
export default ContenidoPedido