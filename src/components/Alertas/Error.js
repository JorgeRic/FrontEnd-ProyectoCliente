import React from 'react'

function Error({error}) {
  return (
    <div>
      <p className="alert alert-danger py-3 text-center my-3">{error}</p>
    </div>
  )
}

export default Error



