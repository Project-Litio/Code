import React from 'react'
import Table from '../components/small-component/Table'
import data from '../data/users.json'
const t =data
const userManagment = () => {
  return (
    <div className='bg-white'>
      <div className="py-3 container">
        <h2>Gestion de Usuarios</h2>
      </div>
      <div className='container py-5'>
      <Table users={data} ></Table>
      </div>
    </div>
  )
}

export default userManagment