import React from 'react'
import '../style.css'


const CardI = ({title,text,imageSource}) => {
  return (
    <div className="cardI card bg-transparent  border-light my-2 py-2 px-2" >
      <img src={imageSource} className="card-img-top" alt="Card"></img>
    <div className="card-body ">
      <h5 className="card-title">{title} </h5>
      <p className="card-text">{text}</p>
    </div>
</div>
  )
}

export default CardI