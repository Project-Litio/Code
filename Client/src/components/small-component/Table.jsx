// Componente desarrollado completamente. No editar a menos que sea estrictamente necesario.

import {React,useState, useEffect} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {customerEdit, customerDelete, customerCreate, employeeEdit, employeeDelete, employeeCreate, customerDetail, employeeDetail} from '../../api/login.api'
import TablePagination from "@material-ui/core/TablePagination";
import Select from 'react-select'
import '../style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


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

const roles = [
  { value: 'Cliente', label: 'Cliente' },
  { value: 'Sel', label: 'Vendedor' },
  { value: 'Man', label: 'Gerente' },
  { value: 'Mec', label: 'Mecanico' }
]

const types = [
  { value: 'N', label: 'Natural' },
  { value: 'J', label: 'Jurídica' }
]

const TableUSers = ({users, copy}) => {
  const [manager, setManager] = useState(false);
  const logged = () => {
    if(cookies.get('user') != undefined){
      if(cookies.get('user').role == "Man"){
        setManager(true);
      }
    }
  };

  const [selectedUser,setSelectedUser]=useState({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    id:'',
    address:'',
    phone:'',
    role:'',
    branch:'',
    type:''
  });

  const [originalUser, setOriginalUser] = useState([]);

  useEffect(() => {
    logged();
  }, [cookies]);

  const styles = useStyles();

  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);
  const [search, setSearch] = useState('');

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); cleandata();}
  const openCloseEditModal=()=>{setEditModal(!EditModal); restartSelection();}
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const faltanDatos = (data) => toast("Debes brindar el dato "+dataTranslator(data));
  const cantidadExcedida = (data, n) => toast(dataTranslator(data)+" debe constar de menos de "+n+" caracteres.");
  const invalidEmail = () => toast("El email no cumple el formato texto@texto.texto")

  const cleandata = () =>{
    for (var key in selectedUser){
      selectedUser[key] = '';
    }
  }

  const restartSelection = () =>{
    for(var key in selectedUser){
      selectedUser[key] = originalUser[key];
    }
  }

  const dataTranslator = (data) => {
    switch (data) {
      case 'first_name':
        return 'Nombre';
      case 'last_name':
        return 'Apellido';
      case 'email':
        return 'Email';
      case 'password':
        return 'Password';
      case 'id':
        return 'Identificador';
      case 'address':
        return 'Direccion';
      case 'phone':
        return 'Telefono';
      case 'role':
        return 'Rol';
      case 'branch':
        return 'Sucursal';
      case 'type':
        return 'Tipo';
      default:
        console.log("Esto no debería pasar");
    }
  }

  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedUser(
      prevState=>({
        ...prevState,
        [name]:value
      })
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);


  const selectUser=(user, caso, org)=>{
    setSelectedUser(user);
    setOriginalUser(org);

    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  const beforeCreate = () => {verificarDatos("Crear");}
  const beforeEdit = () => {verificarDatos("Editar");}

  const verificarDatos = (act) => {
    const lengths = [30, 50, 50, 50, 20, 30, 12, 7, 5, 5];
    selectedUser.branch = cookies.get('user').branch;

    if(selectedUser.password == '' && act == "Editar"){
      delete selectedUser.password;
    }
    
    if(selectedUser.type == '' || selectedUser.type == 'No aplica'){
      selectedUser.type = 'N';
    }

    if(selectedUser.role == '' && act == "Crear"){
      selectedUser.role = 'Cliente';
    }

    if(selectedUser.hasOwnProperty('id_branch')){
      delete selectedUser.id_branch;
    }

    if(/^[a-zA-Z0-9+_.\-]+@[a-zA-Z0-9]+[.+a-zA-Z0-9\-]+$/u.test(selectedUser.email)){
      var n = 0;
      for ( var key in selectedUser ) {
        if(selectedUser[key] == ''){
          faltanDatos(key);
          return false;
        } else if((selectedUser[key]).length > lengths[n]){
          cantidadExcedida(key, lengths[n]);
          return false;
        } else {
          n++;
        }
      }

      if(act == "Crear"){
        createUser();
      } else if(act == "Editar"){
        editUser();
      } else {
        deleteUser();
      }
    } else {
      invalidEmail();
      return false;
    }
  }

  const deleteUser = async () => {
    if(selectedUser.role == "Cliente"){
      await customerDelete(selectedUser, selectedUser.id);
    } else {
      await employeeDelete(selectedUser, selectedUser.id);
    }
    window.location.reload(false);
  }

  const editUser = async () => {
    if(selectedUser.role == "Cliente"){
      console.log(selectedUser);
      try {
        await customerEdit(selectedUser, selectedUser.id);
        window.location.reload(false);
      } catch (error) {
        if('password' in selectedUser){
          await employeeDetail(selectedUser.id);
          await employeeDelete(selectedUser, selectedUser.id);
          createUser();
        } else {
          faltanDatos('password');
        }
      }
    } else {
      try {
        await employeeEdit(selectedUser, selectedUser.id);
        window.location.reload(false);
      } catch (error) {
        if('password' in selectedUser){
          await customerDetail(selectedUser.id);
          await customerDelete(selectedUser, selectedUser.id);
          createUser();         
        } else {
          faltanDatos('password');
        }
      }
    }
  }

  const createUser = async () => {
    if(selectedUser.role == "Cliente"){
      await customerCreate(selectedUser);  
    } else {
      await employeeCreate(selectedUser);
    } 
    window.location.reload(false);
  }

  const handleRoleChange = (selectedOption) => {
    selectedUser['role'] = selectedOption.value;
  };

  const handleTypeChange = (selectedOption) => {
    selectedUser['type'] = selectedOption.value;
  };

  const searchIndex = (elem, array) => {
    for(var key in array){
      if(array[key].value == elem){
        return key;
      } 
    }
    return 0;
  }

  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>
      <TextField name='first_name' className={styles.inputMaterial} label="Nombre" onChange={handleChange}></TextField>
      <TextField name='last_name' className={styles.inputMaterial} label="Apellido" onChange={handleChange}></TextField>
      <TextField name='email' className={styles.inputMaterial} label="Email" onChange={handleChange}></TextField>
      <TextField name='password' className={styles.inputMaterial} label="Password" onChange={handleChange}></TextField>
      <TextField name='id' className={styles.inputMaterial} label="Identicador" onChange={handleChange}></TextField>
      <TextField name='address' className={styles.inputMaterial} label="Direccion" onChange={handleChange}></TextField>
      <TextField name='phone' className={styles.inputMaterial} label="Telefono" onChange={handleChange}></TextField>
      <label className={styles.inputMaterial}>Rol</label>
      <Select options={roles} onChange={handleRoleChange} defaultValue={roles[0]}/>
      <label className={styles.inputMaterial}>Tipo</label>
      <Select options={types} onChange={handleTypeChange} defaultValue={types[0]}/>
      <TextField name='branch' className={styles.inputMaterial} label="Sucursal" onChange={handleChange} defaultValue={cookies.get('user').branch} InputProps={{readOnly: true}} ></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeCreate}>Insertar</Button>
      <Button onClick={()=>openCloseIsertModal()}>Cancelar</Button>
      
      </div>
    </div>
  )

    const EditBody=(
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField name='first_name' className={styles.inputMaterial} label="Nombre" onChange={handleChange} defaultValue={selectedUser && selectedUser.first_name}></TextField>
      <TextField name='last_name' className={styles.inputMaterial} label="Apellido" onChange={handleChange} defaultValue={selectedUser && selectedUser.last_name}></TextField>
      <TextField name='email' className={styles.inputMaterial} label="Email" onChange={handleChange} defaultValue={selectedUser && selectedUser.email} ></TextField>
      <TextField name='password' className={styles.inputMaterial} label="Password" onChange={handleChange} defaultValue={selectedUser && selectedUser.password}></TextField>
      <TextField name='id' className={styles.inputMaterial} label="Identicador" onChange={handleChange} defaultValue={selectedUser && selectedUser.id} InputProps={{readOnly: true}}></TextField>
      <TextField name='address' className={styles.inputMaterial} label="Direccion" onChange={handleChange} defaultValue={selectedUser && selectedUser.address}></TextField>
      <TextField name='phone' className={styles.inputMaterial} label="Telefono" onChange={handleChange} defaultValue={selectedUser && selectedUser.phone}></TextField>
      <label className={styles.inputMaterial}>Rol</label>
      <Select options={roles} onChange={handleRoleChange} defaultValue={roles[searchIndex(originalUser.role, roles)]} />
      <label className={styles.inputMaterial}>Tipo</label>
      <Select options={types} onChange={handleTypeChange} defaultValue={types[searchIndex(originalUser.type, types)]}/>
      <TextField name='branch' className={styles.inputMaterial} label="Sucursal" onChange={handleChange} defaultValue={cookies.get('user').branch} InputProps={{readOnly: true}}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>Estas seguro que deseas eliminar el usuario {selectedUser && selectedUser.first_name} con ID {selectedUser && selectedUser.id}?</p>
      <div align="right">
      <Button color="secondary" onClick={deleteUser}>Si</Button>
      <Button onClick={()=>openCloseDeleteModal()}>No</Button>
      </div>

    </div>

  )

  return (
    <div>
      <ToastContainer />
      {manager &&
        <div className="btnInsert">
          <Button className='btnInsertar' onClick={()=>openCloseIsertModal()}>
            Insertar
          </Button>
        </div>
      }
      <div className='px-3'>
        <Form>
          <InputGroup className='my-3'>
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => {setSearch(e.target.value);setPage(0)}}
              placeholder="buscar"
              
            />
          </InputGroup>
        </Form>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Apellido</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Identificador</b></TableCell>
            <TableCell><b>Direccion</b></TableCell>
            <TableCell><b>Telefono</b></TableCell>
            <TableCell><b>Rol</b></TableCell>
            <TableCell><b>Tipo</b></TableCell>
            <TableCell><b>Sucursal</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {copy.filter((user) => {
          return search.toLowerCase() === ''
            ? user
            : user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase());
        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user=>
              (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>{user.id_branch}</TableCell>
                  {manager &&
                    <TableCell>
                      <Edit className={styles.iconos} onClick={()=>selectUser((users.filter((usr) => usr.id == user.id))[0],'Editar', user)}  />
                      &nbsp;&nbsp;&nbsp;
                      <Delete  className={styles.iconos} onClick={()=>selectUser((users.filter((usr) => usr.id == user.id))[0],'Elminar', user)}/>
                    </TableCell>
                  }
                </TableRow>
              )
              )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>

      <Modal open={InsertModal} onClose={()=>openCloseIsertModal()} >
        {insertBody}
      </Modal>

      <Modal open={EditModal} onClose={()=>openCloseEditModal()} >
        {EditBody}
      </Modal>

      <Modal open={DeleteModal} onClose={()=>openCloseDeleteModal()} >
        {DeleteBody}
      </Modal>
    </div>
  )
}

export default TableUSers