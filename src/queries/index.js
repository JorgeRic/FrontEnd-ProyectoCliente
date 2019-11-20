import gql from 'graphql-tag'

export const CLIENTES_QUERY = gql`
  query getClientes ($limite: Int, $offset: Int){
    getClientes(limite: $limite, offset: $offset){
      id
      nombre
      apellido
      empresa
    }
    totalClientes
  }`

export const CLIENTE_QUERY = gql`
query ConsultarCliente($id:ID){
  getCliente(id: $id){
    id
    nombre
    apellido
    empresa
    edad
    tipo
    emails {
      email
    }
  }
}`

export const PRODUCTOS_QUERY = gql `
query getProductos($limite: Int, $offset: Int){
    getProductos(limite: $limite, offset: $offset){
      id
      nombre
      precio
      stock
    }
    totalProductos
  }
`
export const GET_PRODUCTO = gql`
query getProducto($id: ID!){
  getProducto(id: $id){
    nombre
    precio
    stock
  }
}
`