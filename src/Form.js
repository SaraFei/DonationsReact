import { useState, useContext } from "react";
import { myContext } from './App'
import "./backGroundColur.css";
import "./backgroundImgForm.css";
import { useNavigate } from "react-router-dom";
// לצד ימין בכפתורים mui הפיכת הטקסט מ 
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
//input
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//errors
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
//send
import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//img
import imgForm from'./donateImg.jpg';

const Form = ({ donationsArr, setDonationsArr }) => {
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const navigate = useNavigate();
    let { BGStyle } = useContext(myContext)
    let [autoNum, setAutoNum] = useState(4);//משתנה למס' אוטומטי רץ
    let [myErrors, setMyErrors] = useState({});
    let [newDonation, setNewDonation] = useState({
        numOfDonation: autoNum,
        nameOfDonor: "אנונימי",
        donationSum: 0,
        dedication: "",
        date: new Date(Date.now())
    })
    const insertDetails = (e) => {
        let inputName = e.target.name;//שם השדה
        let inputValue = e.target.value;//הערך שנקלט בשדה
        let copy = { ...newDonation, [inputName]: inputValue };
        setNewDonation(copy);
    }
    const validate = () => {
        let err = {};
        if (/^[0-9]+$/.test(newDonation.nameOfDonor)) {//לבדוק האם זה נכון!!!!!!
            err.nameOfDonor = "שם מורכב רק מאותיות"
        }
        if (newDonation.donationSum <= 0) {
            err.donationSum = "נא הקש סכום לתרומה"
        }
        return err;
    }
    const sendForm = (e) => {
        e.preventDefault();
        let resultErr = validate();
        if (Object.keys(resultErr).length == 0) {
            setAutoNum(autoNum + 1);//מקדמת את המיספור האוטומטי
            alert("התרומה נקלטה בהצלחה, תודה על נדבת לבכם!");
            setDonationsArr([...donationsArr, newDonation]);//הוספתי למערך התרומות
            setTimeout(() => { navigate("/donations") }, 1500)
        }
        else {
            setMyErrors(resultErr);

        }
      
    }
    return (
        <>
      <div className= {{backgroundImage:'./donateImg'}}>

{/* <img  src={imgForm}/> */}
            <CacheProvider value={cacheRtl}>
                <div className={BGStyle} style={{ justifyContent: 'center' }}>
                    <form onSubmit={sendForm} style={{ display: "flex", flexDirection: "column", alignContent: "center",height:"680px" ,alignItems:"center" }}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="שם התורם" variant="outlined" onBlur={insertDetails} name="nameOfDonor" />
                        </Box>
                        {myErrors.nameOfDonor && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{myErrors.nameOfDonor}</Alert>
                            </Stack>
                        )}

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="סכום התרומה" variant="outlined" name="donationSum" onBlur={insertDetails} />
                        </Box>
                        {myErrors.donationSum && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{myErrors.donationSum}</Alert>
                            </Stack>
                        )}
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField style={{ width: '250px' }}
                                    id="outlined-multiline-static"
                                    label="הקדשה"
                                    multiline
                                    rows={6}
                                    name="dedication" onBlur={insertDetails} type='text' />
                            </div>

                        </Box>


                        <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{width:130}}>
                            לחץ לאישור
                        </Button>

                    </form>
                </div>
               </CacheProvider>
           
            </div> 
            
        </>
    );
}

export default Form;