import { useState } from "react";
import { useContext } from 'react';
import { myContext } from '../App'
import OneDonation from "./OneDonation";
import SelectBySort from "./SelectBySort";
import "../style/backGroundColur.css"
import { Card } from "@mui/material";
//input
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//text  RTL button 
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

const Donations = ({ donationsArr, coin, setDonationsArr }) => {
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    let { BGStyle } = useContext(myContext)
    let goalOfCampain = 100000;
    let { dollarRate } = useContext(myContext);
    const sumOfDonations = () => {
        let sum = 0;
        donationsArr.forEach(element => {
            sum += +element.donationSum;
        });//The amount of donations so far has been summed up
        return sum;
    }
    const percentFromTheGoal = () => {
        let sum;
        sum = sumOfDonations(); //The amount of donations so far has been summed up
        sum = sum / goalOfCampain * 100;//calculate the percentage up to here
        return sum.toFixed(2);//Round to two places after the period
    }
    let sumAllTheDonations = 0, percentUpToLastOur = 0;
    sumAllTheDonations = sumOfDonations();///All donations so far
    percentUpToLastOur = percentFromTheGoal();//The percentage of donations until the last hour
    //-----------------------------Search By Name or Dedication-----------------------------------
    let [flagName, setFlagName] = useState(false);//משתנה בוליאני עבור הבדיקה האם המערך הזמני ריק ולפי זה מודיע אם יש תוצאות
    let [flagDedication, setFlagDedication] = useState(false);//...עבור ההקדשה
    let [newArr, setNewArr] = useState([]);//העתק של המערך המקורי עבור השינויים
    let [inputValue, setInputValue] = useState("");
    const searchByName = (e) => {//חיפוש עפי שם
        setInputValue(e.target.value);
        setFlagName(true);// ברגע שנכנסתי אם עכשיו המערך ריק אז אין תוצאות
        const copy = donationsArr.filter((item) =>//מחפש את הערך המבוקש
            item.nameOfDonor.includes(inputValue)
        );
        setNewArr(copy);//משנה את המערך הזמני להצגה
    };
    const searchByDediction = (e) => {//חיפוש עפי הקדשה
        setInputValue(e.target.value);
        setFlagDedication(true);
        const copy = donationsArr.filter((item) =>
            item.dedication.includes(inputValue)
        );
        setNewArr(copy);
    };
    //----------------------------Return-----------------------------
    return (
        <>
            <CacheProvider value={cacheRtl}>
                <div className={BGStyle}>
                    <SelectBySort donationsArr={donationsArr} setDonationsArr={setDonationsArr} />
                    <TextField id="outlined-basic" label="חפש לפי שם " variant="outlined" name="donationSum" onChange={searchByName} sx={{ margin: 2 }} />
                    <TextField id="outlined-basic" label="חפש לפי הקדשה " variant="outlined" name="dedication" onChange={searchByDediction} sx={{ margin: 2 }} />
                    {flagName && flagDedication && newArr.length === 0 && (<div>לא נמצאו תוצאות </div>)}
                    {coin == dollarRate ? (<>
                        <h1>יעד הקמפיין:{goalOfCampain / dollarRate}$</h1>
                        <h2>אחוז התרומות מתוך היעד:{percentUpToLastOur / dollarRate}%</h2>
                        <h2>סכום התרומות עד כה:{sumAllTheDonations / dollarRate}$</h2>
                    </>
                    ) : (
                        <>
                            <h1>יעד הקמפיין:{goalOfCampain}₪</h1>
                            <h2>אחוז התרומות מתוך היעד:{percentUpToLastOur}%</h2>
                            <h2>סכום התרומות עד כה:{sumAllTheDonations}₪</h2>
                        </>
                    )}
                    <h2>{donationsArr.length}סה"כ תורמים:</h2>
                    <h3>כל התרומות</h3>
                    <ul style={{ display: 'grid', gridTemplateColumns: "repeat(4,1fr)", gap: "3%", padding: "2px" }}>
                        {inputValue == "" ?
                            (donationsArr.map(item => { return <OneDonation key={item.numOfDonation} donor={item} coin={coin} /> })) :
                            (newArr.map((item) => (
                                <OneDonation key={item.numOfDonation} donor={item} coin={coin} />
                            )))
                        }
                    </ul>
                </div>
            </CacheProvider>
        </>
    );
}
export default Donations;
//כל תרומה יחידה צריכה לרנדר את הדף מכיוון שאם הוא מחשב את אחוז התרומות זה לא !יוצג