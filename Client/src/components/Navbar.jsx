import React, {useState, useEffect} from 'react'
import img from '../assets/logo.png'
import './style.css'
import { useNavigate, useLocation } from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion'
import { useTranslation } from 'react-i18next';

import {
  Link
} from "react-router-dom";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const usrTranslator = (usrType) => {
  if(usrType != undefined){
    switch (usrType.role) {
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
}

const GlobeIcon = ()=>(
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
</svg>
)

const Navbar = () => {
  const [t,i18n]=useTranslation("global");
  const location = useLocation();
  const [loggedIn, setLogged] = useState(false);
  const logged = () => {
    if(cookies.get('user') != undefined && cookies.get('user') != 'undefined'){
      setLogged(true);
    } else {
      setLogged(false);
    }
  };

  useEffect(() => {
    logged();
  }, []);

  const navigateTo = useNavigate();

  const deleteCookies = () => {
    cookies.set('user', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    navigateTo('/');
    if(location.pathname == "/"){
      window.location.reload(false);
    }
  };

  const lang =["es","en","pt"]
  const [open,setOpen] =useState(false)

  return (
      <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
        <div className="container ">
          <Link className="navbar-brand " to='/'><img src={img} alt="Litio" width={180} />  </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-brand " id="navbarNav">
            <ul className="navbar-nav  ms-auto px-3 fs-4 ">
              <li className="nav-item mx-3">
                <Link className=" nav-link  active " to='/' ><font color='white'>{t("NavBar.home")}</font></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link " to='/collection'> <font color='White '>{t("NavBar.collection")}</font> </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to='/repair'> <font color='White'>{t("NavBar.maintenance")}</font>  </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to='/about'> <font color='White'>{t("NavBar.us")}</font></Link>
              </li>

              {!loggedIn &&
                <li className="nav-item mx-3">
                  <Link className="nav-link active"  to='/login'> <font color='White'>{t("NavBar.in")}</font></Link>
                </li> 
              }
              {loggedIn &&
                  <li className="nav-item mx-3">
                    <Link className="nav-link active"  to={'/dashboard'+usrTranslator(cookies.get('user'))}> <font color='White'>Dashboard</font></Link>
                  </li>                   
              }
              {loggedIn &&
                  <li onClick={deleteCookies}>
                    <Link className="nav-link active"> <font style={{ color: '#ee2641' }}>Salir</font></Link>
                  </li>                 
              }              
            </ul>
          </div>
          <div className="text-white">
            <button className="btn btn-link" onClick={() => setOpen(!open)}>
              <GlobeIcon></GlobeIcon>
            </button>
            <AnimatePresence>
                  {open && (
                    <motion.ul
                      key="lang-menu"
                      className="custom-ul"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {lang.map((l, i) => (
                        <motion.li key={i} className=" custom-text list-unstyled" onClick={()=>i18n.changeLanguage(l)}>
                          {l}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
          </div>
        </div>
        
      </nav>
  )
}

export default Navbar