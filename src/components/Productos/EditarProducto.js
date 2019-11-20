import React, { Component, Fragment } from 'react'
import { PRODUCTO_QUERY } from '../../queries'
import { Query } from 'react-apollo'
import FormularioEditarProducto from './FormularioEditarProducto'


class EditarProductos extends Component {
  state = {
  
  }
  render() {
    return (
      <div>
        {/* <Fragment> */}
          <h2 className="text-center">Editar Producto</h2>
          {/* <div className="row justify-content-center"> */}
            {/* <Query query={ PRODUCTO_QUERY } variables={{id}}>
                {({ loading, error, data, refetch }) => {
                if(loading) return 'Cargando....';
                if(error) return `Error: ${error.message}`
                
                return(
                    <FormularioEditarProducto
                        producto = {data.getProducto}
                        refetch={refetch}
                    />
                        ) 
                    }}
                    
            </Query>
          </div>
      </Fragment> */}
      </div>
    )
  }
}
export default EditarProductos
