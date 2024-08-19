import * as React from 'react';
import { useState } from "react";
//mui עבור ה selection
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// לצד ימין בכפתורים mui הפיכת הטקסט מ 
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
const SelectBySort = ({ donationsArr, setDonationsArr }) => {
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const [age, setAge] = React.useState('');

    const sortByNewDonaration = () => {//מיון עפי תאריך חדש
        const copy = [...donationsArr].sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );
        setDonationsArr(copy)
    }

    const sortByOldDonaration = () => {//מיון עפי תרומה ישנה

        const copy = [...donationsArr].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        setDonationsArr(copy)

    }

    const sortBySumDonaration = () => {//מיון עפי גובה התרומה
        let copy = [...donationsArr].sort((a, b) =>
            a.donationSum - b.donationSum
        );
        setDonationsArr(copy)
    }
    return (
        <>
            <CacheProvider value={cacheRtl}>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ width: 120, margin: 2 }} >
                        <InputLabel id="demo-simple-select-label">מיין לפי</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"

                        >
                            <MenuItem value={10} onClick={sortByOldDonaration}>ישן</MenuItem>
                            <MenuItem value={20} onClick={sortByNewDonaration}>חדש</MenuItem>
                            <MenuItem value={30} onClick={sortBySumDonaration}>גובה התרומה</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </CacheProvider>
        </>
    );

}


export default SelectBySort;