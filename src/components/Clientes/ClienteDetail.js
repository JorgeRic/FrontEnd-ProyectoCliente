import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { CLIENTE_QUERY } from '../../queries'
import { Link } from 'react-router-dom'

function ClienteDetail(props) {
  console.log(props)
  const id = props.match.params.id

  return (
    <Fragment>
        <h2 className="text-center">Datos del Cliente</h2>
      <Query query={ CLIENTE_QUERY } variables={{id}} pollInterval={500}>
          {({ loading, error, data, startPolling, stopPolling }) => {
          if(loading) return 'Cargando....';
          if(error) return `Error: ${error.message}`
          console.log(data.getCliente, 'hola' )
          const { nombre, apellido, edad, emails, empresa, tipo} = data.getCliente
          return(
              <ul className="list-unstyled my-5">
                <li className="border font-weight-bold p-2">Nombre:
                  <span className="font-weight-normal"> {nombre}</span>
                </li>
                <li className="border font-weight-bold p-2">Apellido:
                  <span className="font-weight-normal"> {apellido}</span>
                </li>
                <li className="border font-weight-bold p-2">Empresa:
                  <span className="font-weight-normal"> {empresa}</span>
                </li>
                <li className="border font-weight-bold p-2">Email:
                  <span className="font-weight-normal"> {emails.map(email=><li>{email.email}</li>)}</span>
                </li>
                <li className="border font-weight-bold p-2">Tipo Cliente:
                  <span className="font-weight-normal"> {tipo}</span>
                </li>
                <li className="border font-weight-bold p-2">Edad:
                  <span className="font-weight-normal"> {edad}</span>
                </li> 
              </ul>
                ) 
              }}
      </Query>
        <Link to={'/clientes'} className="btn btn-success d-block d-md-inline-block">
          Volver al Listado de Clientes
        </Link>
    </Fragment>
  )
}

export default ClienteDetail
