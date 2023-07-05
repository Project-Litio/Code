import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import MaskedInput from 'react-text-mask'


const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
    console.log(state);
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  

  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form>


          <div className="form-group mb-3 mt-4">
            <MaskedInput
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <MaskedInput
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                mask={[/\d/, /\d/,'/',/\d/, /\d/]}
                required
                onChange={handleInputChange}
              onFocus={handleInputFocus}
              />
            </div>
          
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                maxLength="4"
                minLength="3"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
      </form>
    </div>
  );
}

export default PaymentForm;

