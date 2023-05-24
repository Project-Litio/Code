import React from 'react'
import './style.css'


const CardI = ({title,text,imageSource}) => {
  return (
    <div className="card text-bg-light my-2 " >
      <img src={imageSource} class="card-img-top" alt="Card"></img>
    <div className="card-body ">
      <h5 className="card-title">{title} </h5>
      <p className="card-text">{text}</p>
    </div>
</div>
  )
}

export default CardI