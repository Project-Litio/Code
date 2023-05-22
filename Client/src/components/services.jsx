import React from 'react'
import './style.css'
import Card from './card'

const Services = () => {
  return (
    <div className='hero back2 align-items-center' >
      <div className=" flex-column  text-center space ">
        <div className="row exp align-items-center w-100">
          <div className="col us">
            <div className='mx-5 '>
              Experimienta los beneficios de adquirir tu vehículo con <font color="Red"> nosotros </font> .
            </div>
            
          </div>
          <div className="col">
            <div className='row '>
              <div className="col">
                <Card/>
              </div>
              <div className="col">
                <Card/>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="row exp align-items-center w-100">
          <div className="col">
            <Card/>
          </div>
          <div className="col">
            <Card/>
          </div>
          <div className="col">
            <Card/>
          </div>
          <div className="col">
            <Card/>
          </div>
        </div>  
        
      </div>      
    </div>
  )
}

export default Services