
import { useContext } from 'react';
import { myContext } from './App'
import "./backGroundColur.css"
//card
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//img
import givenImg from "./given.jpg"
const OneDonation = ({ donor, coin }) => {
    let { dollarRate } = useContext(myContext);
    let { BGStyle } = useContext(myContext)
    const calcDate = () => {
        let donorDate = donor.date;//משתנה עבור תאריך התרומה
        let thisDate = new Date(Date.now());//משתנה עבור תאריך נוכחי
        let diffYear = thisDate.getFullYear() - donorDate.getFullYear();
        let diffMonth = thisDate.getMonth() - donorDate.getMonth();
        let diffDay = thisDate.getDay() - donorDate.getDay();
        let diffHours = thisDate.getHours() - donorDate.getHours();
        let diffMinuts = thisDate.getMinutes() - donorDate.getMinutes();
        if (diffYear > 0) {
            return `${diffYear} שנים`;
        }
        else if (diffMonth > 0) {
            return `${diffMonth} חודשים`;
        }
        else if (diffDay > 0) {
            return `${diffDay} ימים`;
        }
        else if (diffHours > 0) {
            return `${diffHours} שעות`;
        }
        else if (diffMinuts > 0) {
            return `${diffMinuts} דקות`;
        }
        else {
            return `ממש עכשיו`
        }
    }
    return (



        <Card sx={{ maxWidth: 345 }}>
    
                <CardMedia
                    component="img"
                    height="140"
                    image={givenImg}

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'red'}}>
                   {donor.nameOfDonor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <h1>מס' תרומה:{donor.numOfDonation}</h1>
                        {coin == dollarRate ? (<h2>סכום התרומה:{donor.donationSum / coin}$</h2>) :
                            (<h2>סכום התרומה:{donor.donationSum}₪</h2>)}
                        <h2>הקדשה:{donor.dedication}</h2>
                        <h2>הזמן שחלף מעת ביצוע התרומה:{calcDate()}</h2>
                    </Typography>
                </CardContent>
         
        </Card>


 );
}
export default OneDonation;