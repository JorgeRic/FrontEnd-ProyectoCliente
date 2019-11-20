import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CLIENTES_QUERY } from '../../queries'
import { ELIMINAR_CLIENTE } from '../../mutations'
import Paginador from '../Paginador'
import TodoOK from '../Alertas/TodoOK'

class Clientes extends Component {

  limite = 5;
  state = {
    paginador: {
      offset: 0,
      actual: 1
    },
    alerta:{
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
  render(){
    const { alerta: {mostrar, mensaje} } = this.state;
    const alerta = (mostrar) ? <TodoOK mensaje= {mensaje}/>: '';
    return(
      <Query query={CLIENTES_QUERY} pollInterval={500} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
        {({ loading, error, data, startPolling, stopPolling }) =>{
          if(loading) return "Cargando..";
          if(error) return `Error: ${error.message}`;

          return(
            <Fragment>
              <h2 className="text-center">Listado Clientes</h2>
              {alerta}
              <ul className="list-group mt-4">
                {data.getClientes.map((cliente)=>{
                  const { id } = cliente;
                  return(
                    <li key={cliente.id} className="list-group-item">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                          {cliente.nombre} {cliente.apellido} - 
                          {cliente.empresa}
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                          <Link 
                            to={`/pedidos/nuevo/${id}`}
                            className="btn btn-warning d-block d-md-inline-block mr-2"
                          >
                            Nuevo Pedido
                          </Link>
                          <Mutation 
                              mutation={ELIMINAR_CLIENTE}
                              onCompleted={(data) => {
                                this.setState({
                                  alerta:{
                                    mostrar: true,
                                    mensaje: data.eliminarCliente
                                  }
                                }, () =>{
                                  setTimeout(()=>{
                                    this.setState({
                                      alerta:{
                                        mostrar: false,
                                        mensaje: ''
                                      }
                                    })
                                  }, 2000)
                                })
                              }}
                          >
                            {eliminarCliente => (
                              <button 
                                type="button" 
                                className="btn btn-danger d-block d-md-inline-block mr-2"
                                onClick={ () =>{
                                  if(window.confirm(`Seguro que deseas eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`)){
                                    eliminarCliente({
                                      variables: {id}
                                    })
                                  }
                                }}
                              >
                                Eliminar Cliente
                              </button>
                              )
                            }

                          </Mutation>
                          <Link to={`/clientes/editar/${cliente.id}`} className="btn btn-success d-block d-md-inline-block">
                            Editar Cliente
                          </Link>

                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Paginador
              actual = {this.state.paginador.actual}
              total={data.totalClientes}
              limite = {this.limite}
              paginaAnterior = {this.paginaAnterior}
              paginaSiguiente = {this.paginaSiguiente}
              />
            </Fragment>
          )
        }}
      </Query>
  )
}
}

export default Clientes
