import React from 'react'

const Error = ({error}) => {

if(error.message){
  error = error.message
}
    return (
      <div>
        <p className="alert alert-danger py-3 text-center my-3">{error}</p>
      </div>
    )
  }


export default Error



