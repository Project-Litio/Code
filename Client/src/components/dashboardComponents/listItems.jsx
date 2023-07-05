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

import {
  Link
} from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/DashboardGerente">
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
    <ListItem button component={Link} to="/SucursalesManagement">
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Sucursales" />
    </ListItem>
    <ListItem button component={Link} to="/VehicleManagement">
      <ListItemIcon>
        <DirectionsCarIcon />
      </ListItemIcon>
      <ListItemText primary="Vehículos" />
    </ListItem>
    <ListItem button component={Link} to="/StockManagement">
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Repuestos" />
    </ListItem>
  </div>
);