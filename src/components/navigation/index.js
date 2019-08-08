import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constant/router';
import Logout from '../signout';
import {AuthUserContext} from '../session';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid, Avatar} from '@material-ui/core';

const classes = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    //flexGrow: 1,
  },
  container: {
    flex: 1,
  },
};

const Navigation = ({user}) => {
  //console.log(props.authUser)

  return <MyAppBar user={user} />;
};

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Logout />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

const AuthNavItems = ({user}) => (
  <Grid container justify="space-between">
    <Grid item>
      <Grid container>
        <Link to={ROUTES.LANDING}>
          <Button color="secondary">Langing</Button>
        </Link>
        <Link to={ROUTES.HOME}><Button color="secondary">Home</Button></Link>
        <Link to={ROUTES.ACCOUNT}>
          <Button color="secondary">Account</Button>
        </Link>
        <Link to={ROUTES.DEVICES}>
          <Button color="secondary">Devices</Button>
        </Link>

      </Grid>

    </Grid>

    {/* <Grid item>
          
        </Grid>

        <Grid item>
          
        </Grid> */}

    <Grid item>
      <Grid container>
        <Avatar
          alt="Remy Sharp"
          src={user.image}
          style={{width: 40, height: 40, marginRight: 10}}
        />
        <Logout />
      </Grid>
    </Grid>
  </Grid>
);

const NonAutthItems = () => (
  <Grid container xs={12} justify="space-between">
    <Grid item>
      <Link to={ROUTES.LANDING}>
        <Button color="secondary">Langing</Button>
      </Link>
    </Grid>

    <Grid item>
      <Link to={ROUTES.SIGN_IN}>
        <Button color="secondary">SIGN IN</Button>
      </Link>
    </Grid>
  </Grid>
);

const MyAppBar = ({user}) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Grid container spacing={3}>

            <Grid item xs={1}>
              <Typography variant="h6">
                My App
              </Typography>
            </Grid>

            <Grid item xs={11}>

              <AuthUserContext.Consumer>
                {authUser =>
                  authUser ? <AuthNavItems user={user} /> : <NonAutthItems />}
              </AuthUserContext.Consumer>

            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

//  const myAppBar = ()=> {
// const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// const Navigation= ()=>{
//   return(
//     <div>
//     <ul>
//       <li>
//         <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.LANDING}>Landing</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.HOME}>Home</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.ACCOUNT}>Account</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.ADMIN}>Admin</Link>
//       </li>

//       <li>
//         <Logout/>
//       </li>
//     </ul>
//   </div>
//   )
// }

export default Navigation;
