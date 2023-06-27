import React from 'react'
import './style.css'
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const [t]=useTranslation("global");
  return (
    <div className="hero back1 d-flex align-items-center" >
        <div className='align-middle cont '>
          <h1>{t("Hero.banner")}</h1>
          <h2>{t("Hero.sub_banner")}</h2>
        </div>      
        
    </div>
  )
}

export default Hero