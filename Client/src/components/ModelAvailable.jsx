import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import CardI from './small-component/CardI'
import {getCars} from '../api/article.api'
import Cookies from 'universal-cookie';
import {motion} from 'framer-motion'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const cookies = new Cookies()

const ModelAvailable = () => {
  const [cars, setCars] = useState([]);
  const loaded = async () => {
    const result = await getCars();
    setCars(result.data);
    
  };

  useEffect(() => {
    loaded();
  }, []);

  console.log(cars);

  const [search, setSearch] = useState('');

  return (

    
    <div className='container'>
      <div className='px-3'>
        <h2 >Nuestros Vehículos</h2>
        <Form>
          <InputGroup className='my-3'>
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Buscar Vehículo'
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
              <Link to={`/collection/${car.id}`} > <CardI  title={car.brand+' '+car.model} text={car.price} imageSource={"https://res.cloudinary.com/dao5kgzkm/"+car.image}></CardI> </Link>
            </motion.div>

          )
        ) 
      }
    </motion.div>
    </div>
  )
}

export default ModelAvailable