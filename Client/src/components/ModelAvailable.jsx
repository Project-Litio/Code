import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import CardI from './small-component/CardI'
import {getCars, getAllCars} from '../api/article.api'
import Cookies from 'universal-cookie';
import {motion} from 'framer-motion'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';
const cookies = new Cookies();

const ModelAvailable = () => {
  const [cars, setCars] = useState([]);
  const loaded = async () => {
    if(cookies.get('user') != undefined && cookies.get('user') != 'undefined'){
      if(cookies.get('user').branch == "No aplica"){
        const result = await getAllCars();
        setCars(result.data);
        console.log(result.data);
      } else {
        const result = await getCars(cookies.get('user').branch);
        setCars(result.data.data);
        console.log(result.data.data);
      }      
    } else {
      const result = await getAllCars();
      setCars(result.data);
      console.log(result.data);
    }    
  };

  useEffect(() => {
    loaded();
  }, []);

  const [search, setSearch] = useState('');
  const [t]=useTranslation("global");
  return (
    <div className='container'>
      
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