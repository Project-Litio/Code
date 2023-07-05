// Componente desarrollado completamente. No editar a menos que sea estrictamente necesario.

import {React,useState} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {branchEdit} from '../../api/login.api'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import 'react-toastify/dist/ReactToastify.css';
import '../style.css'

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

const TableSucursal = ({branch}) => {
  const cookies = new Cookies();
  const styles = useStyles();
  const [EditModal,setEditModal] =useState(false);
  const openCloseEditModal=()=>{setEditModal(!EditModal); }

  const faltanDatos = (data) => toast("Debes brindar el dato "+dataTranslator(data));
  const cantidadExcedida = (data, n) => toast(dataTranslator(data)+" debe constar de menos de "+n+" caracteres.");
  const notEmail = () => toast("El correo no cumple el formato nombre@organizacion.dominio");

  const dataTranslator = (data) => {
    switch (data) {
      case 'city':
        return 'Ciudad';
      case 'address':
        return 'Direccion';
      case 'phone':
        return 'Telefono';
      case 'email':
        return 'Correo';
      default:
        console.log("Esto no debería pasar");
    }
  }

  const [selectedBranch,setSelectedBranch]=useState({
    city:'',
    address:'',
    phone:'',
    email:''
  });

  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedBranch(
      prevState=>({
        ...prevState,
        [name]:value
      })
    )
  }

  const selectBranch=(Branch, caso)=>{
    setSelectedBranch(Branch);
    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  const beforeEdit = () => {verificarDatos();}

  var n = 0;
  const verificarDatos = () => {
    const lengths = [20,20,10,100];
    for ( var key in selectedBranch ) {
      if(selectedBranch[key] == ''){
        faltanDatos(key);
        return false;
      } else if((selectedBranch[key]).length > lengths[n]){
        cantidadExcedida(key, lengths[n]);
        return false;
      } else {
        n++;
      }

      if(/^[a-zA-Z0-9+_.\-]+@[a-zA-Z0-9]+[.+a-zA-Z0-9\-]+$/u.test(selectedBranch.email) == false){
        notEmail();
        return false;
      }
    }
    editBranch();
  }

  const editBranch = async () => {
    await branchEdit(selectedBranch, cookies.get('user').branch); 
    window.location.reload(false);
  }
 
    const EditBody=(
    <div className={styles.modal}>
      <h3>Editar Sucursal</h3>      
      <TextField name='city' className={styles.inputMaterial} label="Ciudad" onChange={handleChange} defaultValue={selectedBranch && selectedBranch.city} ></TextField>
      <TextField name='address' className={styles.inputMaterial} label="Direccion" onChange={handleChange} defaultValue={selectedBranch && selectedBranch.address}></TextField>
      <TextField name='phone' className={styles.inputMaterial} label="Telefono" onChange={handleChange} defaultValue={selectedBranch && selectedBranch.phone}></TextField>
      <TextField name='email' className={styles.inputMaterial} label="Correo" onChange={handleChange} defaultValue={selectedBranch && selectedBranch.email}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <div>
      <ToastContainer />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Ciudad</b></TableCell>
            <TableCell><b>Dirección</b></TableCell>
            <TableCell><b>Telefono</b></TableCell>
            <TableCell><b>Correo</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={cookies.get('user').branch}>
              <TableCell>{cookies.get('user').branch}</TableCell>
              <TableCell>{branch.city}</TableCell>
              <TableCell>{branch.address}</TableCell>
              <TableCell>{branch.phone}</TableCell>
              <TableCell>{branch.email}</TableCell>
              <TableCell>
                <Edit className={styles.iconos} onClick={()=>selectBranch(branch,'Editar')}  />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={EditModal} onClose={()=>openCloseEditModal()} >
        {EditBody}
      </Modal>
    </div>
  )
}

export default TableSucursal