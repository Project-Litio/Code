import {React,useState,useEffect} from 'react'
import './style.css'
import { Link, useLocation } from 'react-router-dom';
import {Modal, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {getBranchs} from '../../api/login.api';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: {
      sm:300,
      md:500
    },
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
}));

const CardCar = () => {
  const [branches, setBranches] = useState([]);
  const styles = useStyles();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [SucursalModal,setSucursalModal] = useState(false);
  const openCloseSucursalModal=()=>{setSucursalModal(!SucursalModal); if(!SucursalModal == true){insertText()}}

  const SucursalBody=(
    <div className={styles.modal} id='mod'>
      <div align="right">
        <Button onClick={()=>openCloseSucursalModal()}>Cerrar</Button>
      </div>
      <h3 style={{color: '#039257'}}>Nuestras sucursales</h3> 
      <br></br>
    </div>
  )

  const timer = ms => new Promise(res => setTimeout(res, ms));

  const insertText = async () => {
    setBranches((await getBranchs()).data);
    await timer(1000);
    for(var i = 0, len = branches.length; i < len; i++){
        var br = document.createElement('br');
        var titulo = document.createElement('h4');
        var texto = document.createElement('p');
        var numero = document.createElement('p');
        titulo.textContent = branches[i].city +' '+ branches[i].address;
        numero.textContent = branches[i].phone;
        texto.textContent = branches[i].email;
        titulo.setAttribute('style', '{{color: "#039257"}}');
        var list = document.getElementById("mod");
        list.appendChild(titulo);
        list.appendChild(texto);
        list.appendChild(numero);
        list.appendChild(br);
    }
  }

  return (
    <div>
      <Modal open={SucursalModal} onClose={()=>openCloseSucursalModal()} >
        {SucursalBody}
      </Modal>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={"https://res.cloudinary.com/dao5kgzkm/"+data.image} className="img-fluid rounded-start" alt="Auto"/>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{data.brand} {data.model} </h5>     
              <div>
                <div className='row w-50 py-1' >
                  <div  className='col-3'>
                  </div>
                </div>
              </div>
              <h3 className="py-1">Precio: {
                new Intl.NumberFormat('en-DE').format(data.price)
              } COP 
              </h3>
              <br></br>
              <h5 style={{bottom: '10%'}}>Si deseas realizar una cotización de este vehículo, contáctate con nosotros a <font style={{color: '#039257'}}>litioservice@gmail.com</font>, o a una de nuestras sucursales:</h5>
              <br></br>
              <button className='buttonC' onClick={openCloseSucursalModal}>Sucursales</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCar