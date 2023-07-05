import {React,useState,useEffect} from 'react'
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField, ExpansionPanel} from '@material-ui/core';
import {Edit,Delete, VerticalAlignBottomRounded} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {orderEdit, orderDelete, orderCreate, orderTotal, deleteOrderDetail} from '../../api/order.api'
import {getCustomers} from '../../api/login.api'
import { getStock, getAllPieces } from '../../api/article.api';
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

const TableOrdenes = ({orders, copy}) => {
  const [employee, setEmployee] = useState(true);
  var repeated = {};
  var end = false;
  var editable = true;
  const [customers, setCustomers] = useState([]);
  const [pieces, setpieces] = useState([]);
  const [stock, setStock] = useState([]);
  const loaded = async () => {
    if(cookies.get('user').role == 'Cliente'){
      setEmployee(false);
      await timer(1000);
      const cus = (await getCustomers()).data.data.map(elem => ({value: elem.id, label: elem.id}));
      await timer(1000);
      const pic = (await getAllPieces()).data.map(elem => ({value: elem.id, label: elem.name, stock: elem.stock}));
      setStock(pic);
      setpieces((pic.filter(elem => elem.stock != 0)).map(el => ({value: el.value, label: el.label})));
      setCustomers(cus); 
    } else {
      await timer(1000);
      const cus = (await getCustomers()).data.data.map(elem => ({value: elem.id, label: elem.id}));
      await timer(1000);
      const pic = (await getStock(cookies.get('user').branch)).data.data.map(elem => ({value: elem.id, label: elem.name, stock: elem.stock}));
      setStock(pic);
      setpieces((pic.filter(elem => elem.stock != 0)).map(el => ({value: el.value, label: el.label})));
      setCustomers(cus); 
    }
  };

  useEffect(() => {
    loaded();
  }, []);

  const years = [ { "value": "2008", "label": "2008" }, { "value": "2009", "label": "2009" }, { "value": "2010", "label": "2010" }, { "value": "2011", "label": "2011" }, { "value": "2012", "label": "2012" }, { "value": "2013", "label": "2013" }, { "value": "2014", "label": "2014" }, { "value": "2015", "label": "2015" }, { "value": "2016", "label": "2016" }, { "value": "2017", "label": "2017" }, { "value": "2018", "label": "2018" }, { "value": "2019", "label": "2019" }, { "value": "2020", "label": "2020" }, { "value": "2021", "label": "2021" }, { "value": "2022", "label": "2022" }, { "value": "2023", "label": "2023" }, { "value": "2024", "label": "2024" } ];

  const styles = useStyles();
  const [InsertModal,setInsertModal] =useState(false);
  const [EditModal,setEditModal] =useState(false);
  const [DeleteModal,setDeleteModal] =useState(false);
  const [EndModal,setEndModal] =useState(false);

  const openCloseIsertModal=()=>{setInsertModal(!InsertModal); resetquot();}
  const openCloseEditModal=()=>{setEditModal(!EditModal); restartSelection();}
  const openCloseDeleteModal=()=>{setDeleteModal(!DeleteModal); }
  const openCloseEndModal=()=>{setEndModal(!EndModal); }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const faltanDatos = (data) => toast("Debes brindar el dato "+dataTranslator(data));
  const faltanRepuestos = () => toast("La orden debe tener al menos un repuesto");
  const noHayRepuestos = (car, qua) => toast("Solo hay "+qua+" unidades disponibles del repuesto "+car);
  const ordenCancelada = () => toast("La orden fue cancelada");
  const edicionCancelada = () => toast("La edición de orden fue cancelada");
  const comienzo = () => toast("Por favor espere, esta operación tomará unos segundos");
  const espere = () => toast("Estamos a punto de terminar");
  const placa = () => toast("La placa no coincide con el formato AAA000");

  const resetquot = () =>{
    selectedOrder.order_details = [];
    selectedOrder.id_replacement = '';
    selectedOrder.observation = '';
    selectedOrder.model = '';
    selectedOrder.plate = '';
  }

  const [originalOrder, setOriginalOrder] = useState([]);

  const restartSelection = () =>{
    for(var key in selectedOrder){
      selectedOrder[key] = originalOrder[key];
    }
    order.order_details = [];
  }

  const dataTranslator = (data) => {
    switch (data) {
      case 'id_employee':
        return 'ID Mecanico';
      case 'id_customer':
        return 'ID Cliente';
      case 'model':
        return 'Modelo';
      case 'model_date':
        return 'Año';
      case 'observation':
        return 'Observacion';
      case 'plate':
        return 'Placa';
      default:
        console.log("Esto no debería pasar");
    }
  }

  const [order] = useState({order_details:[]});
  const [selectedOrder,setSelectedOrder]=useState({
    start_date:'',
    end_date:'',
    id:'',
    id_customer:'',
    id_employee:'',
    model:'',
    model_date:'',
    observation:'',
    order_details:[],
    id_replacement:'',
    plate:''
  });

  const handleChange=e=>{
    const {name,value}= e.target;
    setSelectedOrder(
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
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const selectOrder=(ord, caso, org)=>{
    setSelectedOrder(ord);
    setOriginalOrder(org);

    if(caso == 'Editar'){
      setEditModal (true);
      setTimeout(insertText,500,ord);
    } else if(caso == 'Eliminar') {
      setDeleteModal(true);
    } else {
      setEndModal(true);
    }
  }

  const beforeCreate = () => {verificarDatos("Crear");}
  const beforeEdit = () => {verificarDatos("Editar");}

  const addToRepeated = (elem) =>{
    if(repeated.hasOwnProperty(''+elem.id_replacement+'')){
      repeated[''+elem.id_replacement+''] = parseInt(repeated[''+elem.id_replacement+'']) + parseInt(elem.amount);
    } else {
      repeated[''+elem.id_replacement+''] = parseInt(elem.amount);
    }
  }

  const orderSum = () =>{
    repeated = {};

    if(InsertModal){
      selectedOrder.order_details.map(elem => addToRepeated(elem));
      selectedOrder.order_details = [];
  
      for(var key in repeated){
        selectedOrder.order_details.push({amount: repeated[key],
        id_replacement: key,
        id_work_order: selectedOrder.id,
        id_branch: cookies.get('user').branch})
      }

    } else {
      order.order_details.map(elem => addToRepeated(elem));
      order.order_details = [];
  
      for(var key in repeated){
        order.order_details.push({amount: repeated[key],
        id_replacement: key,
        id_work_order: selectedOrder.order_details[0].id_work_order,
        id_branch: cookies.get('user').branch})
      }
    }
  }

  const verificarDatos = (act) => {
    if(act == "Crear"){
      if(selectedOrder.id_customer == ""){
        selectedOrder.id_customer = customers[0].value;
      }
      
      if(selectedOrder.id_employee == ""){
        selectedOrder.id_employee = cookies.get('user').id;
      }

      if(selectedOrder.model_date == ""){
        selectedOrder.model_date = years[0].value;
      }

      if(selectedOrder.order_details == ""){
        faltanRepuestos();
        return false;
      } 
    }

    if(act == 'Editar' && order.order_details == '' || order.order_details == undefined){
      faltanRepuestos();
      return false;
    }

    delete selectedOrder.id;
    delete selectedOrder.id_replacement;
    delete selectedOrder.start_date;
    delete selectedOrder.end_date;

    if(/^[a-zA-Z]{3}[0-9]{3}$/u.test(selectedOrder.plate) == false){
      placa();
      return false;
    }

    for ( var key in selectedOrder ) {
      if(selectedOrder[key] == ''){
        faltanDatos(key);
        return false;
      }
    }

    if(act == "Crear"){
      createOrder();
    } else if(act == "Editar"){
      editOrder();
    } else {
      deleteOrder();
    }
  }

  const deleteOrder = async () => {
    await orderDelete({}, selectedOrder.order_details[0].id_work_order);
    window.location.reload(false);
  }

  const endOrder = async () => {
    await orderEdit({}, selectedOrder.order_details[0].id_work_order);
    window.location.reload(false);
  }

  const delOrderDetail = async (elem, id) => {
    await deleteOrderDetail(elem, id);
  }

  const timer = ms => new Promise(res => setTimeout(res, ms))

  const editOrder = async () => {
    console.log(await orderEdit(selectedOrder, selectedOrder.order_details[0].id_work_order));
    orderSum();
    comienzo();
    if(checkStock(order.order_details)){
      for (let index = 0; index < selectedOrder.order_details.length; index++) {
        delOrderDetail({}, selectedOrder.order_details[index].id);
        await timer(1500);
      }     
      espere();
      for (let index = 0; index < order.order_details.length; index++) {
        countTotal(order.order_details[index]);
        await timer(1500);
        if(index == order.order_details.length - 1){
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
    console.log(await orderTotal(elem));
  }

  const checkStock = (arr) => {
    for (let index = 0; index < arr.length; index++) {
      var elements = stock.filter(elem => elem.value == arr[index].id_replacement);
      if(elements.length != 0){
        if(elements[0].stock - arr[index].amount < 0){
          noHayRepuestos(elements[0].label, elements[0].stock);
          return false;
        }
      } else {
        continue;
      }
    }

    return true;
  }

  const createOrder = async () => {
    const temp = (await orderCreate(selectedOrder));
    console.log(temp);
    selectedOrder.id = (await orderCreate(selectedOrder)).data;
    orderSum();
    if(checkStock(selectedOrder.order_details)){
      selectedOrder.order_details.map(elem => countTotal(elem));
      window.location.reload();
    } else {
      openCloseIsertModal();
      ordenCancelada();
      await orderDelete({}, selectedOrder.id);
    }    
  }

  const handleClientChange = (selectedOption) => {
    selectedOrder['id_customer'] = selectedOption.value;
  };

  const handleCarChange = (selectedOption) => {
    selectedOrder['id_replacement'] = selectedOption.value;
  };

  const handleYearChange = (selectedOption) => {
    selectedOrder['model_date'] = selectedOption.value;
  };

  const deleteFromList = e => {
    var list = document.getElementById("lst");
    if(InsertModal){
      selectedOrder.order_details.splice(e.target.id, 1);
    } else {
      order.order_details.splice(e.target.id, 1);
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

  const insertText = (ord) => {
    for(var index = 0, len = ord.order_details.length; index < len; index++){
      order.order_details.push(ord.order_details[index]);
    }

    const obj = order.order_details.map(elem => findCar(elem));
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
    return filterPiece(car.id_replacement) +' x'+car.amount;
  }

  const addToorder = () => {
    if(selectedOrder.id_replacement == '' || selectedOrder.id_replacement == undefined){
      selectedOrder.id_replacement = pieces[0].value;
    }

    const obj = {amount: document.getElementById("amount").value,
                 id_replacement: selectedOrder.id_replacement,
                 id_order: selectedOrder.id}

    if(InsertModal){
      selectedOrder.order_details.push(obj);
      var name = selectedOrder.order_details.length -1;
    } else {
      order.order_details.push(obj);
      var name = order.order_details.length -1;
    }
    
    var element = (pieces.filter(elem => elem.value == selectedOrder.id_replacement))[0];    
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

  const filterPiece = (element) => {
    if(pieces.length != 0){
      return (pieces.filter(elem => elem.value == element)[0]).label;
    } else {
      return element;
    }
  }

  const insertBody=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Orden</h3>
      <label className={styles.inputMaterial}>ID Cliente</label>
      <Select options={customers} onChange={handleClientChange} defaultValue={customers[0]}/>
      <TextField name='model' className={styles.inputMaterial} label="Modelo" onChange={handleChange}></TextField>
      <br></br><br></br>
      <label className={styles.inputMaterial}>Año</label>
      <Select options={years} onChange={handleYearChange} defaultValue={years[0]}/>

      <TextField name='plate' className={styles.inputMaterial} label="Placa" onChange={handleChange}></TextField>
      <br></br><br></br>
      <div>
        <label className={styles.inputMaterial}>Repuestos</label>
        <Select options={pieces} onChange={handleCarChange} defaultValue={pieces[0]} id='crs'/>
        <input type="number" id="amount" name="amount" min="1" max="10" className='counter' defaultValue='1'></input>
        <button className='btnPlus' onClick={addToorder}><CheckIcon></CheckIcon></button>
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
      <h3>Editar Orden</h3>
      <label className={styles.inputMaterial}>ID Cliente</label>
      <Select options={customers} onChange={handleClientChange} defaultValue={customers[searchIndex(originalOrder.id_customer, customers)]}/>
      <TextField name='model' className={styles.inputMaterial} label="Modelo" onChange={handleChange} defaultValue={originalOrder.model}></TextField>
      <br></br><br></br>
      <label className={styles.inputMaterial}>Año</label>
      <Select options={years} onChange={handleYearChange} defaultValue={years[searchIndex(originalOrder.model_date, years)]}/>

      <TextField name='plate' className={styles.inputMaterial} label="Placa" onChange={handleChange} defaultValue={originalOrder.plate}></TextField>
      <br></br><br></br>
      <div>
        <label className={styles.inputMaterial}>Articulos</label>
        <Select options={pieces} onChange={handleCarChange} defaultValue={pieces[0]}/>
        <input type="number" id="amount" name="amount" min="1" max="2" className='counter' defaultValue='1'></input>
        <button className='btnPlus' onClick={addToorder}><CheckIcon></CheckIcon></button>
      </div>
      <br></br>
      <div id="lst" className='lst'>
        <h5 className={styles.inputMaterial}><strong>En la lista:</strong></h5>       
      </div>
      <br></br>
      <TextField name='observation' className={styles.inputMaterial} label="Observación" onChange={handleChange} defaultValue={originalOrder.observation}></TextField>
      <div align="right">
      <Button color="primary" onClick={beforeEdit}>Editar</Button>
      <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const DeleteBody=(
    <div className={styles.modal}>
      <p>¿Estas seguro que deseas eliminar la orden con id {selectedOrder && selectedOrder.id}?</p>
      <div align="right">
      <Button color="secondary" onClick={deleteOrder}>Si</Button>
      <Button onClick={()=>openCloseDeleteModal()}>No</Button>
      </div>

    </div>
  )

  const EndBody=(
    <div className={styles.modal}>
      <p>¿Deseas finalizar la orden con id {selectedOrder && selectedOrder.id}?</p>
      <div align="right">
      <Button color="secondary" onClick={endOrder}>Si</Button>
      <Button onClick={()=>openCloseEndModal()}>No</Button>
      </div>

    </div>
  )

  const setEndTable = (val) => {
    end = val;
    editable = !val;
  }

  const ended = (elem) => {
    if(elem != null){
      setEndTable(true);
      return 'Si'
    } else {
      setEndTable(false);
      return 'No';
    }
  }

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
            <TableCell><b>Inicio</b></TableCell>
            <TableCell><b>ID Cliente</b></TableCell>
            <TableCell><b>ID Mecanico</b></TableCell>
            <TableCell><b>Repuestos</b></TableCell>
            <TableCell><b>Modelo</b></TableCell>
            <TableCell><b>Observacion</b></TableCell>
            <TableCell><b>Placa</b></TableCell>
            <TableCell><b>Finalizada</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {copy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(Order=>
              (
                <TableRow key={Order.id}>
                  <TableCell>{Order.id}</TableCell>
                  <TableCell>{Order.start_date.slice(0,10)+' '+Order.start_date.slice(11,19)}</TableCell>
                  <TableCell>{Order.id_customer}</TableCell>
                  <TableCell>{Order.id_employee}</TableCell>
                  <TableCell>{Order.order_details.map(elem => filterPiece(elem.id_replacement)+', ')}</TableCell>
                  <TableCell>{Order.model+' ('+Order.model_date+')'}</TableCell>
                  <TableCell>{Order.observation}</TableCell>
                  <TableCell>{Order.plate}</TableCell>
                  <TableCell>{ended(Order.end_date)}</TableCell>
                  {employee &&
                    <TableCell>
                      {editable &&
                        <Edit className={styles.iconos} onClick={()=>selectOrder((orders.filter((ord) => ord.id == Order.id))[0],'Editar',Order)}  />
                      }
                      &nbsp;&nbsp;&nbsp;
                      <Delete  className={styles.iconos} onClick={()=>selectOrder((orders.filter((ord) => ord.id == Order.id))[0],'Eliminar',Order)}/>
                      &nbsp;&nbsp;&nbsp;
                      {!end && 
                        <CheckIcon className={styles.iconos} onClick={()=>selectOrder((orders.filter((ord) => ord.id == Order.id))[0],'Finalizar',Order)}  />
                      }
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
        count={orders.length}
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

      <Modal open={EndModal} onClose={()=>openCloseEndModal()} >
        {EndBody}
      </Modal>
    </div>

  )
}

export default TableOrdenes