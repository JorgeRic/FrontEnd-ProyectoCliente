import React, { Fragment } from 'react'
import Clientes from './Clientes';

function Panel() {
  return (
    <Fragment>
      <h2 className="text-center my-5">Top 10 clientes</h2>
      <Clientes />
    </Fragment>
  )
}

export default Panel
