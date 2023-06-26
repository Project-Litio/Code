import React from 'react'
import '../style.css'
import { motion } from 'framer-motion'

const CardI = ({title,price,imageSource}) => {
  return (
    <motion.div layout className="cardI card bg-transparent  border-transparent my-2 py-2 px-2" >
      <img src={imageSource} className="card-img-top" alt="Card"></img>
      <motion.div className="card-body ">
        <h5 className="card-title">{title} </h5>
        <p className="card-text">{new Intl.NumberFormat('en-DE').format(price)} COP </p>
      </motion.div>
  </motion.div>
  )
}

export default CardI