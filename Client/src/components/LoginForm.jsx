import React, { useRef, useState } from 'react'
import logo from '../assets/LogoFFFFFF.png'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import ReCAPTCHA from "react-google-recaptcha"
import { useNavigate } from 'react-router-dom';
import {login, otpLogin} from '../api/login.api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { useTranslation } from 'react-i18next';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

import Cookies from 'universal-cookie';

function LoginForm() {
  const [t]=useTranslation("global");
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

  const {register, handleSubmit} = useForm();
  const [coderesult, setCode] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [user, setUser] = useState(null);
  const onSubmit = handleSubmit(async data => {
    try {
      const result = await login(data);
      if(!(result.data.data == undefined)){
        setCorreo(data.email);
        setUser(result.data.data)
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

  const usrTranslator = (usrType) => {
    switch (usrType) {
      case 'Man': 
        return 'Gerente';
      case 'Sel': 
        return 'Vendedor';
      case 'Mec': 
        return 'Mecanico';
      default:
        break;
    }
  }

  const checkCode = () => {
    if(otp.join("") == coderesult){
      const cookies = new Cookies();
      cookies.set('user', user, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
      if(user.role == "Cliente"){
        window.location.assign('collection');
      } else {
        window.location.assign('dashboard'+usrTranslator(user.role));
      }
    } else {
      notifyCode();
    }
  }

  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const emailChange = e => {
    if(/^[a-zA-Z0-9+_.\-]+@[a-zA-Z0-9]+[.+a-zA-Z0-9\-]+$/u.test(e.target.value)){
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  const passChange = e => {
    if((e.target.value).length >= 1){
      setValidPass(true);
    } else {
      setValidPass(false);
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
            <h2 className='title'>{t("LoginForm.title")}</h2>
            <div className='form-group mb-2'>
              <label htmlFor='ID' className='form-label'>
                {t("LoginForm.email")}
                              
              </label>
              {!validEmail &&
                <ClearIcon style={{ color: '#f02f2f', float:'right' }}></ClearIcon>
              }
              {validEmail &&
                <CheckIcon style={{ color: '#00B86B', float:'right' }}></CheckIcon>
              }  
              <input type="text" className='form-control' id='inputEmail' {...register("email", {required: true})} onChange={emailChange}></input>
            </div>
            <div className='form-group mb-2'>
              <label htmlFor='password' className='form-label'>
                {t("LoginForm.password")} 
              </label>
              {!validPass &&
                  <ClearIcon style={{ color: '#f02f2f', float:'right'}}></ClearIcon>
              }
              {validPass &&
                <CheckIcon style={{ color: '#00B86B', float:'right'}}></CheckIcon>
              }   
              <div className='passcode'> 
                <input type={passwordShown ? "text" : "password"} className='form-control' id='customform' {...register("password", {required: true})} onChange={passChange}></input>
                <button type="button" onClick={togglePassword}>
                  {!passwordShown && <i className="fa fa-eye"></i>}
                  {passwordShown && <i className="fa fa-eye-slash"></i>}
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
          {captchaValido && validEmail && validPass &&
            <button type='buttom' className='btn btn-success mt-5' id='entrar'>{t("LoginForm.login_button")}</button>
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
            <h2 className='title'>{t("LoginForm.title")}</h2>
            <div className="row">
                <div className="col text-center">
                    <p>{t("LoginForm.verification")}</p>
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

                    <p className='cIngresado'>{t("LoginForm.helper")} - {otp.join("")}</p>
                    <p>
                        <button
                            className="btn btn-secondary" id='borrar' type = "button"
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            {t("LoginForm.helper_2")}
                        </button>
                        <button
                            className="btn btn-success btn-primary" id='verificar' type = "button"
                            onClick={checkCode}
                        >
                            {t("LoginForm.helper_3")}
                            
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