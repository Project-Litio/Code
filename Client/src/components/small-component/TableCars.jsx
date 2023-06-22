import {React,useEffect,useState} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {customerEdit, customerDelete, customerCreate} from '../../api/login.api'
import TablePagination from "@material-ui/core/TablePagination";
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

const TableCars = ({cars}) => {


  //--LLamado a Styles
  const styles = useStyles();
  //--Estados
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); }
  const openCloseEditModal=()=>{setEditModal(!EditModal); }
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [selectedcar,setSelectedcar]=useState({
    brand:'',
    id:'',
    id_article:0,
    image:'',
    model:'',
    price:0,
    type:'',
    wheel:''
  });


  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedcar(
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
    rowsPerPage - Math.min(rowsPerPage, cars.length - page * rowsPerPage);


  const selectcar=(car, caso)=>{
    console.log(car);
    setSelectedcar(car);

    console.log(selectedcar);
    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  const deletecar = async () => {
    await customerDelete(selectedcar, selectedcar.id);
    window.location.reload(false);
  }

  const editcar = async () => {
    await customerEdit(selectedcar, selectedcar.id);
    window.location.reload(false);
  }

  const createcar = async () => {
    await customerCreate(selectedcar);
    window.location.reload(false);
  }

  //--Fin de Estados
  //--Componentes especificos
  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo vehiculo</h3>
      <TextField name='brand' className={styles.inputMaterial} label="Marca" onChange={handleChange}></TextField>
      <TextField name='id' className={styles.inputMaterial} label="VIN" onChange={handleChange}></TextField>
      <TextField name='id_article' className={styles.inputMaterial} label="ID" onChange={handleChange}></TextField>
      <TextField name='image' className={styles.inputMaterial} label="Imagen" onChange={handleChange}></TextField>
      <TextField name='model' className={styles.inputMaterial} label="Modelo" onChange={handleChange}></TextField>
      <TextField name='price' className={styles.inputMaterial} label="Precio" onChange={handleChange}></TextField>
      <TextField name='type' className={styles.inputMaterial} label="Tipo" onChange={handleChange}></TextField>
      <TextField name='wheel' className={styles.inputMaterial} label="Llanta" onChange={handleChange}></TextField>
      <div align="right">
      <Button color="primary" onClick={createcar}>Insertar</Button>
      <Button onClick={()=>openCloseIsertModal()}>Cancelar</Button>
      </div>
    </div>
  )

    const EditBody=(
    <div className={styles.modal}>
      <h3>Editar vehiculo</h3>
      <TextField name='brand' className={styles.inputMaterial} label="Marca" onChange={handleChange} defaultValue={selectedcar && selectedcar.brand}></TextField>
      <TextField name='id_article' className={styles.inputMaterial} label="VIN" onChange={handleChange} defaultValue={selectedcar && selectedcar.id_article}></TextField>
      <TextField name='id' className={styles.inputMaterial} label="ID" onChange={handleChange} defaultValue={selectedcar && selectedcar.id}></TextField>
      <input type="file" id="img" name="image" accept="image/*" onChange={handleChange} label="Image"></input>
      <TextField name='model' className={styles.inputMaterial} label="Modelo" onChange={handleChange} defaultValue={selectedcar && selectedcar.model} ></TextField>
      <TextField name='price' className={styles.inputMaterial} label="Precio" onChange={handleChange} defaultValue={selectedcar && selectedcar.price}></TextField>
      <TextField name='type' className={styles.inputMaterial} label="Tipo" onChange={handleChange} defaultValue={selectedcar && selectedcar.type}></TextField>
      <TextField name='wheel' className={styles.inputMaterial} label="Llanta" onChange={handleChange} defaultValue={selectedcar && selectedcar.wheel}></TextField>
      <div align="right">
      <Button color="primary" onClick={editcar}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>Estas seguro que deseas eliminar el vehiculo {selectedcar && selectedcar.brand}?</p>
      <div align="right">
      <Button color="secondary" onClick={deletecar}>Si</Button>
      <Button onClick={()=>openCloseDeleteModal()}>No</Button>
      </div>

    </div>

  )

  //--Fin componentes no especificos


  return (
    <div>
      <div className="btnInsert">
      <Button className='btnInsertar' onClick={()=>openCloseIsertModal()}>
        Insertar
      </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><b>Marca</b></TableCell>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>VIN</b></TableCell>
            <TableCell><b>Imagen</b></TableCell>
            <TableCell><b>Modelo</b></TableCell>
            <TableCell><b>Precio</b></TableCell>
            <TableCell><b>Tipo</b></TableCell>
            <TableCell><b>Llanta</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(car=>
              (
                <TableRow key={car.id}>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.id_article}</TableCell>
                  <TableCell>{car.id}</TableCell>
                  <TableCell><img src={"https://res.cloudinary.com/dao5kgzkm/"+car.image} alt={car.brand+car.model} className='carimg'></img></TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>{car.wheel}</TableCell>
                  <TableCell>
                    <Edit className={styles.iconos} onClick={()=>selectcar(car,'Editar')}  />
                    &nbsp;&nbsp;&nbsp;
                    <Delete  className={styles.iconos} onClick={()=>selectcar(car,'Elminar')}/>
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
        count={cars.length}
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

export default TableCars