import {React,useState} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {stockEdit, stockDelete, stockCreate} from '../../api/article.api'
import TablePagination from "@material-ui/core/TablePagination";
import '../style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'

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

const Tablestock = ({stock}) => {

  const styles = useStyles();
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); }
  const openCloseEditModal=()=>{setEditModal(!EditModal); }
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const faltanDatos = (data) => toast("Debes brindar el dato "+dataTranslator(data));

  const dataTranslator = (data) => {
    switch (data) {
      case 'id':
        return 'Identificador';
      case 'name':
        return 'Nombre';
      case 'type':
        return 'Tipo';
      case 'stock':
        return 'Cantidad';
      default:
        console.log("Esto no debería pasar");
    }
  }

  const [selectedPiece,setSelectedPiece]=useState({
    id:'',
    name:'',
    type:'',
    stock:'',
    color:''
  });

  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedPiece(
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
    rowsPerPage - Math.min(rowsPerPage, stock.length - page * rowsPerPage);

  const selectPiece=(Piece, caso)=>{
    setSelectedPiece(Piece);

    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  const beforeCreate = () => {verificarDatos("Crear");}
  const beforeEdit = () => {verificarDatos("Editar");}

  const verificarDatos = (act) => {
    selectedPiece.color = 'None';
    for ( var key in selectedPiece ) {
      if(selectedPiece[key] == ''){
        faltanDatos(key);
        return false;
      }
    }

    if(act == "Crear"){
      selectedPiece.id = 'None';
      createPiece();
    } else if(act == "Editar"){
      editPiece();
    } else {
      deletePiece();
    }
  }

  const createFormData = () => {
    const formData = new FormData();
    for ( var key in selectedPiece ) {
      formData.append(key, selectedPiece[key]);
    }

    formData.append('id_article', JSON.stringify({"stock": selectedPiece.stock, "color": selectedPiece.color}));

    return formData;
  }

  const deletePiece = async () => {
    await stockDelete({}, selectedPiece.id);
    window.location.reload(false);
  }

  const editPiece = async () => {
    await stockEdit(createFormData(), selectedPiece.id);
    window.location.reload(false);
  }

  const createPiece = async () => {
    await stockCreate(createFormData());
    window.location.reload(false);
  }

  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Pieza</h3>
      <TextField name='id' className={styles.inputMaterial} label="Identicador" onChange={handleChange} InputProps={{readOnly: true}} defaultValue="Generado Automaticamente"></TextField>
      <TextField name='name' className={styles.inputMaterial} label="Nombre" onChange={handleChange}></TextField>
      <TextField name='type' className={styles.inputMaterial} label="Tipo" onChange={handleChange}></TextField>
      <TextField name='stock' className={styles.inputMaterial} label="Cantidad" onChange={handleChange}></TextField>
      <TextField name='color' className={styles.inputMaterial} label="Color" onChange={handleChange} InputProps={{readOnly: true}} defaultValue="None"></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeCreate}>Insertar</Button>
      <Button onClick={()=>openCloseIsertModal()}>Cancelar</Button>
      </div>
    </div>
  )

    const EditBody=(
    <div className={styles.modal}>
      <h3>Editar Pieza</h3>
      <TextField name='id' className={styles.inputMaterial} label="Identicador" onChange={handleChange} defaultValue={selectedPiece && selectedPiece.id} InputProps={{readOnly: true}}></TextField>
      <TextField name='name' className={styles.inputMaterial} label="Nombre" onChange={handleChange} defaultValue={selectedPiece && selectedPiece.name}></TextField>
      <TextField name='type' className={styles.inputMaterial} label="Tipo" onChange={handleChange} defaultValue={selectedPiece && selectedPiece.type}></TextField>
      <TextField name='stock' className={styles.inputMaterial} label="Cantidad" onChange={handleChange} defaultValue={selectedPiece && selectedPiece.stock}></TextField>
      <TextField name='color' className={styles.inputMaterial} label="Color" onChange={handleChange} defaultValue="None" InputProps={{readOnly: true}}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>Estas seguro que deseas eliminar la pieza {selectedPiece && selectedPiece.name}?</p>
      <div align="right">
      <Button color="secondary" onClick={deletePiece}>Si</Button>
      <Button onClick={()=>openCloseDeleteModal()}>No</Button>
      </div>

    </div>

  )

  return (
    <div>
      <ToastContainer />
      <div className="btnInsert">
      <Button className='btnInsertar' onClick={()=>openCloseIsertModal()}>
        Insertar
      </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Article ID</b></TableCell>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Tipo</b></TableCell>
            <TableCell><b>Cantidad</b></TableCell>
            <TableCell><b>Color</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(Piece=>
              (
                <TableRow key={Piece.id}>
                  <TableCell>{Piece.id}</TableCell>
                  <TableCell>{Piece.id_article}</TableCell>
                  <TableCell>{Piece.name}</TableCell>
                  <TableCell>{Piece.type}</TableCell>
                  <TableCell>{Piece.stock}</TableCell>
                  <TableCell>{Piece.color}</TableCell>
                  <TableCell>
                    <Edit className={styles.iconos} onClick={()=>selectPiece(Piece,'Editar')}  />
                    &nbsp;&nbsp;&nbsp;
                    <Delete  className={styles.iconos} onClick={()=>selectPiece(Piece,'Elminar')}/>
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
        count={stock.length}
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

export default Tablestock