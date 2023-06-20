import React, { useRef, useState } from 'react'
import logo from '../assets/LogoFFFFFF.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import ReCAPTCHA from "react-google-recaptcha"
import { useNavigate } from 'react-router-dom';
import {getCustomers,login, otpLogin} from '../api/login.api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';

function LoginForm() {
  const navigateTo = useNavigate();
  const notify = () => toast("¡Credenciales incorrectas!");
  const notifyCode = () => toast("¡Codigo incorrecto!");

  const [segundoPaso, cambiarPaso] = useState(null);
  const toggleFirst = () => {
    cambiarPaso(false);
    window.location.reload(false);
  }

  const toggleSecond = () => {
    cambiarPaso(true);
  }

  const getRandomPin = (chars, len)=>[...Array(len)].map(
    (i)=>chars[Math.floor(Math.random()*chars.length)]
 ).join('');

  const authState = useSelector(state => state.auth);
  console.log(authState);

  const {register, handleSubmit} = useForm();
  const [coderesult, setCode] = useState(null);
  const [correo, setCorreo] = useState(null);
  const onSubmit = handleSubmit(async data => {
    try {
      const result = await login(data);
      if(!isNaN(+result.data.data)){
        setCorreo(data.email);
        const resultEmail = await otpLogin({email: data.email, code: getRandomPin('0123456789', 4)});
        setCode(resultEmail.data.detail)
        toggleSecond();
      } else {
        notify();
      }
    } catch (error) {
      console.error(error);
    }
  });

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

  const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

  const checkCode = () => {
    if(otp.join("") == coderesult){
      navigateTo('/dashboard')
    } else {
      notifyCode();
    }
  }

  return (
    <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <ToastContainer />
    <div className='wrapper'>
      <div className='triangle'></div>
      {!segundoPaso &&
        <div className='login rounded'>
        <Link className="nav-link" to='/'>  
            <button type='button' className='return'> <i className="fa fa-chevron-left"></i> </button>
          </Link>  
          <div className='logoContainer'>
            <img src={logo} className='logoImage'/>
          </div>
          <form onSubmit={onSubmit} id="formulario">
            <h2 className='title'>Inicio de sesión</h2>
            <div className='form-group mb-2'>
              <label htmlFor='ID' className='form-label'>Ingresa tu correo electrónico</label>
              <input type="text" className='form-control' id='inputEmail' {...register("email", {required: true})}></input>
            </div>
            <div className='form-group mb-2'>
              <label htmlFor='password' className='form-label'>Ingresa tu Contraseña </label>
              <div className='passcode'> 
                <input type={passwordShown ? "text" : "password"} className='form-control' id='customform' {...register("password", {required: true})}></input>
                <button type="button" onClick={togglePassword}>
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
            <button type='buttom' className='btn btn-success mt-5' id='entrar'>Entrar</button>
          }
          </form>
        </div>
      }
      {segundoPaso &&
        <div className='login rounded'>
            <button type='button' className='return' onClick={toggleFirst}> <i className="fa fa-chevron-left"></i> </button>
            <div className='logoContainer'>
              <img src={logo} className='logoImage'/>
            </div>
            <form>
            <h2 className='title'>Inicio de sesión</h2>
            <div className="row">
                <div className="col text-center">
                    <p>Ingresa el código que enviamos a</p>
                    <p className='sentTo'>{correo}</p>

                    {otp.map((data, index) => {
                        return (
                            <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                    <p className='cIngresado'>Código ingresado - {otp.join("")}</p>
                    <p>
                        <button
                            className="btn btn-secondary" id='borrar' type = "button"
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Borrar
                        </button>
                        <button
                            className="btn btn-success btn-primary" id='verificar' type = "button"
                            onClick={checkCode}
                        >
                            Verificar
                            
                        </button>
                    </p>
                </div>
            </div>
          </form>  
        </div>
      }
    </div></>
  )
}

export default LoginForm