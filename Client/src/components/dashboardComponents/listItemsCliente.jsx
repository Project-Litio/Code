import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Store';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import BuildIcon from '@material-ui/icons/Build';
import ReceiptIcon from '@material-ui/icons/Receipt';

import {
  Link
} from "react-router-dom";

export const mainListItemsCli = (
  <div>
    <ListItem button component={Link} to="/CotizacionManagement">
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Cotizaciones" />
    </ListItem>
    <ListItem button component={Link} to="/BillManagement">
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Facturas" />
    </ListItem>
    <ListItem button component={Link} to="/OrderManagement">
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Reparaciones" />
    </ListItem>
  </div>
);