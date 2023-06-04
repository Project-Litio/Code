import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total de ventas</Title>
      <Typography component="p" variant="h4">
        $620000000
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        para el 23 de Mayo, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver historico
        </Link>
      </div>
    </React.Fragment>
  );
}
