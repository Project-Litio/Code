import {React,useEffect,useState} from 'react'
//import users from '../../data/users.json'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {customerEdit, customerDelete, customerCreate} from '../../api/login.api'


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
  }
}));

const TableUSers = ({users}) => {


  //--LLamado a Styles
  const styles = useStyles();
  //--Estados
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); }
  const openCloseEditModal=()=>{setEditModal(!EditModal); }
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }


  const [selectedUser,setSelectedUser]=useState({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    id:'',
    address:'',
    phone:'',
    type:''
  });


  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedUser(
      prevState=>({
        ...prevState,
        [name]:value
      })
    )
  }


  const selectUser=(user, caso)=>{
    console.log(user);
    setSelectedUser(user);

    console.log(selectedUser);
    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  const deleteUser = async () => {
    await customerDelete(selectedUser, selectedUser.id);
    window.location.reload(false);
  }

  const editUser = async () => {
    await customerEdit(selectedUser, selectedUser.id);
    window.location.reload(false);
  }

  const createUser = async () => {
    await customerCreate(selectedUser);
    window.location.reload(false);
  }

  //--Fin de Estados
  //--Componentes especificos
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
      <TextField name='type' className={styles.inputMaterial} label="Tipo" onChange={handleChange}></TextField>
      <div align="right">
      <Button color="primary" onClick={createUser}>Insertar</Button>
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
      <TextField name='id' className={styles.inputMaterial} label="Identicador" onChange={handleChange} defaultValue={selectedUser && selectedUser.id}></TextField>
      <TextField name='address' className={styles.inputMaterial} label="Direccion" onChange={handleChange} defaultValue={selectedUser && selectedUser.address}></TextField>
      <TextField name='phone' className={styles.inputMaterial} label="Telefono" onChange={handleChange} defaultValue={selectedUser && selectedUser.phone}></TextField>
      <TextField name='type' className={styles.inputMaterial} label="Tipo" onChange={handleChange} defaultValue={selectedUser && selectedUser.type}></TextField>
      <div align="right">
      <Button color="primary" onClick={editUser}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>Estas seguro que deseas eliminar el usuario {selectedUser && selectedUser.first_name}?</p>
      <div align="right">
      <Button color="secondary" onClick={deleteUser}>Si</Button>
      <Button onClick={()=>openCloseDeleteModal()}>No</Button>
      </div>

    </div>

  )

  //--Fin componentes no especificos

  return (
    <div>
      <div className='text-center'>
      <Button onClick={()=>openCloseIsertModal()}>
        Insertar
      </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Identificador</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user=>
              (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>
                    <Edit className={styles.iconos} onClick={()=>selectUser(user,'Editar')}  />
                    &nbsp;&nbsp;&nbsp;
                    <Delete  className={styles.iconos} onClick={()=>selectUser(user,'Elminar')}/>
                  </TableCell>
                </TableRow>
              )
              )}
          </TableBody>
        </Table>
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