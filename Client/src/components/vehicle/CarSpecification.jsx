import React from 'react'
import { useLocation } from 'react-router-dom';

const CarSpecification = () => {
  const location = useLocation();
  const dat = location.state;
  return (
    <div>
    <h1 className=' text-center'>Caracteristicas</h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Informacion del Vehiculo</th>
          <th scope="col">Detalles</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(dat).map((key,i)=>(
            <tr key={i}>
              <td>{key}</td>
              <td>{dat[key]}</td>
            </tr>
          )
          )
        }
      </tbody>
    </table>
    </div>
  )
}

export default CarSpecification