import "../style/backGroundColur.css"
import { useContext } from 'react';
import { myContext } from '../App'

import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";

import img from './logo.png';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { common } from "@mui/material/colors";



const NavBar = ({ changeCoin, changeBGStyle,message ,showMessage}) => {
    let { BGStyle } = useContext(myContext);
    
    return (
        <div className={BGStyle == 'day' ? 'day' : 'night'}>
            <AppBar position="static" sx={{ direction: "rtl" }} >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to="/">
                            <img src={img} />
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>


                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="תרום" >
                                    <Link to="/form">
                                        <Button sx={{ color: common.white }}>
                                            תרום
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title=" כל התרומות">
                                    <Link to="/donations">
                                        <Button sx={{ color: common.white }}>
                                            כל התרומות
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </Box>
                        </Box>

                        <div>
                            {message && <div>{message}</div>}
                        </div>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title=" שנה ערך מטבע">
                                <Button sx={{ color: common.white }} name="changeToDollar" onClick={changeCoin} value="שנה ערך מטבע">
                                    <CurrencyExchangeIcon>

                                    </CurrencyExchangeIcon>
                                </Button>
                            </Tooltip>

                        </Box>



                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title=" שנה רקע">
                                <Button sx={{ color: common.white }} name="changeStyle" onClick={changeBGStyle} value="שנה צבע">
                                    <Brightness4Icon>
                                    </Brightness4Icon>
                                </Button>
                            </Tooltip>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

        </div>
    );
}

export default NavBar;
