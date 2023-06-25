import React from 'react'
import './style.css'

const Card = ({title,text}) => {
  return ( 
    <div className="card text-bg-dark  " >
      <div className="card-body ">
        <h5 className="card-title">{title} </h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  )
}


export default Card