import {React,useEffect,useState} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {carEdit, carDelete, carCreate} from '../../api/article.api'
import { ToastContainer, toast } from 'react-toastify';
import TablePagination from "@material-ui/core/TablePagination";
import Select from 'react-select'
import Cookies from 'universal-cookie';
import 'react-toastify/dist/ReactToastify.css';
import '../style.css'
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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '75%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: "1000",
  },
  modalcont: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto"
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

const TableCars = ({cars, copy}) => {
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

  const [selectedcar,setSelectedcar]=useState({
    brand:'',
    id:'',
    image:'',
    model:'',
    price:'',
    type:'',
    wheel:'',
    stock:'',
    color:'',
    id_article: '',
    autonomy: '',
    battery: '',
    doors: '',
    motor: '',
    power: '',
    rpm: ''
  });

  const [originalCar, setOriginalCar] = useState([]);

  const styles = useStyles();
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);
  const [search, setSearch] = useState('');

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); cleandata();}
  const openCloseEditModal=()=>{setEditModal(!EditModal); restartSelection();}
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }

  const cleandata = () =>{
    for (var key in selectedcar){
      selectedcar[key] = '';
    }

    setAlreadySelected(false);
    setAlreadySelected(false);
  }

  const restartSelection = () =>{
    for(var key in selectedcar){
      selectedcar[key] = originalCar[key];
    }
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const faltanDatos = (data) => toast("Debes brindar el dato "+dataTranslator(data));
  const notInt = () => toast("El precio y la cantidad deben ser enteros");
  const cantidadExcedida = (data, n) => toast(dataTranslator(data)+" debe constar de menos de "+n+" caracteres.");
  const idExistente = (id) => toast("Ya existe un vehículo con el VIN "+id);
  const mustBeInt = (data) => toast("El dato "+dataTranslator(data)+" debe ser entero");

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
      case 'autonomy':
        return 'Autonomia';
      case 'battery':
        return 'Bateria';
      case 'doors':
        return 'Puertas';
      case 'motor':
        return 'Motor';
      case 'power':
        return 'Potencia';
      case 'rpm':
        return 'RPM';
      default:
        console.log("Esto no debería pasar");
    }
  }

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

  const selectcar=(car, caso, org)=>{
    setSelectedcar(car);
    setOriginalCar(org);
    (caso=='Editar') ? setEditModal (true): setDeleteModal(true)
  }

  const beforeCreate = () => {verificarDatos("Crear");}
  const beforeEdit = () => {verificarDatos("Editar");}

  const verificarDatos = (act) => {
    const lengths = {id:20, id_article:5, brand:30, type:20, model:50, wheel:20, price:15, stock:5, color:30};

    if(alreadySelected == false && act == "Editar"){
      delete selectedcar.image;
    }

    if(alreadySelected == false && act == "Crear"){
      faltanDatos('image');
      return false;
    } else if(alreadySelected == true && act == "Crear"){
      delete selectedcar.image;
    }

    if(selectedcar.brand == '' && act == "Crear"){
      selectedcar.brand = 'Renault';
    }

    if(selectedcar.type == '' && act == "Crear"){
      selectedcar.type = 'Sedan';
    }

    if(selectedcar.stock == 0 && act == "Editar"){
      selectedcar.stock = '0';
    }

    if(selectedcar.color == null && act == "Editar"){
      selectedcar.color = '-';
    }

    if(act == "Crear"){
      delete selectedcar.stock;
      delete selectedcar.color;
      delete selectedcar.id_article;
      delete lengths.stock;
      delete lengths.color;
      delete lengths.id_article;
    }

    if(selectedcar.wheel == '' && act == "Crear"){
      selectedcar.wheel = 'Magnesio';
    }

    const ints = {};
    ints.autonomy = selectedcar.autonomy;
    ints.doors = selectedcar.doors;
    ints.power = selectedcar.power;
    ints.rpm = selectedcar.rpm;
    
    for ( var key in selectedcar ) {
      if(selectedcar[key] == ''){
        faltanDatos(key);
        return false;
      } else if((selectedcar[key]).length > lengths[key]){
        cantidadExcedida(key, lengths[key]);
        return false;
      } 
    }

    for(var key in ints){
      if(Number.isInteger(parseInt(ints[key])) == false){
        mustBeInt(key);
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

  const createFormData = (act) => {
    delete selectedcar.image;
    try {
      selectedcar.price = parseInt(selectedcar.price);
      
      if(act == 'Editar'){
        selectedcar.stock = parseInt(selectedcar.stock);
      }      
      
      const formData = new FormData();
      for ( var key in selectedcar ) {
        formData.append(key, selectedcar[key]);
      }
  
      if(selectedImage != null){
        formData.append('image', selectedImage);
      } 
      
      if(act == 'Crear'){
        formData.append('id_article', JSON.stringify({'stock': null, 'color': null}));
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
      await carDelete({'id_article': selectedcar.id_article}, selectedcar.id, cookies.get('user').branch);
      window.location.reload(false);
  }

  const editcar = async () => {
    await carEdit(createFormData('Editar'), selectedcar.id, cookies.get('user').branch); 
    window.location.reload(false);
  }

  const createcar = async () => {
    try {
      await carCreate(createFormData('Crear')); 
      window.location.reload(false);
    } catch (error) {
      idExistente(selectedcar.id);
    }   
  }

  const [alreadySelected, setAlreadySelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setAlreadySelected(true);
    setAlreadySelected(true);
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
    <div className={styles.modalcont}>
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
        <TextField name='autonomy' className={styles.inputMaterial} label="Autonomia" onChange={handleChange}></TextField>
        <TextField name='battery' className={styles.inputMaterial} label="Bateria" onChange={handleChange}></TextField>
        <TextField name='doors' className={styles.inputMaterial} label="Puertas" onChange={handleChange}></TextField>
        <TextField name='motor' className={styles.inputMaterial} label="Motor" onChange={handleChange}></TextField>
        <TextField name='power' className={styles.inputMaterial} label="Potencia" onChange={handleChange}></TextField>
        <TextField name='rpm' className={styles.inputMaterial} label="RPM" onChange={handleChange}></TextField>
        <div align="right">
        <Button color="primary" onClick={beforeCreate}>Insertar</Button>
        <Button onClick={()=>openCloseIsertModal()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

    const EditBody=(
    <div className={styles.modalcont}>
      <div className={styles.modal}>
        <h3>Editar vehiculo</h3>
        <label className={styles.inputMaterial}>Marca</label>
        <Select options={marcas} onChange={handleBrandChange} defaultValue={marcas[searchIndex(originalCar.brand, marcas)]}/>
        <TextField name='id' className={styles.inputMaterial} label="ID" onChange={handleChange} defaultValue={selectedcar && selectedcar.id} InputProps={{readOnly: true}}></TextField>
        <label className={styles.inputMaterial}>Imagen</label>
        <input type="file" id="img" name="image" accept="image/*" onChange={handleImageChange} label="Image"></input>
        <TextField name='model' className={styles.inputMaterial} label="Modelo" onChange={handleChange} defaultValue={selectedcar && selectedcar.model} ></TextField>
        <TextField name='price' className={styles.inputMaterial} label="Precio" onChange={handleChange} defaultValue={selectedcar && selectedcar.price}></TextField>
        <label className={styles.inputMaterial}>Tipo</label>
        <Select options={tipos} onChange={handleTypeChange} defaultValue={tipos[searchIndex(originalCar.type, tipos)]}/>
        <label className={styles.inputMaterial}>Llanta</label>
        <Select options={llantas} onChange={handleWheelChange} defaultValue={llantas[searchIndex(originalCar.wheel, llantas)]}/>
        <TextField name='stock' className={styles.inputMaterial} label="Cantidad" onChange={handleChange} defaultValue={selectedcar && selectedcar.stock}></TextField>
        <TextField name='color' className={styles.inputMaterial} label="Color" onChange={handleChange} defaultValue={selectedcar && selectedcar.color}></TextField>
        <TextField name='id' className={styles.inputMaterial} label="ID Article" onChange={handleChange} defaultValue={selectedcar && selectedcar.id_article} InputProps={{readOnly: true}}></TextField>
        <TextField name='autonomy' className={styles.inputMaterial} label="Autonomia" onChange={handleChange} defaultValue={selectedcar && selectedcar.autonomy}></TextField>
        <TextField name='battery' className={styles.inputMaterial} label="Bateria" onChange={handleChange} defaultValue={selectedcar && selectedcar.battery}></TextField>
        <TextField name='doors' className={styles.inputMaterial} label="Puertas" onChange={handleChange} defaultValue={selectedcar && selectedcar.doors}></TextField>
        <TextField name='motor' className={styles.inputMaterial} label="Motor" onChange={handleChange} defaultValue={selectedcar && selectedcar.motor}></TextField>
        <TextField name='power' className={styles.inputMaterial} label="Potencia" onChange={handleChange} defaultValue={selectedcar && selectedcar.power}></TextField>
        <TextField name='rpm' className={styles.inputMaterial} label="RPM" onChange={handleChange} defaultValue={selectedcar && selectedcar.rpm}></TextField>
        <div align="right">
        <Button color="primary" onClick={beforeEdit}>Editar</Button>
        <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>¿Estas seguro que deseas eliminar el vehiculo {selectedcar && originalCar.brand} con VIN {selectedcar && selectedcar.id}?</p>
      <div align="right">
      <Button color="secondary" onClick={deletecar}>Si</Button>
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
            <TableCell><b>Autonomia</b></TableCell>
            <TableCell><b>Bateria</b></TableCell>
            <TableCell><b>Puertas</b></TableCell>
            <TableCell><b>Motor</b></TableCell>
            <TableCell><b>Potencia</b></TableCell>
            <TableCell><b>RPM</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {copy.filter((car) => {
          return search.toLowerCase() === ''
            ? car
            : car.brand.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase());
        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(car=>
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
                  <TableCell>{car.autonomy+' h'}</TableCell>
                  <TableCell>{car.battery}</TableCell>
                  <TableCell>{car.doors}</TableCell>
                  <TableCell>{car.motor}</TableCell>
                  <TableCell>{car.power}</TableCell>
                  <TableCell>{car.rpm}</TableCell>
                  {manager &&
                    <TableCell>
                      <Edit className={styles.iconos} onClick={()=>selectcar((cars.filter((cr) => cr.id == car.id))[0], 'Editar', car)}  />
                      &nbsp;&nbsp;&nbsp;
                      <Delete className={styles.iconos} onClick={()=>selectcar((cars.filter((cr) => cr.id == car.id))[0], 'Elminar', car)}/>
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