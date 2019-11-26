import React, { Fragment }  from 'react'
import { TOP_CLIENTES } from '../../queries'
import { Query } from 'react-apollo'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Clientes = () => {
  return (
    <Fragment>
      
      <Query 
        query={TOP_CLIENTES}>
          {({loading, error, data})=> {
            if(loading) return 'Cargando ...'
            if(error) return `Error ${error.message}`
            let topClienteGrafica = [];
            data.topClientes.map((pedido, index)=> {
              topClienteGrafica[index] = {
                ...pedido.cliente[0],
                total: pedido.total
              }
            })
            // console.log(topClienteGrafica)
            return(
              <BarChart width={600} height={300} data={topClienteGrafica}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="nombre"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            )
          }}

        </Query>
    </Fragment>

  )
}

export default Clientes
