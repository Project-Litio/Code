import React from 'react'
import './style.css'
import Card from './card'

const cards = [
  {
    id:1,
    title: 'Seguro',
    test: 'Contamos con una plataforma de pago segura, certificada por los mejores. Tu información siempre estará a salvo. '
  },
  {
    id:2,
    title: 'Amplia Selección',
    test: 'Ofrecemos autos eléctricos de varias marcas y proveedores, con la finalidad de que encuentres uno que se ajuste a tus gustos.'
  },
  {
    id:3,
    title: 'Precios Justos',
    test: '¡Tenemos precios de locura! Si dudas de nosotros, busca uno de nuestros vehículos en otra web y comparas sus precios.'
  },
  {
    id:4,
    title: 'Variedad de opciones de pago',
    test: 'Puedes pagarnos por medio de tarjetas de crédito, débito, o incluso, con cheques, ¿No es eso impresionante?'
  },
  {
    id:5,
    title: 'En Manos De Expertos',
    test: 'Todo nuestro personal está ampliamente capacitado para brindarte la mejor atención. Esta página ha tomado tiempo, apreciala.'
  },
  {
    id:6,
    title: 'Buen Servicio Postventa',
    test: 'Estaremos al tanto de como vas con tu nuevo vehículo, seguramente no tendrás ninguna queja, pero estaremos aquí por si acaso.'
  }
]

const Services = () => {
  return (
    <div className='serv back2 align-items-center ' >        
        
        <div className="row exp  align-items-center w-100 px-0 us pt-4">
          <div className=" col-12  ">
            <div className='mx-5 '>
              Experimienta los beneficios de adquirir tu vehículo con <font color="Red"> nosotros</font>.
            </div>
            
          </div>
          
        </div>

        <div className="row justify-content-between   align-items-center w-100 px-4 py-5">
          <div className="col-12 col-sm-6 col-md-4 py-2 ">
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