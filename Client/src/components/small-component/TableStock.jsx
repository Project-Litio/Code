import {React,useState,useEffect} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {stockEdit, stockDelete, stockCreate} from '../../api/article.api'
import TablePagination from "@material-ui/core/TablePagination";
import '../style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: {
      sm:300,
      md:500
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
}));

const Tablestock = ({stock}) => {
  const [manager, setManager] = useState(false);
  const logged = () => {
    if(cookies.get('user') != undefined){
      if(cookies.get('user').role == "Man"){
        setManager(true);
      }
    }
  };

  useEffect(() => {
    logged();
  }, [cookies]);

  const styles = useStyles();
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); cleandata()}
  const openCloseEditModal=()=>{setEditModal(!EditModal); }
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }

  const cleandata = () =>{
    for (var key in selectedPiece){
      selectedPiece[key] = '';
    }
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const faltanDatos = (data) => toast("Debes brindar el dato "+dataTranslator(data));
  const cantidadExcedida = (data, n) => toast(dataTranslator(data)+" debe constar de menos de "+n+" caracteres.");
  const notInt = () => toast("La cantidad debe ser un entero");

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
    id_article:''
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
    const lengths = {id:10, name:100, type:50, stock:4, id_article:5};
    delete selectedPiece.color;
    if(act == "Crear"){
      delete selectedPiece.id;
      delete selectedPiece.stock;
      delete selectedPiece.id_article;
      delete lengths.id;
      delete lengths.stock;
      delete lengths.id_article;
    }

    if(selectedPiece.stock == 0){
      selectedPiece.stock = '0';
    }

    for (var key in selectedPiece) {
      if(selectedPiece[key] == ''){
        faltanDatos(key);
        return false;
      } else if((selectedPiece[key]).length > lengths[key]){
        cantidadExcedida(key, lengths[key]);
        return false;
      } 
    }

    if(act == "Crear"){
      createPiece();
    } else if(act == "Editar"){
      editPiece();
    } else {
      deletePiece();
    }
  }

  const createFormData = () => {
    try {
      selectedPiece.stock = parseInt(selectedPiece.stock);
      return selectedPiece;
    } catch (error) {
      notInt();
    }    
  }

  const deletePiece = async () => {
    await stockDelete({'id_article': selectedPiece.id_article}, selectedPiece.id, cookies.get('user').branch);
    window.location.reload(false);
  }

  const editPiece = async () => {
    await stockEdit(createFormData(), selectedPiece.id, cookies.get('user').branch);
    window.location.reload(false);
  }

  const createPiece = async () => {
    await stockCreate(createFormData());
    window.location.reload(false);
  }

  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Pieza</h3>
      <TextField name='name' className={styles.inputMaterial} label="Nombre" onChange={handleChange}></TextField>
      <TextField name='type' className={styles.inputMaterial} label="Tipo" onChange={handleChange}></TextField>
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
      <TextField name='id' className={styles.inputMaterial} label="Article ID" onChange={handleChange} defaultValue={selectedPiece && selectedPiece.id_article} InputProps={{readOnly: true}}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>¿Estas seguro que deseas eliminar la pieza {selectedPiece && selectedPiece.name} con ID {selectedPiece && selectedPiece.id}?</p>
      <div align="right">
      <Button color="secondary" onClick={deletePiece}>Si</Button>
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
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Article ID</b></TableCell>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Tipo</b></TableCell>
            <TableCell><b>Cantidad</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.filter((part) => {
          return search.toLowerCase() === ''
            ? part
            : part.name.toLowerCase().includes(search.toLowerCase()) || part.type.toLowerCase().includes(search.toLowerCase())  ;
        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(Piece=>
              (
                <TableRow key={Piece.id}>
                  <TableCell>{Piece.id}</TableCell>
                  <TableCell>{Piece.id_article}</TableCell>
                  <TableCell>{Piece.name}</TableCell>
                  <TableCell>{Piece.type}</TableCell>
                  <TableCell>{Piece.stock}</TableCell>
                  {manager &&
                    <TableCell>
                      <Edit className={styles.iconos} onClick={()=>selectPiece(Piece,'Editar')}  />
                      &nbsp;&nbsp;&nbsp;
                      <Delete  className={styles.iconos} onClick={()=>selectPiece(Piece,'Elminar')}/>
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