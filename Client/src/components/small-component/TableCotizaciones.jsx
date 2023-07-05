import {React,useState,useEffect} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField, ExpansionPanel} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {cotizEdit, cotizDelete, cotizCreate, cotizTotal, editCotizDetail, deleteCotizDetail, quotationToBill} from '../../api/order.api'
import {getCustomers} from '../../api/login.api'
import { getAllCars, getCars } from '../../api/article.api';
import TablePagination from "@material-ui/core/TablePagination";
import '../style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import CheckIcon from '@material-ui/icons/Check';
import BuyCard from '../vehicle/BuyCard';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const timer = ms => new Promise(res => setTimeout(res, ms))

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

const TableCotizaciones = ({cotiz, copy}) => {
  const [employee, setEmployee] = useState(true);
  const [pago, setPago] = useState(false);
  const repeated = {};
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [stock, setStock] = useState([]);
  const loaded = async () => {
    if(cookies.get('user').role == 'Cliente'){
      setEmployee(false);
      await timer(1000);
      const car = (await getAllCars()).data.map(elem => ({value: elem.id, label: elem.brand+' '+elem.model, stock: elem.stock}));
      setCars((car.filter(elem => elem.stock != 0)).map(el => ({value: el.value, label: el.label})));
    } else {
      await timer(1000);
      const cus = (await getCustomers()).data.data.map(elem => ({value: elem.id, label: elem.id}));
      await timer(1000);
      const car = (await getCars(cookies.get('user').branch)).data.data.map(elem => ({value: elem.id, label: elem.brand+' '+elem.model, stock: elem.stock}));
      setStock(car);
      setCars((car.filter(elem => elem.stock != 0)).map(el => ({value: el.value, label: el.label})));
      setCustomers(cus); 
    }
  };

  useEffect(() => {
    loaded();
  }, []);

  const styles = useStyles();
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); resetquot();}
  const openCloseEditModal=()=>{setEditModal(!EditModal); restartSelection();}
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const faltanDatos = (data) => toast("Debes brindar el dato "+dataTranslator(data));
  const faltanArticulos = (data) => toast("La cotización debe tener al menos un artículo");
  const facturaCancelada = () => toast("La factura fue cancelada");

  const resetquot = () =>{
    selectedCotization.quotation_details = [];
    selectedCotization.id_car = '';
    selectedCotization.observation = '';
  }

  const [originalCotization, setOriginalCotization] = useState([]);

  const restartSelection = () =>{
    for(var key in selectedCotization){
      selectedCotization[key] = originalCotization[key];
    }
    quotation.quotation_details = [];
  }

  const dataTranslator = (data) => {
    switch (data) {
      case 'id_employee':
        return 'ID Empleado';
      case 'id_customer':
        return 'ID Cliente';
      case 'observation':
        return 'Observacion';
      default:
        console.log("Esto no debería pasar");
    }
  }

  const [quotation] = useState({quotation_details:[]});
  const [selectedCotization,setSelectedCotization]=useState({
    id:'',
    date:'',
    id_customer:'',
    id_employee:'',
    observation:'',
    quotation_details:[],
    total:'',
    id_car:''
  });

  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedCotization(
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
    rowsPerPage - Math.min(rowsPerPage, cotiz.length - page * rowsPerPage);

  const selectCotization=(quot, caso, org)=>{
    setSelectedCotization(quot);
    setOriginalCotization(org);

    if(caso == 'Editar'){
      setEditModal (true);
      setTimeout(insertText,500,quot);
    } else if(caso == 'Esperar') {
      setP();
    } else {
      setDeleteModal(true);
    }
  }

  const beforeCreate = () => {verificarDatos("Crear");}
  const beforeEdit = () => {verificarDatos("Editar");}

  const addToRepeated = (elem) =>{
    if(repeated.hasOwnProperty(''+elem.id_car+'')){
      repeated[''+elem.id_car+''] = parseInt(repeated[''+elem.id_car+'']) + parseInt(elem.amount);
    } else {
      repeated[''+elem.id_car+''] = parseInt(elem.amount);
    }
  }

  const crearFactura = async () => {
    if(checkStock(selectedCotization.quotation_details)){
      console.log(await quotationToBill(selectedCotization.id));
      window.location.reload();     
    } else {
      facturaCancelada();
    }
  }

  const checkStock = (arr) => {
    for (let index = 0; index < arr.length; index++) {
      var elements = stock.filter(elem => elem.value == arr[index].id_car);
      if(elements.length != 0){
        if(elements[0].stock - arr[index].amount < 0){
          noHayVehiculos(elements[0].label, elements[0].stock);
          return false;
        }
      } else {
        continue;
      }
    }

    return true;
  }

  const quotationSum = () =>{
    if(InsertModal){
      selectedCotization.quotation_details.map(elem => addToRepeated(elem));
      selectedCotization.quotation_details = [];
  
      for(var key in repeated){
        selectedCotization.quotation_details.push({amount: repeated[key],
        id_car: key,
        id_quotation: selectedCotization.id})
      }
    } else {
      quotation.quotation_details.map(elem => addToRepeated(elem));
      quotation.quotation_details = [];
  
      for(var key in repeated){
        quotation.quotation_details.push({amount: repeated[key],
        id_car: key,
        id_quotation: selectedCotization.quotation_details[0].id_quotation});
      }
    }
  }

  const verificarDatos = (act) => {
    if(act == "Crear"){
      if(selectedCotization.id_customer == ""){
        selectedCotization.id_customer = customers[0].value;
      }
      
      if(selectedCotization.id_employee == ""){
        selectedCotization.id_employee = cookies.get('user').id;
      }

      if(selectedCotization.quotation_details == ""){
        faltanArticulos();
        return false;
      } 
    }

    if(act == 'Editar' && quotation.quotation_details == '' || quotation.quotation_details == undefined){
      faltanArticulos();
      return false;
    }

    delete selectedCotization.id;
    delete selectedCotization.total;
    delete selectedCotization.id_car;
    delete selectedCotization.date;

    for ( var key in selectedCotization ) {
      if(selectedCotization[key] == ''){
        faltanDatos(key);
        return false;
      }
    }

    if(act == "Crear"){
      createCotization();
    } else if(act == "Editar"){
      editCotization();
    } else {
      deleteCotization();
    }
  }

  const deleteCotization = async () => {
    await cotizDelete({}, selectedCotization.quotation_details[0].id_quotation);
    window.location.reload(false);
  }

  const editCotizationDetail = async (elem, id) => {
    console.log(await editCotizDetail(elem, id));
  }

  const deleteCotizationDetail = async (elem, id) => {
    console.log(await deleteCotizDetail(elem, id));
  }

  const editCotization = async () => {
    console.log(await cotizEdit(selectedCotization, selectedCotization.quotation_details[0].id_quotation));
    quotationSum();
    console.log(quotation.quotation_details);
    const editTemp = selectedCotization.quotation_details.map(elem => elem.id_car);
    const indexTemp = editTemp.map(elem => quotation.quotation_details.findIndex(el => el.id_car == elem));
    for (var i = 0, len = indexTemp.length; i < len; i++) {
      if(indexTemp[i] != -1){
        editCotizationDetail(quotation.quotation_details[indexTemp[i]], selectedCotization.quotation_details[i].id);
      } else {
        deleteCotizationDetail({}, selectedCotization.quotation_details[i].id);
      }
    }
    (indexTemp.filter(elem => elem != -1)).map(el => quotation.quotation_details.splice(el, 1));
    quotation.quotation_details.map(elem => countTotal(elem));
    window.location.reload(false);
  }

  const countTotal = async (elem) => {
    await cotizTotal(elem);
  }

  const createCotization = async () => {
    selectedCotization.id = (await cotizCreate(selectedCotization)).data.id;
    quotationSum();
    selectedCotization.quotation_details.map(elem => countTotal(elem));
    window.location.reload();
  }

  const handleClientChange = (selectedOption) => {
    selectedCotization['id_customer'] = selectedOption.value;
  };

  const handleCarChange = (selectedOption) => {
    selectedCotization['id_car'] = selectedOption.value;
  };

  const deleteFromList = e => {
    var list = document.getElementById("lst");
    if(InsertModal){
      selectedCotization.quotation_details.splice(e.target.id, 1);
    } else {
      quotation.quotation_details.splice(e.target.id, 1);
    }
    
    list.removeChild(document.getElementById(e.target.id));
    list.removeChild(document.getElementById(e.target.id));
  }

  function addEventListenerList(list) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener('click', deleteFromList);
    }
  }

  const searchIndex = (elem, array) => {
    for(var key in array){
      if(array[key].value == elem){
        return key;
      } 
    }
    return 0;
  }

  const insertText = (cot) => {
    for(var index = 0, len = cot.quotation_details.length; index < len; index++){
      quotation.quotation_details.push(cot.quotation_details[index]);
    }

    const obj = quotation.quotation_details.map(elem => findCar(elem));
    for(var i = 0, len = obj.length; i < len; i++){
        var br = document.createElement('br');
        var label = document.createElement('label');
        label.textContent = obj[i];
        label.setAttribute('className', 'note');
        label.setAttribute('name', 'note');
        label.setAttribute('id', i);
        br.setAttribute('id', i);
        var list = document.getElementById("lst");
        list.appendChild(label);
        list.appendChild(br);
        var list = document.getElementsByName('note');
        addEventListenerList(list);
    }
  }

  const findCar = (car) => {
    return filterCar(car.id_car) +' x'+car.amount;
  }

  const addToQuotation = () => {
    if(selectedCotization.id_car == '' || selectedCotization.id_car == undefined){
      selectedCotization.id_car = cars[0].value;
    }

    const obj = {amount: document.getElementById("amount").value,
                 id_car: selectedCotization.id_car,
                 id_quotation: selectedCotization.id}

    if(InsertModal){
      selectedCotization.quotation_details.push(obj);
      var name = selectedCotization.quotation_details.length -1;
    } else {
      quotation.quotation_details.push(obj);
      var name = quotation.quotation_details.length -1;
    }
    
    var element = (cars.filter(elem => elem.value == selectedCotization.id_car))[0];    
    var br = document.createElement('br');
    var label = document.createElement('label');
        label.textContent = element.label +' x'+document.getElementById("amount").value;
        label.setAttribute('className', 'note');
        label.setAttribute('name', 'note');
        label.setAttribute('id', name);
        br.setAttribute('id', name);
        var list = document.getElementById("lst")
        list.appendChild(label);
        list.appendChild(br);
    var list = document.getElementsByName('note');
        addEventListenerList(list);
  }

  const filterCar = (element) => {
    if(cars.length != 0){
      return (cars.filter(elem => elem.value == element)[0]).label;
    } else {
      return element;
    }
  }

  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Cotizacion</h3>
      <br></br>
      <TextField name='id_employee' className={styles.inputMaterial} label="ID Empleado" onChange={handleChange} defaultValue={cookies.get('user').id} InputProps={{readOnly: true}}></TextField>
      <br></br><br></br>
      <label className={styles.inputMaterial}>ID Cliente</label>
      <Select options={customers} onChange={handleClientChange} defaultValue={customers[0]}/>
      <br></br>
      <div>
        <label className={styles.inputMaterial}>Articulos</label>
        <Select options={cars} onChange={handleCarChange} defaultValue={cars[0]}/>
        <input type="number" id="amount" name="amount" min="1" max="10" className='counter' defaultValue='1'></input>
        <button className='btnPlus' onClick={addToQuotation}><CheckIcon></CheckIcon></button>
      </div>
      <br></br>
      <div id="lst" className='lst'>
        <h5 className={styles.inputMaterial}><strong>En la lista:</strong></h5>       
      </div>
      <br></br>
      <TextField name='observation' className={styles.inputMaterial} label="Observación" onChange={handleChange}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeCreate}>Insertar</Button>
      <Button onClick={()=>openCloseIsertModal()}>Cancelar</Button>
      </div>
    </div>
  )

    const EditBody=(
    <div className={styles.modal}>
      <h3>Editar Cotizacion</h3>
      <TextField name='id' className={styles.inputMaterial} label="ID Cotizacion" onChange={handleChange} defaultValue={originalCotization.id} InputProps={{readOnly: true}}></TextField>
      <br></br>
      <TextField name='id_employee' className={styles.inputMaterial} label="ID Empleado" onChange={handleChange} defaultValue={originalCotization.id_employee} InputProps={{readOnly: true}}></TextField>
      <br></br><br></br>
      <label className={styles.inputMaterial}>ID Cliente</label>
      <Select options={customers} onChange={handleClientChange} defaultValue={customers[searchIndex(originalCotization.id_customer, customers)]}/>
      <br></br>
      <div>
        <label className={styles.inputMaterial}>Articulos</label>
        <Select options={cars} onChange={handleCarChange} defaultValue={cars[0]}/>
        <input type="number" id="amount" name="amount" min="1" max="10" className='counter' defaultValue='1'></input>
        <button className='btnPlus' onClick={addToQuotation}><CheckIcon></CheckIcon></button>
      </div>
      <br></br>
      <div id="lst" className='lst'>
        <h5 className={styles.inputMaterial}><strong>En la lista:</strong></h5>       
      </div>
      <br></br>
      <TextField name='observation' className={styles.inputMaterial} label="Observación" onChange={handleChange} defaultValue={originalCotization.observation}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>¿Estas seguro que deseas eliminar la cotizacion con id {selectedCotization && selectedCotization.id}?</p>
      <div align="right">
      <Button color="secondary" onClick={deleteCotization}>Si</Button>
      <Button onClick={()=>openCloseDeleteModal()}>No</Button>
      </div>

    </div>
  )

  const setP = () =>{
    setPago(true);
  }

  return (
    <div>
      {!pago &&
        <div>
          <ToastContainer />
          {employee &&
            <div className="btnInsert">
            <Button className='btnInsertar' onClick={()=>openCloseIsertModal()}>
              Insertar
            </Button>
            </div>
          }
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>ID Cliente</b></TableCell>
                <TableCell><b>ID Empleado</b></TableCell>
                <TableCell><b>Articulos</b></TableCell>
                <TableCell><b>Observacion</b></TableCell>
                <TableCell><b>Total</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {copy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(Cotization=>
                  (
                    <TableRow key={Cotization.id}>
                      <TableCell>{Cotization.id}</TableCell>
                      <TableCell>{Cotization.id_customer}</TableCell>
                      <TableCell>{Cotization.id_employee}</TableCell>
                      <TableCell>{Cotization.quotation_details.map(elem => filterCar(elem.id_car)+' x '+elem.amount+',   ')}</TableCell>
                      <TableCell>{Cotization.observation}</TableCell>
                      <TableCell>{Cotization.total}</TableCell>
                      {employee &&
                        <TableCell>
                          <Edit className={styles.iconos} onClick={()=>selectCotization((cotiz.filter((cot) => cot.id == Cotization.id))[0],'Editar',Cotization)}  />
                          &nbsp;&nbsp;&nbsp;
                          <Delete  className={styles.iconos} onClick={()=>selectCotization((cotiz.filter((cot) => cot.id == Cotization.id))[0],'Elminar',Cotization)}/>
                        </TableCell>
                      }
                      {!employee && 
                        <TableCell>
                          <button className='buttonC' onClick={()=>selectCotization((cotiz.filter((cot) => cot.id == Cotization.id))[0],'Esperar',Cotization)}>Pagar</button>
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
            count={cotiz.length}
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
      }
      {pago &&
        <div>
          <BuyCard></BuyCard>
          <div className="d-grid">
            <button className="btn btn-dark" onClick={crearFactura}>Confirmar</button>
          </div>
        </div>
      }
    </div>
  )
}

export default TableCotizaciones