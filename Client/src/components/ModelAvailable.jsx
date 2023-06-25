import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import CardI from './small-component/CardI'
import {getCars} from '../api/article.api'
import Cookies from 'universal-cookie';

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

  return (
    <div className='container'>
      <h2 className='px-3'>NUESTROS VEHÍCULOS</h2>
    <div className="row justify-content-around  pb-4 ">
      {
        cars.map(car => 
          (
            <div className="col-6 col-sm-6 col-md-4 col-lg-4 " key={car.id}>
              <Link to={`/collection/${car.id}`} > <CardI title={car.brand+' '+car.model} text={car.price} imageSource={"https://res.cloudinary.com/dao5kgzkm/"+car.image}></CardI> </Link>
            </div>

          )
        ) 
      }
    </div>
    </div>
  )
}

export default ModelAvailable