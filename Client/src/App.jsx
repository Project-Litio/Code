
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Collection from './pages/collection'
import login from './pages/login'
import DashboardPage from './pages/dashboard'
import DashboardClient from './pages/dashboardCliente'
import DashboardMec from './pages/dashboardMecanico'
import DashboardVend from './pages/dashboardVendedor'
import ManejoUsuarios from './pages/manejousuarios'
import ManejoVehiculos from './pages/manejovehiculos'
import ManejoInventario from './pages/manejoinventario'
import ManejoSucursales from './pages/manejosucursales'
import carDetail from './pages/carDetail'


import { cars } from './components/ModelAvailable'


import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";


  
function App() {
  return (
    <div className='bg-dark'>
      
      <Router className='white'>

        <Routes >
          <Route path='/' exact Component={Home}></Route>
          <Route path='/collection/:id' Component={carDetail}></Route>
          <Route path='/collection' Component={Collection}></Route>
          <Route path='/repair' Component={Navbar}></Route>
          <Route path='/about' Component={Navbar}></Route>
          <Route path='/login' Component={login}></Route>
          <Route path='/DashboardGerente' Component={DashboardPage}></Route>
          <Route path='/DashboardCliente' Component={DashboardClient}></Route>
          <Route path='/DashboardMecanico' Component={DashboardMec}></Route>
          <Route path='/DashboardVendedor' Component={DashboardVend}></Route>
          <Route path='/UserManagement' Component={ManejoUsuarios}></Route>
          <Route path='/SucursalesManagement' Component={ManejoSucursales}></Route>
          <Route path='/VehicleManagement' Component={ManejoVehiculos}></Route>
          <Route path='/StockManagement' Component={ManejoInventario}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
