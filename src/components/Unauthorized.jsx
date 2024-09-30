import React from 'react'
import { TbFaceIdError } from "react-icons/tb";

function Unauthorized() {
  return (
    <div className='unauthorized__page'>
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <TbFaceIdError style={{ fontSize: '60px' }}/> 
    </div>
  )
}

export default Unauthorized

