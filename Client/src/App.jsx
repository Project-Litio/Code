import React, {useState, useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Collection from './pages/collection'
import login from './pages/login'
import About from './pages/about'
import DashboardPage from './pages/dashboard'
import DashboardClient from './pages/dashboardCliente'
import DashboardMec from './pages/dashboardMecanico'
import DashboardVend from './pages/dashboardVendedor'
import ManejoUsuarios from './pages/manejousuarios'
import ManejoVehiculos from './pages/manejovehiculos'
import ManejoInventario from './pages/manejoinventario'
import ManejoSucursales from './pages/manejosucursales'
import ManejoCotizacion from './pages/manejocotizaciones'
import ManejoFactura from './pages/manejofacturas'
import ManejoOrden from './pages/manejoordenes'
import carDetail from './pages/carDetail'
import Error from './pages/404'
import Buy from './pages/buy'

import Cookies from 'universal-cookie';

const cookies = new Cookies();

import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";

function App() {
  const [client, setClient] = useState(false);
  const [manager, setManager] = useState(false);
  const [seller, setSeller] = useState(false);
  const [mechanic, setMechanic] = useState(false);
  const logged = () => {
    if(cookies.get('user') != undefined){
      if(cookies.get('user').role == "Cliente"){
        setClient(true);
      } else if(cookies.get('user').role == "Man"){
        setManager(true);
      } else if(cookies.get('user').role == "Sel"){
        setSeller(true);
      } else if(cookies.get('user').role == "Mec"){
        setMechanic(true);
      } 
    }
  };

  useEffect(() => {
    logged();
  }, [cookies]);

  return (
    <div className='bg-dark'>
      <Router className='white'>
        <Routes>
          <Route path='/'>
              <Route path='collection/:id' Component={carDetail}></Route>
              <Route path='collection' Component={Collection}></Route>
              <Route path='repair' Component={Navbar}></Route>
              <Route path='about' Component={About}></Route>
              <Route path='login' Component={login}></Route>
              <Route path='collection/buy' Component={Buy}></Route>
              <Route index Component={Home}></Route>
          </Route>
          {manager &&
            <Route path='/'>
              <Route path='DashboardGerente' Component={DashboardPage}></Route>
              <Route path='UserManagement' Component={ManejoUsuarios}></Route>
              <Route path='SucursalesManagement' Component={ManejoSucursales}></Route>
              <Route path='VehicleManagement' Component={ManejoVehiculos}></Route>
              <Route path='StockManagement' Component={ManejoInventario}></Route>
            </Route>
          }
          {client &&
            <Route path='/'>
              <Route path='DashboardCliente' Component={DashboardClient}></Route>
              <Route path='CotizacionManagement' Component={ManejoCotizacion}></Route>
              <Route path='BillManagement' Component={ManejoFactura}></Route>
              <Route path='OrderManagement' Component={ManejoOrden}></Route>
            </Route>
          }
          {seller &&
            <Route path='/'>
              <Route path='DashboardVendedor' Component={DashboardVend}></Route>
              <Route path='UserManagement' Component={ManejoUsuarios}></Route>
              <Route path='VehicleManagement' Component={ManejoVehiculos}></Route>
              <Route path='CotizacionManagement' Component={ManejoCotizacion}></Route>
              <Route path='BillManagement' Component={ManejoFactura}></Route>
            </Route >
          }
          {mechanic &&
            <Route path='/'>
              <Route path='DashboardMecanico' Component={DashboardMec}></Route>
              <Route path='UserManagement' Component={ManejoUsuarios}></Route>
              <Route path='StockManagement' Component={ManejoInventario}></Route>
              <Route path='OrderManagement' Component={ManejoOrden}></Route>
            </Route >
          }
          <Route path='*' Component={Error}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App