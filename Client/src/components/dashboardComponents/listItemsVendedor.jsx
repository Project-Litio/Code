import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ReceiptIcon from '@material-ui/icons/Receipt';

import {
  Link
} from "react-router-dom";

export const mainListItemsVend = (
  <div>
    <ListItem button component={Link} to="/DashboardVendedor">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/UserManagement">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
    <ListItem button component={Link} to="/CotizacionManagement">
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary="Cotizaciones" />
    </ListItem>
    <ListItem button component={Link} to="/BillManagement">
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Facturas" />
    </ListItem>
    <ListItem button component={Link} to="/VehicleManagement">
      <ListItemIcon>
        <DirectionsCarIcon />
      </ListItemIcon>
      <ListItemText primary="Vehículos" />
    </ListItem>
  </div>
);