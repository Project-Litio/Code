import React, {useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './dashboardComponents/listItems';
import img from '../assets/logo.png'
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Chart } from "react-google-charts";
import {getCars, getAllCars} from '../api/article.api'
import {getBills} from '../api/order.api'



import Cookies from 'universal-cookie';
import { LocalGasStation } from '@material-ui/icons';

const drawerWidth = 200;
var cookies = new Cookies();
console.log(cookies.get('user'));
var cookies = new Cookies();

const useStyles = makeStyles((theme) => ({ 
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, 
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#212529',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function DashboardGerente() {
  const navigateTo = useNavigate();

  const deleteCookies = () => {
    cookies.set('user', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    navigateTo('/');
  };

  /****DATA****/
  const [cars, setCars] = useState([]);
  const [bills, setBills] = useState([]);
  const loaded = async () => {
      const result2 = await getBills();
      const result = await getCars(cookies.get('user').branch);
      
      setCars(result.data.data);
      setBills(result2.data)

      console.log(result2.data);
    };    




  useEffect(() => {
    loaded();
  }, []);


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const options = {
    char1:{
      chartArea: { backgroundColor: 'black' },
      chart: {
        title: "Stock de Autos",
      },
    },
    char2:{
      chart: {
        title: "Autos más Vendidos",
      },
    }
    

    
    
  };


  function filtrarJSON(json, camposDeseados) {
    const jsonFiltrado = [];
    camposDeseados.forEach((campo) => {
      if (json.hasOwnProperty(campo)) {
        jsonFiltrado.push(json[campo]);
      }
    });
    return jsonFiltrado;
  }

  
  const campos = [['model','stock'],['','ventas']]
  const test= [['model','stock']]
  const test2= [['employee_name','ventas']]

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  return (
    <div className={classes.root} id='raiz'>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Link className="navbar-brand " to='/'><img src={img} alt="Litio" width={130} /></Link>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            &emsp; Gerente
          </Typography>
          <div onClick={deleteCookies}>
            <Tooltip title="Salir">
              <IconButton>
                  <ExitToAppIcon style={{ fill: '#ee2641' }}/>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <Chart
                  chartType="Bar"
                  width="100%"
                  height="400px"
                  data={test.concat(cars.map(car=>(filtrarJSON(car,campos[0]))))}
                  options={options['char1']}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
    </div>
  );
}
