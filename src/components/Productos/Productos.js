import React, { Component, Fragment} from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { ELIMINAR_PRODUCTO } from'../../mutations';
import { PRODUCTOS_QUERY } from '../../queries'
import TodoOK from '../Alertas/TodoOK'
import Paginador from '../Paginador'
import { NoUnusedFragmentsRule } from 'graphql';

class Productos extends Component {
  limite = 5;
  state= {
    paginador: {
      offset: 0,
      actual: 1
    },
    alerta: {
      mostrar: false,
      mensaje: ''

    }
  }
  
  paginaAnterior = () =>{
    this.setState({
      paginador: {
        offset: this.state.paginador.offset - this.limite,
        actual: this.state.paginador.actual - 1
      }
    })
  }
  paginaSiguiente = () =>{
    this.setState({
      paginador: {
        offset: this.state.paginador.offset + this.limite,
        actual: this.state.paginador.actual + 1
      }
    })
  }
  render() {
    const { alerta: {mostrar, mensaje} } = this.state;
    const alerta = (mostrar) ? <TodoOK mensaje= {mensaje}/>: '';
    return (
      <Fragment>
        <h1 className="text-center mb-5">Productos</h1>
        {alerta}
        <Query query={ PRODUCTOS_QUERY } pollInterval={500} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
        {({ loading, error, data, startPolling, stopPolling }) =>{
            if(loading) return "Cargando..";
            if(error) return `Error: ${error.message}`;
            console.log(data)
            return(
              <Fragment>
              <table className="table">
                <thead>
                  <tr className="table-primary">
                    <th scope col="col">Nombre</th>
                    <th scope col="col">Precio</th>
                    <th scope col="col">Stock</th>
                    <th scope col="col">Eliminar</th>
                    <th scope col="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getProductos.map( producto =>{
                    const {id} = producto
                      return(
                        <tr key={id}>
                          <td>{producto.nombre}</td>
                          <td>{producto.precio}</td>
                          <td>{producto.stock}</td>
                          <td>
                            <Mutation 
                                mutation={ELIMINAR_PRODUCTO}
                                onCompleted={(data) => {
                                  this.setState({
                                    alerta: {
                                      mostrar: true,
                                      mensaje: data.eliminarProducto
                                    }
                                  }, () => {
                                    setTimeout(()=>{
                                      this.setState({
                                        alerta: {
                                          mostrar: false,
                                          mensaje: ''
                                        }
                                      })
                                    }, 2000)
                                  })
                                  
                                }}
                            >

                              {eliminarProducto=> (
                                <button 
                                  className="btn btn-danger" 
                                  type="button"
                                  onClick={ () =>{
                                    if(window.confirm(`Seguro que deseas eliminar el producto ${producto.nombre} ?`)){
                                      eliminarProducto({
                                        variables: {id}
                                      })
                                    }
                                  }}       
                                >
                                    Eliminar
                                </button>                
                                )
                              }

                            </Mutation>
                          </td>
                          <td>
                          <Link to={`/productos/editar/${id}`} className="btn btn-success ">
                            Editar Producto
                          </Link>
                          </td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
              <Paginador
                actual = {this.state.paginador.actual}
                total={data.totalProductos}
                limite = {this.limite}
                paginaAnterior = {this.paginaAnterior}
                paginaSiguiente = {this.paginaSiguiente}
              />
              </Fragment>
            )
          
          }}
        </Query>
      </Fragment>
    )
  }
}
export default Productos
