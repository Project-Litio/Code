import React from 'react'
import './style.css'
import Card from './card'

const cards = [
  {
    id:1,
    title: 'Seguro',
    test: 'example'
  },
  {
    id:2,
    title: 'Amplia Selección',
    test: 'example'
  },
  {
    id:3,
    title: 'Precios Justos',
    test: 'example'
  },
  {
    id:4,
    title: 'Financiamiento Flexible',
    test: 'example'
  },
  {
    id:5,
    title: 'En Manos De Expertos',
    test: 'example'
  },
  {
    id:6,
    title: 'Buen Servicio Postventa',
    test: 'example'
  }
]

const Services = () => {
  return (
    <div className='serv back2 align-items-center' >
      <div className=" flex-column  text-center space  ">
        <div className="  row exp align-items-center w-100">
          <div className="col us">
            <div className='mx-5 '>
              Experimienta los beneficios de adquirir tu vehículo con <font color="Red"> nosotros </font> .
            </div>
            
          </div>
          <div className="col">
            <div className='row '>
              <div className="col">
                <Card title={cards[0].title} text={cards[0].test} />
              </div>
              <div className="col">
              <Card title={cards[1].title} text={cards[1].test} />
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="row exp align-items-center w-100">
          <div className="col">
          <Card title={cards[2].title} text={cards[2].test} />
          </div>
          <div className="col">
          <Card title={cards[3].title} text={cards[3].test} />
          </div>
          <div className="col">
          <Card title={cards[4].title} text={cards[4].test} />
          </div>
          <div className="col">
          <Card title={cards[5].title} text={cards[5].test} />
          </div>
        </div>  
        
      </div>      
    </div>
  )
}

export default Services