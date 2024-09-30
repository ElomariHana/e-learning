import React from 'react'
import { MdOutlineSearchOff } from "react-icons/md";

import './style.css'

const NodataFound = () => {
  return (
    <div className='no__data__found'>
      <MdOutlineSearchOff style={{ color: '#17bf9e', fontSize: '20px', marginRight: '5px'}}/>
      <p>No Data Found</p>
    </div>
  )
}

export default NodataFound
