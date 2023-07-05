import React, { useState,useEffect } from 'react';
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
import { mainListItemsVend } from './dashboardComponents/listItemsVendedor';
import img from '../assets/logo.png'
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import {replacementData} from '../api/article.api'

import Cookies from 'universal-cookie';

import { Chart } from "react-google-charts";
import ClipLoader from "react-spinners/ClipLoader";

var cookies = new Cookies();


const drawerWidth = 200;

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
  helper:{
    
    display: 'flex',
    overflow: 'auto',
    
    flexDirection: 'column',
  },
}));

export default function DashboardVendedor() {
  const navigateTo = useNavigate();

  const deleteCookies = () => {
    cookies.set('user', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    navigateTo('/');
  };
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [replacement,setReplacement] =useState([]);
  const [loading,setLoading]=useState(false)


  const loaded = async () => {
      
    setLoading(true) 

    const result = await replacementData(cookies.get('user').branch);
    console.log(result.data.data);
    setReplacement(result.data.data);
    setLoading(false)
  };    

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  useEffect(() => {
    loaded();

  }, []);

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    char1:{
      chart: {
        title: "Stock de Partes",
      },
    },
    char2:{
      chart: {
        title: "Autos más Vendidos",
      },
    charaux:{
      chartArea: { width: "1", height: "1" }
    }
    }  
  };

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
            &emsp; Vendedor
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
        <List>{mainListItemsVend}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        {
            loading ? (
              
            
            <div className='center'>
              <ClipLoader
              color={'#36d7b7'}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            </div>
            
            ) : (
            
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
              <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={replacement}
                    options={options['char1 ']}
                  />
              </Paper>
            </Grid>
          </Grid>
          )
          }
          <Paper className={classes.helper}>
              <Chart
                chartType="AreaChart" 
                width="10%"
                height="  0px"
                data={data}
                options={options[2]}
              />
              </Paper>
        </Container>
      </main>
    </div>
  );
}
