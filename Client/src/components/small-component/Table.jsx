import {React,useEffect,useState} from 'react'
//import users from '../../data/users.json'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import TablePagination from "@material-ui/core/TablePagination";



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
  const [data,setData]=useState([]);
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); }
  const openCloseEditModal=()=>{setEditModal(!EditModal); }
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [selectedUser,setSelectedUser]=useState({
    name:'',
    email:'',
    id:'',
    recruitment_date:'',
    rol:''
  });


  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedUser(
      prevState=>({
        ...prevState,
        [name]:value
      })
    )
    console.log(selectedUser);
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


  const selectUser=(user, caso)=>{
    console.log(user);
    setSelectedUser(user);

    console.log(selectedUser);
    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  //--Fin de Estados
  //--Componentes especificos
  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Usuario</h3>
      <TextField name='nombre' className={styles.inputMaterial} label="Nombre" onChange={handleChange}></TextField>
      <TextField name='email' className={styles.inputMaterial} label="Email" onChange={handleChange}></TextField>
      <TextField name='id' className={styles.inputMaterial} label="Identicador"></TextField>
      <TextField name='recruitment_date' className={styles.inputMaterial} label="Activo Desde" onChange={handleChange}></TextField>
      <TextField name='rol' className={styles.inputMaterial} label="Rol" onChange={handleChange}></TextField>
      <div align="right">
      <Button color="primary" onClick={()=>handleChange()}>Insertar</Button>
      <Button onClick={()=>openCloseIsertModal()}>Cancelar</Button>
      </div>
    </div>
  )

    const EditBody=(
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField name='nombre' className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={selectedUser?.name || ''}></TextField>
      <TextField name='email' className={styles.inputMaterial} label="Email" onChange={handleChange} value={selectedUser && selectedUser.email} ></TextField>
      <TextField name='id' className={styles.inputMaterial} label="Identicador" value={selectedUser && selectedUser.id}></TextField>
      <TextField name='recruitment_date' className={styles.inputMaterial} label="Activo Desde" onChange={handleChange} value={selectedUser && selectedUser.recruitment_date}></TextField>
      <TextField name='rol' className={styles.inputMaterial} label="Rol" onChange={handleChange} value={selectedUser && selectedUser.rol}></TextField>
      <div align="right">
      <Button color="primary" onClick={()=>handleChange()}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>Estas seguro que deseas eliminar el usuario {selectedUser && selectedUser.name}?</p>
      <div align="right">
      <Button color="secondary" onClick={()=>handleChange()}>Si</Button>
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
            <TableCell>Email</TableCell>
            <TableCell>Identificador</TableCell>
            <TableCell>Activo Desde</TableCell>
            <TableCell>Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user=>
              (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.recruitment_date}</TableCell>
                  <TableCell>{user.rol}</TableCell>
                  <TableCell>
                    <Edit className={styles.iconos} onClick={()=>selectUser(user,'Editar')}  />
                    &nbsp;&nbsp;&nbsp;
                    <Delete  className={styles.iconos} onClick={()=>selectUser(user,'Elminar')}/>
                  </TableCell>
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