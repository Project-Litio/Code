import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '23 Mayo, 2023', 'Mauricio Munoz', 'Cali, VC', 'VISA ⠀•••• 3719', 120000000),
  createData(1, '23 Mayo, 2023', 'Brayan Sanchez', 'Cali, VC', 'VISA ⠀•••• 2574', 105000000),
  createData(2, '23 Mayo, 2023', 'Jose Hincapie', 'Cali, VC', 'MC ⠀•••• 1253', 180000000),
  createData(3, '23 Mayo, 2023', 'Sebastian Idrobo', 'Cali, VC', 'MC ⠀•••• 2000', 110000000),
  createData(4, '23 Mayo, 2023', 'Mateo Duque', 'Cali, VC', 'VISA ⠀•••• 5919', 102000000),
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
  return (
    <React.Fragment>
      <Title>Compras recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Ubicación</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Total Venta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver mas ordenes
        </Link>
      </div>
    </React.Fragment>
  );
}
