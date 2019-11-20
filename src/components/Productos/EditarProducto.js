import React, { Component, Fragment } from 'react'
import { GET_PRODUCTO } from '../../queries'
import { Query } from 'react-apollo'
import FormularioEditarProducto from './FormularioEditarProducto'


class EditarProducto extends Component {
  state = {
  
  }
  render() {
    const {id} = this.props.match.params
    return (
      <Fragment>
        <h1 className="text-center">Editar Producto</h1>
        <div className="row justify-content-center">
            <Query query={ GET_PRODUCTO } variables={{id}}>
                {({ loading, error, data, refetch }) => {
                if(loading) return 'Cargando....';
                if(error) return `Error: ${error.message}`     
                return(
                    <FormularioEditarProducto
                        producto = {data}
                        id={id}
                        refetch={refetch}
                    />
                        ) 
                    }}
                    
            </Query>
          </div>
      </Fragment>
    )
  }
}
export default EditarProducto
