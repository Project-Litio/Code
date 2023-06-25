import {React,useEffect,useState} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {carEdit, carDelete, carCreate} from '../../api/article.api'
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

const marcas = [
  { value: 'Renault', label: 'Renault' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Mazda', label: 'Mazda' },
  { value: 'Audi', label: 'Audi' },
  { value: 'Mercedes Benz', label: 'Mercedes Benz' },
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Jac', label: 'Jac' },
  { value: 'Hummer', label: 'Hummer' },
  { value: 'Mitsubishi', label: 'Mitsubishi' },
  { value: 'Byd', label: 'Byd' }
]

const llantas = [
  { value: 'Magnesio', label: 'Magnesio' },
  { value: 'Aluminio', label: 'Aluminio' },
  { value: 'Aleacion', label: 'Aleacion' },
  { value: 'Acero', label: 'Acero' }
]

const tipos = [
  { value: 'Sedan', label: 'Sedan' },
  { value: 'Hatchback', label: 'Hatchback' },
  { value: 'Coupe', label: 'Coupe' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Station Wagon', label: 'Station Wagon' },
  { value: 'Crossover', label: 'Crossover' },
  { value: 'Convertible', label: 'Convertible' },
  { value: 'MPV', label: 'MPV' },
  { value: 'Pick up', label: 'Pick up' }
]

const TableCars = ({cars}) => {

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
  const notInt = () => toast("El precio y la cantidad deben ser enteros");

  const dataTranslator = (data) => {
    switch (data) {
      case 'brand':
        return 'Marca';
      case 'id':
        return 'VIN';
      case 'image':
        return 'Imagen';
      case 'model':
        return 'Modelo';
      case 'price':
        return 'Precio';
      case 'type':
        return 'Tipo';
      case 'wheel':
        return 'Llanta';
      case 'stock':
        return 'Cantidad';
      case 'color':
        return 'Color';
      default:
        console.log("Esto no debería pasar");
    }
  }

  const [selectedcar,setSelectedcar]=useState({
    brand:'',
    id:'',
    image:'',
    model:'',
    price:'',
    type:'',
    wheel:'',
    stock:'',
    color:''
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
    setSelectedcar(car);
    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  const beforeCreate = () => {verificarDatos("Crear");}
  const beforeEdit = () => {verificarDatos("Editar");}

  const verificarDatos = (act) => {
    if(selectedcar.image == '' && act == "Editar"){
      delete selectedcar.image;
    }

    if(selectedcar.brand == '' && act == "Crear"){
      selectedcar.brand = 'Renault';
    }

    if(selectedcar.type == '' && act == "Crear"){
      selectedcar.type = 'Sedan';
    }

    if(selectedcar.wheel == '' && act == "Crear"){
      selectedcar.wheel = 'Magnesio';
    }
    
    for ( var key in selectedcar ) {
      if(selectedcar[key] == ''){
        faltanDatos(key);
        return false;
      }
    }

    if(act == "Crear"){
      createcar();
    } else if(act == "Editar"){
      editcar();
    } else {
      deletecar();
    }
  }

  const createFormData = () => {
    delete selectedcar.image;
    try {
      selectedcar.price = parseInt(selectedcar.price);
      selectedcar.stock = parseInt(selectedcar.stock);
      const formData = new FormData();
      for ( var key in selectedcar ) {
        formData.append(key, selectedcar[key]);
      }
  
      if(selectedImage != null){
        formData.append('image', selectedImage);
      } 
      
      formData.append('id_article', JSON.stringify({"stock": selectedcar.stock, "color": selectedcar.color}));
  
      for (const key of formData.keys()) {
        console.log(key);
      }
      for (const value of formData.values()) {
        console.log(value);
      }

      return formData;

    } catch (error) {
      notInt();
    }
  }

  const deletecar = async () => {
    await carDelete({}, selectedcar.id);
    window.location.reload(false);
  }

  const editcar = async () => {
    await carEdit(createFormData(), selectedcar.id); 
    window.location.reload(false);
  }

  const createcar = async () => {
    await carCreate(createFormData()); 
    window.location.reload(false);
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    selectedcar.image = 'some';
  };

  const handleBrandChange = (selectedOption) => {
    selectedcar['brand'] = selectedOption.value;
  };

  const handleTypeChange = (selectedOption) => {
    selectedcar['type'] = selectedOption.value;
  };

  const handleWheelChange = (selectedOption) => {
    selectedcar['wheel'] = selectedOption.value;
  };

  const searchIndex = (elem, array) => {
    for(var key in array){
      if(array[key].value == elem){
        return key;
      } 
    }
  }

  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo vehiculo</h3>
      <label className={styles.inputMaterial}>Marca</label>
      <Select options={marcas} onChange={handleBrandChange} defaultValue={marcas[0]}/>
      <TextField name='id' className={styles.inputMaterial} label="VIN" onChange={handleChange}></TextField>
      <label className={styles.inputMaterial}>Imagen</label>
      <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className={styles.inputMaterial}/>
      <TextField name='model' className={styles.inputMaterial} label="Modelo" onChange={handleChange}></TextField>
      <TextField name='price' className={styles.inputMaterial} label="Precio" onChange={handleChange}></TextField>
      <label className={styles.inputMaterial}>Tipo</label>
      <Select options={tipos} onChange={handleTypeChange} defaultValue={tipos[0]}/>
      <label className={styles.inputMaterial}>Llanta</label>
      <Select options={llantas} onChange={handleWheelChange} defaultValue={llantas[0]}/>
      <TextField name='stock' className={styles.inputMaterial} label="Cantidad" onChange={handleChange} ></TextField>
      <TextField name='color' className={styles.inputMaterial} label="Color" onChange={handleChange}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeCreate}>Insertar</Button>
      <Button onClick={()=>openCloseIsertModal()}>Cancelar</Button>
      </div>
    </div>
  )

    const EditBody=(
    <div className={styles.modal}>
      <h3>Editar vehiculo</h3>
      <label className={styles.inputMaterial}>Marca</label>
      <Select options={marcas} onChange={handleBrandChange} defaultValue={marcas[searchIndex(selectedcar.brand, marcas)]}/>
      <TextField name='id' className={styles.inputMaterial} label="ID" onChange={handleChange} defaultValue={selectedcar && selectedcar.id} InputProps={{readOnly: true}}></TextField>
      <label className={styles.inputMaterial}>Imagen</label>
      <input type="file" id="img" name="image" accept="image/*" onChange={handleImageChange} label="Image"></input>
      <TextField name='model' className={styles.inputMaterial} label="Modelo" onChange={handleChange} defaultValue={selectedcar && selectedcar.model} ></TextField>
      <TextField name='price' className={styles.inputMaterial} label="Precio" onChange={handleChange} defaultValue={selectedcar && selectedcar.price}></TextField>
      <label className={styles.inputMaterial}>Tipo</label>
      <Select options={tipos} onChange={handleTypeChange} defaultValue={tipos[searchIndex(selectedcar.type, tipos)]}/>
      <label className={styles.inputMaterial}>Llanta</label>
      <Select options={llantas} onChange={handleWheelChange} defaultValue={llantas[searchIndex(selectedcar.wheel, llantas)]}/>
      <TextField name='stock' className={styles.inputMaterial} label="Cantidad" onChange={handleChange} defaultValue={selectedcar && selectedcar.stock}></TextField>
      <TextField name='color' className={styles.inputMaterial} label="Color" onChange={handleChange} defaultValue={selectedcar && selectedcar.color}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
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
            <TableCell><b>Marca</b></TableCell>
            <TableCell><b>Article ID</b></TableCell>
            <TableCell><b>VIN</b></TableCell>
            <TableCell><b>Imagen</b></TableCell>
            <TableCell><b>Modelo</b></TableCell>
            <TableCell><b>Precio</b></TableCell>
            <TableCell><b>Tipo</b></TableCell>
            <TableCell><b>Llanta</b></TableCell>
            <TableCell><b>Cantidad</b></TableCell>
            <TableCell><b>Color</b></TableCell>
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
                  <TableCell>{car.stock}</TableCell>
                  <TableCell>{car.color}</TableCell>
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