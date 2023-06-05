import React, { useRef, useState } from 'react'
import logo from '../assets/LogoFFFFFF.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import ReCAPTCHA from "react-google-recaptcha"
import {getCustomers,login} from '../api/login.api'

function LoginForm() {
  const {register, handleSubmit} = useForm();
  const onSubmit = handleSubmit(async data => {await console.log(login(data))})

  const [captchaValido, cambiarCaptchaValido] = useState(null);
  const captcha = useRef(null);
  const onChange = () => {
    if(captcha.current.getValue()){
      cambiarCaptchaValido(true);
    }
  }

  const caducated = () => { 
    cambiarCaptchaValido(false);
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className='wrapper'>
      <div className='triangle'></div>
      <div className='login rounded'>
      <Link className="nav-link" to='/'>  
          <button type='button' className='return'> <i className="fa fa-chevron-left"></i> </button>
        </Link>  
        <div className='logoContainer'>
          <img src={logo} className='logoImage'/>
        </div>
        <form onSubmit={onSubmit}>
          <h2 className='title'>Inicio de sesión</h2>
          <div className='form-group mb-2'>
            <label htmlFor='ID' className='form-label'>Ingresa tu correo electrónico</label>
            <input type="text" className='form-control' {...register("email", {required: true})}></input>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='password' className='form-label'>Ingresa tu Contraseña </label>
            <div className='passcode'> 
              <input type={passwordShown ? "text" : "password"} className='form-control' id='customform' {...register("password", {required: true})}></input>
              <button onClick={togglePassword}>
                {!passwordShown && <i class="fa fa-eye"></i>}
                {passwordShown && <i class="fa fa-eye-slash"></i>}
              </button>
            </div>
          </div>
        <div className="captcha">
          <ReCAPTCHA
              sitekey="6LfbAWYmAAAAAIcvGyc_u-_dV9WKtiTnUE4dfAzU"
              ref={captcha}
              onChange={onChange}
              onExpired={caducated}
            />
         </div>
         {captchaValido &&
          <button type='button' className='btn btn-success mt-5'>Entrar</button>
         }
        </form>
      </div>
    </div></>
  )
}

export default LoginForm