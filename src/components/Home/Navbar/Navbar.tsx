import React, { useState } from 'react';
import './Navbar.css'
import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import LogoProjet from "../../../assets/images/envyplan_logo.png";

import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsFilledIcon from '@mui/icons-material/Notifications';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  
const menuId = 'search-account-menu';
//Menu Account
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const isMenuOpen = Boolean(anchorEl);

const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

//Menu Notif
const [notifications, setNotifications] = useState(1); // Nombre de notifications

const [anchorElNotif, setAnchorElNotif] = React.useState<null | HTMLElement>(null);
const isMenuNotificationOpen = Boolean(anchorElNotif);

const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElNotif(event.currentTarget);
  <Badge badgeContent={0} color="error"></Badge>
};

const handleNotificationMenuClose = () => {
  setAnchorElNotif(null);
  setNotifications(0)
};

return(
<Box sx={{ pt: 2, flexGrow: 1, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <AppBar position="static" color="inherit" className="boxPrincipale">
        <Toolbar>
          <Typography variant="h6" noWrap component="a" href="/index" sx={{mr: 2, textDecoration: 'none' }}>
            <img src={LogoProjet} alt='Logo Envy Plan' id='logo-projet'/>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit" sx={{zIndex: 2}}
              aria-label="show 1 new notifications"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleNotificationMenuOpen}
              >
              <Badge badgeContent={notifications} color="error">
                {/* NotificationsActiveIcon  quand le menu est actif avec plus de 0 notification.
                    NotificationsFilledIcon quand le menu est actif avec 0 notification.
                    NotificationsActiveOutlinedIcon quand le menu est inactif avec plus de 0 notification.
                    NotificationsIcon quand le menu est inactif avec 0 notification.*/}
               {isMenuNotificationOpen ? (
                  notifications > 0 ? (
                    <NotificationsActiveIcon fontSize="large" color="primary" />
                    ) : (
                    <NotificationsFilledIcon fontSize="large" color="primary" />)
                  ) : (
                  notifications > 0 ? (
                    <NotificationsActiveOutlinedIcon fontSize="large" color="primary" />
                    ) : (
                    <NotificationsIcon fontSize="large" color="primary" />
                  )
                )}
              </Badge>
            </IconButton>

            <IconButton size="large" color="inherit" sx={{zIndex: 2}} edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              >
              {isMenuOpen? 
              (<AccountCircleIcon fontSize="large" color="primary" />)
              : 
              ( <AccountCircleOutlinedIcon fontSize="large" color="primary" /> ) 
              }
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            border: 1,
            borderColor: "#9C28E3",
            mt:'55px',
            '&::before': {
              border: 1,
              borderBottomWidth: 4,
              borderColor: "#9C28E3",
              borderBottomColor: "#FFF",
              content: '""',
              display: 'block',
              position: 'absolute',
              top: -50,
              right: -1,
              width: 55,
              height: 47
            },
          },
        }}
        sx= {{zIndex:0}}
        anchorEl={anchorElNotif}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        id={menuId}
        keepMounted
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuNotificationOpen}
        onClose={handleNotificationMenuClose}
      >
        <MenuItem sx={{fontFamily: 'Josefin Sans', color:"var(--purple-color)", justifyContent:"center"}} onClick={handleNotificationMenuClose}>Notif</MenuItem>
      </Menu>
    {/* Menu pour les notifications */}
       <Menu
        PaperProps={{
          elevation: 0,
          sx: {
             overflow: 'visible',
             border: 1,
             borderColor: "#9C28E3",
             mt:'55px',
             '&::before': {
                border: 1,
                borderBottomWidth: 4,
                borderColor: "#9C28E3",
                borderBottomColor: "#FFF",
                content: '""',
                display: 'block',
                position: 'absolute',
                top: -50,
                right: -1,
                width: 55,
                height: 47
              },
          },
        }}
        sx= {{zIndex:0}}
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        id={menuId}
        keepMounted
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem sx={{fontFamily: 'Josefin Sans', color:"var(--purple-color)", justifyContent:"center"}} onClick={handleMenuClose}>Mon compte</MenuItem>
        <MenuItem sx={{fontFamily: 'Josefin Sans', color:"var(--purple-color)", justifyContent:"center"}} onClick={handleMenuClose}>Aide & Contact</MenuItem>
        <MenuItem sx={{fontFamily: 'Josefin Sans', color:"var(--purple-color)", justifyContent:"center"}} onClick={handleMenuClose}>CGU & Mentions Légales</MenuItem>
        <MenuItem sx={{fontFamily: 'Josefin Sans', color:"var(--purple-color)", justifyContent:"center"}} onClick={handleMenuClose}>Déconnexion</MenuItem>
      </Menu>
    </Box>
    );
}

export default Navbar;