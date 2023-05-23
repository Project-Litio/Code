import React from 'react'
import './style.css'
import Card from './card'

const cards = [
  {
    id:1,
    title: 'Seguro',
    test: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, ante ut viverra convallis, libero lorem pulvinar odio, '
  },
  {
    id:2,
    title: 'Amplia Selección',
    test: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, ante ut viverra convallis, libero lorem pulvinar odio, '
  },
  {
    id:3,
    title: 'Precios Justos',
    test: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, ante ut viverra convallis, libero lorem pulvinar odio, '
  },
  {
    id:4,
    title: 'Financiamiento Flexible',
    test: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, ante ut viverra convallis, libero lorem pulvinar odio, '
  },
  {
    id:5,
    title: 'En Manos De Expertos',
    test: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, ante ut viverra convallis, libero lorem pulvinar odio, '
  },
  {
    id:6,
    title: 'Buen Servicio Postventa',
    test: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, ante ut viverra convallis, libero lorem pulvinar odio, '
  }
]

const Services = () => {
  return (
    <div className='serv back2 align-items-center ' >        
        
        <div className="row exp  align-items-center w-100 px-5 ">
          <div className="us col-12  ">
            <div className='mx-5'>
              Experimienta los beneficios de adquirir tu vehículo con <font color="Red"> nosotros</font>.
            </div>
            
          </div>
          
        </div>

        <div className="row justify-content-between   align-items-center w-100 px-5 py-5">
          <div className="col-12 col-sm-6 col-md-4 py-2">
            <Card title={cards[0].title} text={cards[0].test} />
            </div>
            <div className="col-12 col-sm-6 col-md-4  py-2">
              <Card title={cards[1].title} text={cards[1].test} />
            </div>
            <div className="col-12 col-sm-6 col-md-4  py-2">
              <Card title={cards[2].title} text={cards[2].test} />
            </div>
            <div className="col-12 col-sm-6 col-md-4  py-2">
              <Card title={cards[3].title} text={cards[3].test} />
            </div>
            <div className="col-12 col-sm-6 col-md-4  py-2">
              <Card title={cards[4].title} text={cards[4].test} />
            </div>
            <div className="col-12 col-sm-6 col-md-4  py-2">
              <Card title={cards[5].title} text={cards[5].test} />
            </div>
        </div>  
    </div>
  )
}

export default Services