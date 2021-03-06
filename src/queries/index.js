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
query getProductos($limite: Int, $offset: Int, $stock: Boolean){
    getProductos(limite: $limite, offset: $offset, stock: $stock){
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
//Pedidos
export const OBTENER_PEDIDOS =  gql`
query obtenerPedidos($cliente: String){
  obtenerPedidos(cliente: $cliente){
    id
    total
    fecha
    estado
    pedido{
      id
      cantidad
    }
  }
}
`
//Graficas
export const TOP_CLIENTES = gql`
query topClientes{
  topClientes{
    total
    cliente{
      nombre
    }
  }
}
`
//Usuarios
export const USUARIO_ACTUAL = gql`
query obtenerUsuario{
  obtenerUsuario{
    usuario
    id
    nombre
    rol
  }
}

`

