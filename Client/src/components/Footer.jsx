import React from 'react'
import './style.css'
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [t]=useTranslation("global");
  return (
    <div>
      <footer className="footer ft pt-3 pb-2 ">
        <div className="container">
          <div className="row justify-content-between text-center">
            <div className="col-md-2 col-sm-2 col-3">
              <h5>LITIO</h5>

            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <h5>Copyright&copy;  </h5>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <Link className="navbar-brand " to='/'>
                <h5>{t("NavBar.home")}</h5>
              </Link>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <Link className="navbar-brand " to='/collection'>
                <h5>{t("NavBar.collection")}</h5>
              </Link>
            </div>
            <div className="col-lg-2 col-sm-2  col-0">
              <Link className="navbar-brand " to='/login'>
                <h5>{t("NavBar.in")}</h5>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer