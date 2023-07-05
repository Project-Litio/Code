import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import CardI from './small-component/CardI'
import {getCars} from '../api/article.api'
import {getBranchs} from '../api/login.api'
import Cookies from 'universal-cookie';
import {motion} from 'framer-motion'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';
import {Modal, Button} from '@material-ui/core';
import Select from 'react-select'
import {makeStyles} from '@material-ui/core/styles'
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: {
      sm:500,
      md:700
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

const ModelAvailable = () => {
  const styles = useStyles();
  const [cars, setCars] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [SucursalModal,setSucursalModal] = useState(true);
  const [selectedBranch] = useState({branch: 0});
  const loaded = async () => {
    if(cookies.get('user') != undefined){
      if(cookies.get('user').branch == "No aplica"){
        const result = (await getBranchs()).data;
        setBranchs(result.map(elem => ({value: elem.id, label: elem.city+' - '+elem.address})));
        setCars([]);
      } else {
        setSucursalModal(false);
        const result = await getCars(cookies.get('user').branch);
        setCars(result.data.data);
      }      
    } else {
      setBranchs((await getBranchs().data).map(elem => ({value: elem.id, label: elem.city+' - '+elem.address})));
      setCars([]);
      console.log(result.data);
    }    
  };

  useEffect(() => {
    loaded();
  }, []);

  const closeSucursalModal = async () => {
    if(selectedBranch.branch == 0){
      selectedBranch.branch = branchs[0].value;
    }
    setCars((await getCars(selectedBranch.branch)).data.data);
    if(cookies.get('user') != undefined){
      const cook = cookies.get('user');
      cook.branch = selectedBranch.branch;
      cookies.set('user', cook, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
    }
    setSucursalModal(false);
  }

  const [search, setSearch] = useState('');
  const [t]=useTranslation("global");

  const handleBranchChange = (selectedOption) => {
    selectedBranch.branch = selectedOption.value;
  };

  const SucursalBody=(
    <div className={styles.modal}>
      <p>Selecciona la sucursal más cercana a ti</p>
      <Select options={branchs} onChange={handleBranchChange} defaultValue={branchs[0]}/>
      <div align="right">
      <Button color="secondary" onClick={closeSucursalModal}>Ok</Button>
      </div>

    </div>
  )


  return (
    <div className='container'>
      <Modal open={SucursalModal} >
        {SucursalBody}
      </Modal>
      <div className='px-3'>
        <h2 >{t("ModelAvailable.us")}</h2>
        <Form>
          <InputGroup className='my-3'>
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("ModelAvailable.placeholder")}
            />
          </InputGroup>
        </Form>
      </div>
      
    <motion.div layout className="row justify-content-around  pb-4 ">
      {
        cars.filter((car) => {
          return search.toLowerCase() === ''
            ? car
            : car.brand.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase());
        }).map(car => 
          (
            <motion.div layout className="col-6 col-sm-6 col-md-4 col-lg-4 " key={car.id}>
              <Link className='link-style' to={`/collection/${car.id}`}  state={car} > <CardI  title={car.brand+' '+car.model} price={car.price} imageSource={"https://res.cloudinary.com/dao5kgzkm/"+car.image}></CardI> </Link>
            </motion.div>

          )
        ) 
      }
    </motion.div>
    </div>
  )
}

export default ModelAvailable