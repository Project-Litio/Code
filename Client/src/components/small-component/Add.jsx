import React from 'react'
import '../style.css'
import { useTranslation } from 'react-i18next';

const Add = () => {
  const [t]=useTranslation("global");
  return (
    <div className='container'>
      <div className=" row justify-content-between text-left px-3 py-5 w-100">

      
      {
            t("Add",{returnObjects:true}).map((card,i)=>(
              <div className="col-12 col-sm-6 col-md-3 cardI text-center py-2">
                <div className="div">
                  <h5>{card.title}</h5>
                  <p>{card.text}</p>
                </div>
              </div>
            ))
      }
    </div>
    </div>
  )
}

export default Add