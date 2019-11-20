import React, { Component, Fragment} from 'react'
import { NUEVO_PRODUCTO } from '../../mutations/index'
import { Mutation } from 'react-apollo'

const inicialState={
  nombre: '',
  precio: '',
  stock: ''
}
class NuevoProducto extends Component {
  state={
    ...inicialState
  }

  limpiarState = () => {
    this.setState({
      ...inicialState
    })
  }

  actualizarState = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  crearNuevoProducto = (event, nuevoProducto) => {
    event.preventDefault()
    nuevoProducto().then(data => {
      this.limpiarState()
      this.props.history.push('/productos')
    })
  }

  validarForm= () =>{
    const { nombre, precio, stock } = this.state;
    const noValido = !nombre || !precio || !stock
    return noValido;
  }

  render() {
    const { nombre, precio, stock } = this.state
    const input = {
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    }
    
    return (
  <Fragment>
    <div>
    <h2 className="text-center">Crear Nuevo Producto</h2>
        <div className="row justity-content-center">
        <Mutation 
          mutation={NUEVO_PRODUCTO}
          variables={{input}}
        >
          {(nuevoProducto, {loading, error, data}) => {
            return(

              <form 
              className="col-md-8"
              onSubmit = {event => this.crearNuevoProducto(event, nuevoProducto)}
              >
          <div className="form-group">
              <label>Nombre:</label>
              <input 
                  type="text"
                  name="nombre" 
                  className="form-control" 
                  placeholder="Nombre del Producto"
                  onChange={this.actualizarState}
                  />
          </div>
          <div className="form-group">
              <label>Precio:</label>
              <div className="input-group">
                  <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                  </div>
                  <input 
                      type="number" 
                      name="precio" 
                      className="form-control" 
                      placeholder="Precio del Producto"
                      onChange={this.actualizarState}
                      />
              </div>
          </div>
          <div className="form-group">
              <label>Stock:</label>
              <input 
                  type="number" 
                  name="stock" 
                  className="form-control" 
                  placeholder="stock del Producto"
                  onChange={this.actualizarState} 
                  />
          </div>
          <button 
              disabled={this.validarForm()}
              type="submit" 
              className="btn btn-success float-right">
                  Crear Producto
          </button>
      </form>
                  )
                }}
        </Mutation>
    </div>
    </div>
  </Fragment>
        
    )
  }
}
export default NuevoProducto