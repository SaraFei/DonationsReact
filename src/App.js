
import './App.css';
import Donations from './donationsView/Donations';
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route } from 'react-router-dom';
//import OneDonation from './OneDonation';
import SelectBySort from './donationsView/SelectBySort';
import Form from './DonationForm';
import axios from 'axios';
import NavBar from './navBar/NavBar';
import Home from './homePage/Home';
import "./style/backGroundColur.css"



import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';




export const myContext = createContext();
export const styleContext = createContext();
function App() {
  let [BGStyle, setBGStyle] = useState('day');
  const changeBGStyle = () => {
    setBGStyle(BGStyle == 'day' ? 'night' : 'day');
  }
  let [coin, setCoin] = useState(1);
  let [dollarRate, setDollarRate] = useState();
  const [message, setMessage] = useState('');
  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };
  const changeCoin = () => {
    setCoin(coin == 1 ? coin = dollarRate : 1);
    showMessage("ערך המטבע שונה");
  }
  useEffect(() => {
    axios.get("https://api.currencyapi.com/v3/latest?apikey=cur_live_mu7H7L6aGge3qYfUo70ZBS6OWW4CjsxMRwEb9jRY")
      .then(res => {
        setDollarRate(res.data.data.ILS.value);
      })
      .catch(
        err => alert("אין אפשרות כרגע להציג בדולרים💲")
      )
  })

  let [donationsArr, setDonationsArr] = useState([
    {
      numOfDonation: 1,
      nameOfDonor: "פלוני",
      donationSum: 100,
      dedication: "זיווג הגון👰",
      date: new Date(2022, 11, 7)
    },
   
    {
      numOfDonation: 2,
      nameOfDonor: "שרי",
      donationSum: 50,
      dedication: "עבודה טובה🏭",
      date: new Date(2023, 11, 24)
    },
    {
      numOfDonation: 3,
      nameOfDonor: "ריקי",
      donationSum: 50,
      dedication: "הצלחה במבני נתונים💯",
      date: new Date(2020, 11, 11)
    }
  ]);
  const addDonationToDonationsArr = (newDonation) => {//פןנקציית הוספת תרומה למאגר
    let copy = [...donationsArr, newDonation];//העתקת הערכים והוספת הערך החדש
    setDonationsArr(copy);//עדכון המערך 
  }
  return (
    <div style={{direction:"rtl"}}>

      
      <myContext.Provider value={{ dollarRate, BGStyle }}>
        
      <NavBar changeCoin={changeCoin} BGStyle={BGStyle} changeBGStyle={changeBGStyle} showMessage={showMessage} message={message}/>
      
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="form" element={<Form donationsArr={donationsArr} setDonationsArr={setDonationsArr} />} />
          {/* <Route path="sort" element={ <SelectBySort donationsArr={donationsArr} setDonationsArr={setDonationsArr} />}/> */}
          <Route path="donations" element={   <Donations donationsArr={donationsArr} coin={coin} setDonationsArr={setDonationsArr} />}/>
        </Routes>
      </myContext.Provider>
    </div>
  );
}
export default App;
