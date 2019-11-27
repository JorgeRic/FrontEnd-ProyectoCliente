
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import CerrarSession from './CerrarSession'

const Header = ({session}) => {
  // console.log(session)
  let barra = (session.obtenerUsuario) ? <NavegacionAtentificado /> : <NavegacionNoAutentificado/>
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
          <div className="container">
              {barra}
          </div>
      </nav>
    )
};
const NavegacionNoAutentificado= () => {
  return(
    <h3 to='/' className="navbar-brand text-light font-weight-bold">
      CRM
    </h3>
  )
}
const NavegacionAtentificado = () => {
  return(
  <Fragment>
    <Link to='/' className="navbar-brand text-light font-weight-bold">
      CRM
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navegacion">
        <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item dropdown mr-2 mb-1">
                <button
                  className="nav-link btn btn-success dropdown-toggle btn-block"
                  data-toggle="dropdown"
                >
                  Clientes
                </button>
                  <div className="dropdown-menu" aria-labelledby="navegation">
                    <Link to='/clientes' className="dropdown-item">
                      Clientes
                    </Link>
                    <Link to='/clientes/nuevo' className="dropdown-item">
                      Nuevo Cliente
                    </Link>
                  </div>      
            </li>
            <li className="nav-item dropdown mr-2">
                <button
                  className="nav-link btn btn-success dropdown-toggle btn-block"
                  data-toggle="dropdown"
                >
                  Productos
                </button>
                  <div className="dropdown-menu" aria-labelledby="navegation">
                    <Link to='/productos' className="dropdown-item">
                      Productos
                    </Link>
                    <Link to='/productos/nuevo' className="dropdown-item">
                      Nuevo Producto
                    </Link>
                  </div>
            </li>
            <CerrarSession />
        </ul>
    </div>
  </Fragment>
  )
}

export default Header;