import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Error from '../Alertas/Error';
import { Mutation } from 'react-apollo';
import { AUTENTIFICAR_USUARIO } from '../../mutations'

const initialState = {
    usuario : '',
    password: ''
}

class Login extends Component {
  state = {
      ...initialState
  }

  actualizarState = e => {
      const { name, value } = e.target;
      this.setState({
        [name] : value
    })
  }

  limpiarState = () => {
        this.setState({...initialState});
  }

  iniciarSesion = (e, usuarioAutentificar) => {
      e.preventDefault();
      usuarioAutentificar().then(async({data})=> {
        // console.log(data.autentificarUsuario.token)
        //Almacenamos información en le local storage
        localStorage.setItem('token', data.autentificarUsuario.token)
        //ejecutar el query cuando se inicie sesion
        await this.props.refetch()
        //limpiar state
        this.limpiarState()
        setTimeout(()=>{
          this.props.history.push('/panel')
        }, 2000)
      })
    }


    validarForm = () => {
      const {usuario, password} = this.state;
      const noValido = !usuario || !password;
      return noValido;
    }
  render() { 

    const {usuario, password} = this.state;
  
    return ( 
      <Fragment>
          <h1 className="text-center mb-5">Iniciar Sesión</h1>
        <div className="row  justify-content-center">

          <Mutation 
              mutation={ AUTENTIFICAR_USUARIO }
              variables={{usuario, password}}    
          >
          {( usuarioAutentificar, {loading, error, data}) => {
              return (
                  <form 
                      onSubmit={ e => this.iniciarSesion(e, usuarioAutentificar) } 
                      className="col-md-8"
                  >
                  {error && <Error error={error} />}
                  <div className="form-group">
                      <label>Usuario</label>
                      <input 
                          onChange={this.actualizarState} 
                          value={usuario}
                          type="text" 
                          name="usuario" 
                          className="form-control" 
                          placeholder="Nombre Usuario" 
                      />
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input 
                          onChange={this.actualizarState} 
                          value={password}
                          type="password" 
                          name="password" 
                          className="form-control" 
                          placeholder="Password"
                      />
                  </div>

                  <button 
                      disabled={ 
                          loading || this.validarForm()
                      }
                      type="submit" 
                      className="btn btn-success float-right">
                          Iniciar Sesión
                  </button>
                  
              </form>
              )     
          }}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}
 
export default withRouter(Login);