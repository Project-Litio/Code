import React from 'react'
import data from "../../data/cars.json"

const det= data[0].details

const CarSpecification = () => {
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
      
      Object.keys(det).map((key,i)=>(
        <tr key={i}>
          <td >{key}</td>
          <td >{det[key]}</td>
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