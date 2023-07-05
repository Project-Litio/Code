import {React,useState,useEffect} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField, ExpansionPanel} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {billEdit, billDelete, billCreate, billTotal, editBillDetail, deleteBillDetail} from '../../api/order.api'
import {getCustomers} from '../../api/login.api'
import { getCars, getAllCars } from '../../api/article.api';
import TablePagination from "@material-ui/core/TablePagination";
import '../style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import CheckIcon from '@material-ui/icons/Check';

import Cookies from 'universal-cookie';
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

const TableFacturas = ({bills, copy}) => {
  const [employee, setEmployee] = useState(true);
  var repeated = {};
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

  const metodos = [{value: 'EF', label: 'Efecty'}, {value: 'TC', label: 'Tarjeta de Credito'}, {value: 'PS', label: 'PSE'}];

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
  const faltanArticulos = () => toast("La factura debe tener al menos un artículo");
  const noHayVehiculos = (car, qua) => toast("Solo hay "+qua+" unidades disponibles del vehiculo "+car);
  const facturaCancelada = () => toast("La factura fue cancelada");
  const edicionCancelada = () => toast("La edición de factura fue cancelada");
  const comienzo = () => toast("Por favor espere, esta operación tomará unos segundos");
  const espere = () => toast("Estamos a punto de terminar");

  const resetquot = () =>{
    selectedBill.bill_details = [];
    selectedBill.id_car = '';
    selectedBill.observation = '';
  }

  const [originalBill, setOriginalBill] = useState([]);

  const restartSelection = () =>{
    for(var key in selectedBill){
      selectedBill[key] = originalBill[key];
    }
    bill.bill_details = [];
  }

  const dataTranslator = (data) => {
    switch (data) {
      case 'id_employee':
        return 'ID Empleado';
      case 'id_customer':
        return 'ID Cliente';
      case 'observation':
        return 'Observacion';
      case 'payment_method':
        return 'Metodo de Pago';
      default:
        console.log("Esto no debería pasar");
    }
  }

  const [bill] = useState({bill_details:[]});
  const [selectedBill,setSelectedBill]=useState({
    id:'',
    date:'',
    id_customer:'',
    id_employee:'',
    observation:'',
    bill_details:[],
    total:'',
    id_car:'',
    payment_method:''
  });

  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedBill(
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
    rowsPerPage - Math.min(rowsPerPage, bills.length - page * rowsPerPage);

  const selectBill=(bll, caso, org)=>{
    setSelectedBill(bll);
    setOriginalBill(org);

    if(caso == 'Editar'){
      setEditModal (true);
      setTimeout(insertText,500,bll);
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

  const billSum = () =>{
    repeated = {};

    if(InsertModal){
      selectedBill.bill_details.map(elem => addToRepeated(elem));
      selectedBill.bill_details = [];
  
      for(var key in repeated){
        selectedBill.bill_details.push({amount: repeated[key],
        id_car: key,
        id_bill: selectedBill.id,
        id_branch: cookies.get('user').branch})
      }

    } else {
      bill.bill_details.map(elem => addToRepeated(elem));
      bill.bill_details = [];
  
      for(var key in repeated){
        bill.bill_details.push({amount: repeated[key],
        id_car: key,
        id_bill: selectedBill.bill_details[0].id_bill,
        id_branch: cookies.get('user').branch})
      }
    }
  }

  const verificarDatos = (act) => {
    if(act == "Crear"){
      if(selectedBill.id_customer == ""){
        selectedBill.id_customer = customers[0].value;
      }
      
      if(selectedBill.id_employee == ""){
        selectedBill.id_employee = cookies.get('user').id;
      }

      if(selectedBill.payment_method == ""){
        selectedBill.payment_method = metodos[0].value;
      }

      if(selectedBill.bill_details == ""){
        faltanArticulos();
        return false;
      } 
    }

    if(act == 'Editar' && bill.bill_details == '' || bill.bill_details == undefined){
      faltanArticulos();
      return false;
    }

    delete selectedBill.id;
    delete selectedBill.total;
    delete selectedBill.id_car;
    delete selectedBill.date;

    for ( var key in selectedBill ) {
      if(selectedBill[key] == ''){
        faltanDatos(key);
        return false;
      }
    }

    if(act == "Crear"){
      createBill();
    } else if(act == "Editar"){
      editBill();
    } else {
      deleteBill();
    }
  }

  const deleteBill = async () => {
    await billDelete({}, selectedBill.bill_details[0].id_bill);
    window.location.reload(false);
  }

  const delBillDetail = async (elem, id) => {
    await deleteBillDetail(elem, id);
  }

  const timer = ms => new Promise(res => setTimeout(res, ms))

  const editBill = async () => {
    console.log(await billEdit(selectedBill, selectedBill.bill_details[0].id_bill));
    billSum();
    comienzo();
    if(checkStock(bill.bill_details)){
      for (let index = 0; index < selectedBill.bill_details.length; index++) {
        delBillDetail({}, selectedBill.bill_details[index].id);
        await timer(1500);
      }     
      espere();
      for (let index = 0; index < bill.bill_details.length; index++) {
        countTotal(bill.bill_details[index]);
        await timer(1500);
        if(index == bill.bill_details.length - 1){
          await timer(2000);
          window.location.reload(false);
        }
      }
    } else {
      openCloseEditModal();
      edicionCancelada();
    }
  }

  const countTotal = async (elem) => {
    await billTotal(elem)
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

  const createBill = async () => {
    selectedBill.id = (await billCreate(selectedBill)).data.id;
    billSum();
    if(checkStock(selectedBill.bill_details)){
      selectedBill.bill_details.map(elem => countTotal(elem));
      await timer(1500);
      window.location.reload();
    } else {
      openCloseIsertModal();
      facturaCancelada();
      await billDelete({}, selectedBill.id);
    }    
  }

  const handleClientChange = (selectedOption) => {
    selectedBill['id_customer'] = selectedOption.value;
  };

  const handleCarChange = (selectedOption) => {
    selectedBill['id_car'] = selectedOption.value;
  };

  const handlePaymentChange = (selectedOption) => {
    selectedBill['payment_method'] = selectedOption.value;
  };

  const deleteFromList = e => {
    var list = document.getElementById("lst");
    if(InsertModal){
      selectedBill.bill_details.splice(e.target.id, 1);
    } else {
      bill.bill_details.splice(e.target.id, 1);
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

  const insertText = (bll) => {
    for(var index = 0, len = bll.bill_details.length; index < len; index++){
      bill.bill_details.push(bll.bill_details[index]);
    }

    const obj = bill.bill_details.map(elem => findCar(elem));
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

  const addTobill = () => {
    if(selectedBill.id_car == '' || selectedBill.id_car == undefined){
      selectedBill.id_car = cars[0].value;
    }

    const obj = {amount: document.getElementById("amount").value,
                 id_car: selectedBill.id_car,
                 id_bill: selectedBill.id}

    if(InsertModal){
      selectedBill.bill_details.push(obj);
      var name = selectedBill.bill_details.length -1;
    } else {
      bill.bill_details.push(obj);
      var name = bill.bill_details.length -1;
    }
    
    var element = (cars.filter(elem => elem.value == selectedBill.id_car))[0];    
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
      <h3>Agregar Nueva Factura</h3>
      <br></br>
      <TextField name='id_employee' className={styles.inputMaterial} label="ID Empleado" onChange={handleChange} defaultValue={cookies.get('user').id} InputProps={{readOnly: true}}></TextField>
      <br></br><br></br>
      <label className={styles.inputMaterial}>ID Cliente</label>
      <Select options={customers} onChange={handleClientChange} defaultValue={customers[0]}/>
      <br></br>
      <label className={styles.inputMaterial}>Metodo de Pago</label>
      <Select options={metodos} onChange={handlePaymentChange} defaultValue={metodos[0]}/>
      <br></br>
      <div>
        <label className={styles.inputMaterial}>Articulos</label>
        <Select options={cars} onChange={handleCarChange} defaultValue={cars[0]} id='crs'/>
        <input type="number" id="amount" name="amount" min="1" max="2" className='counter' defaultValue='1'></input>
        <button className='btnPlus' onClick={addTobill}><CheckIcon></CheckIcon></button>
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
      <h3>Editar Factura</h3>
      <TextField name='id' className={styles.inputMaterial} label="ID Factura" onChange={handleChange} defaultValue={originalBill.id} InputProps={{readOnly: true}}></TextField>
      <br></br>
      <TextField name='id_employee' className={styles.inputMaterial} label="ID Empleado" onChange={handleChange} defaultValue={originalBill.id_employee} InputProps={{readOnly: true}}></TextField>
      <br></br><br></br>
      <label className={styles.inputMaterial}>ID Cliente</label>
      <Select options={customers} onChange={handleClientChange} defaultValue={customers[searchIndex(originalBill.id_customer, customers)]}/>
      <br></br>
      <label className={styles.inputMaterial}>Metodo de Pago</label>
      <Select options={metodos} onChange={handlePaymentChange} defaultValue={metodos[searchIndex(originalBill.payment_method, metodos)]}/>
      <br></br>
      <div>
        <label className={styles.inputMaterial}>Articulos</label>
        <Select options={cars} onChange={handleCarChange} defaultValue={cars[0]}/>
        <input type="number" id="amount" name="amount" min="1" max="2" className='counter' defaultValue='1'></input>
        <button className='btnPlus' onClick={addTobill}><CheckIcon></CheckIcon></button>
      </div>
      <br></br>
      <div id="lst" className='lst'>
        <h5 className={styles.inputMaterial}><strong>En la lista:</strong></h5>       
      </div>
      <br></br>
      <TextField name='observation' className={styles.inputMaterial} label="Observación" onChange={handleChange} defaultValue={originalBill.observation}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>¿Estas seguro que deseas eliminar la factura con id {selectedBill && selectedBill.id}?</p>
      <div align="right">
      <Button color="secondary" onClick={deleteBill}>Si</Button>
      <Button onClick={()=>openCloseDeleteModal()}>No</Button>
      </div>

    </div>
  )

  return (
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
            <TableCell><b>Metodo de Pago</b></TableCell>
            <TableCell><b>Articulos</b></TableCell>
            <TableCell><b>Observacion</b></TableCell>
            <TableCell><b>Total</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {copy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(Bill=>
              (
                <TableRow key={Bill.id}>
                  <TableCell>{Bill.id}</TableCell>
                  <TableCell>{Bill.id_customer}</TableCell>
                  <TableCell>{Bill.id_employee}</TableCell>
                  <TableCell>{metodos.filter(elem => elem.value == Bill.payment_method)[0].label}</TableCell>
                  <TableCell>{Bill.bill_details.map(elem => filterCar(elem.id_car)+' x '+elem.amount+',   ')}</TableCell>
                  <TableCell>{Bill.observation}</TableCell>
                  <TableCell>{Bill.total}</TableCell>
                  {employee &&
                    <TableCell>
                      <Edit className={styles.iconos} onClick={()=>selectBill((bills.filter((bll) => bll.id == Bill.id))[0],'Editar',Bill)}  />
                      &nbsp;&nbsp;&nbsp;
                      <Delete  className={styles.iconos} onClick={()=>selectBill((bills.filter((bll) => bll.id == Bill.id))[0],'Elminar',Bill)}/>
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
        count={bills.length}
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

export default TableFacturas