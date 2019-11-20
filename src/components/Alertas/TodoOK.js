import React from 'react'

const TodoOK = ({mensaje}) => {
  return (
    <div>
      <p className="alert alert-success py-3 text-center my-3">{mensaje}</p>
    </div>
  )
}

export default TodoOK
