import React from 'react'
import './style.css'
import Card from './card'
import { useTranslation } from 'react-i18next';

const cards=[
  {"id":1,
      "title":"Seguro",
      "text":"Contamos con una plataforma de pago segura, certificada por los mejores. Tu información siempre estará a salvo."
      }
]

const Services = () => {
  const [t]=useTranslation("global");
  
  return (
    <div className='serv back2 align-items-center ' >        
        
        <div className="row exp  align-items-center w-100 px-0 us pt-4">
          <div className=" col-12  ">
            <div className='mx-5 '>
              {t("Services.banner")}
            </div>
            
          </div>
          
        </div>
        <div className="row justify-content-between   align-items-center w-100 px-4 py-5">
          {
            t("Services.cards",{returnObjects:true}).map(card=>(
              <div key={card.id} className="col-12 col-sm-6 col-md-4 py-2 ">
                <Card title={card.title} text={card.text} />
              </div>
            ))
          }
          
        </div>  
    </div>
  )
}

export default Services