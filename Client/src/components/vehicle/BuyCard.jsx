import React, { useState } from "react";
import PaymentForm from "./CreditCar";

const BuyCard = () => {
  return (
    <div className='container py-5' >
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <div>
              <h2>¡Estas a un gran paso de tu decisión!</h2>
              <p>Para adquirir el vehículo, agrega tus datos de pago. Se te enviará un recibo a tu correo y un agente se contactará contigo</p>
          </div>

        </div>
        <div className='col-md-6 col-sm-12'>
          <PaymentForm></PaymentForm>
        </div>

      </div>
    </div>
  )
}

export default BuyCard