import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { useState } from 'react';
import FormularioUsuarios from './formularioUsuarios';

// Generate Order Data
function createData(id, idUser, nombre, direccion, email, celular) {
  return { id, idUser, nombre, direccion, email, celular };
}

const rows = [
  createData(0, '1193038', 'Mauricio Munoz', 'Cali', 'mauriciomu@gmail.com', 3137103714),
  createData(1, '1193038', 'Brayan Sanchez', 'Cali', 'brayansl@gmail.com', 3137103713),
  createData(2, '1193038', 'Jose Hincapie', 'Cali', 'josehin@gmail.com', 3137103715),
  createData(3, '1193038', 'Sebastian Idrobo', 'Cali', 'sebidr@gmail.com', 3137133713),
  createData(4, '1193038', 'Mateo Duque', 'Cali', 'matduq@gmail.com', 3137103717),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

  return (
    <div>{isShown && <FormularioUsuarios />}
    <React.Fragment>
      <Title>Usuarios</Title>
      <button onClick={handleClick}>Crear Usuario</button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Celular</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.idUser}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">{row.celular}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver mas clientes
        </Link>
      </div>
    </React.Fragment>
    </div>
  );
}
