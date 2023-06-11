import React from 'react'
//import users from '../../data/users.json'


const Table = ({users}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {
              Object.keys(users[0]).map(
              (key,i)=>(
                <th scope="col" key={i}>{key}</th>
              )
              )
            }
          </tr>
        </thead>
        <tbody>
              
                {
                  users.map(user=>(
                      <tr key={user.id} >
                        <td >{user.id}</td>
                        <td >{user['Full Name']}</td>
                        <td >{user.Email}</td>
                        <td >{user['Fecha Ingreso']}</td>
                        <td>{user.Rol}</td>
                      </tr>
                  ))
                }
                
              

        </tbody>
      </table>
    </div>
  )
}

export default Table