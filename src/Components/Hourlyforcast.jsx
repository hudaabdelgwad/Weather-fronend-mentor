import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext, useState } from 'react';
import { WeatherDataContex } from '../Contexts/WeatherDataContext';
import moment from 'moment';
import { FormControl, Select, MenuItem } from '@mui/material';
import { weatherIcons } from './weatherIcons';
import CloudIcon from "@mui/icons-material/Cloud";


// Map of weather codes to icons

export default function HourlyForcast() {
    const weather = useContext(WeatherDataContex);
    const [selectDay, setSelectDay] = useState(moment().format("YYYY-MM-DD"));
    if (!weather?.weather?.hourly) return null;

    const hourly = weather.weather.hourly;

    // Group hourly data by day
    const groupedByDay = hourly.time.map((date, index) => ({
        date,
        temp: hourly.temperature_2m[index],
        code: hourly.weathercode[index]
    })).reduce((acc, item) => {
        const day = moment(item.date).format("YYYY-MM-DD");
        if (!acc[day]) acc[day] = [];
        acc[day].push(item);
        return acc;
    }, {});
    const now = moment()

    let hoursForDay = groupedByDay[selectDay] || [];

    if (moment(selectDay).isSame(now, "day")) {
        hoursForDay = hoursForDay.filter(h =>
            moment(h.date).isSameOrAfter(now, "hour")
        );
    }

    return (
                <div className='text-white bg-[#262540] p-6 rounded-[20px]' >

                    <div className='flex justify-between items-center !w-full'>
                        <Typography className='!font-[DM] !text-xl !font-semibold'>
                            Hourly Forcast
                        </Typography>

                        <FormControl>

                            <Select
                                IconComponent={KeyboardArrowDownIcon}
                                className='!font-[DM] !text-base leading-[120%] !outline-none'
                                value={selectDay}
                                onChange={(e) => setSelectDay(e.target.value)}
                                sx={{
                                    bgcolor: "#3C3B5E",
                                    color: "white",
                                    borderRadius: "8px",
                                    "& .MuiSvgIcon-root": { color: "white" },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            marginTop: "8px",
                                            padding: "0 4px",
                                            bgcolor: "#262540",        // dropdown background
                                            color: "white",
                                            border: "#3C3B5E solid 1px",   // text color
                                            borderRadius: "12px",      // round corners
                                            width: "214px",
                                            // control height
                                            "& .MuiMenuItem-root": {
                                                bgcolor: "#262540",
                                                borderRadius: "8px",
                                                // default item background
                                                "&:hover": { bgcolor: "#302F4A" },  // hover state
                                                "&.Mui-selected": { bgcolor: "#302F4A" }
                                            },
                                        },
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",   // where the menu attaches relative to the select
                                        horizontal: "right",
                                    },
                                    transformOrigin: {
                                        vertical: "top",      // where the menu grows from
                                        horizontal: "right",
                                    },
                                    getContentAnchorEl: null,
                                }}
                            >
                                {
                                    Object.keys(groupedByDay).map((day) => (
                                        <MenuItem
                                            key={day}
                                            value={day}
                                            className='!m-1 !py-2.5 !px-2 !font-[DM] !text-base !leading-[120%] !font-medium'

                                        >
                                            {moment(day).format("dddd")}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>


                    <List className='w-full !mt-2 flex flex-col gap-4 '>
                        {hoursForDay.slice(0, 8).map((h) => {
                            const Icon = weatherIcons[h.code] || <CloudIcon />; // fallback
                            return (
                                <ListItem key={h.date} className="!w-full !flex !justify-between bg-[#302F4A] border-[1px] border-[#3C3B5E] rounded-lg">
                                    <div className='flex justify-between items-center'>
                                        <div className='w-10'>
                                            {Icon}
                                        </div>
                                        <h2 className='!capitalize'>{moment(h.date).format("h a")}</h2>
                                    </div>
                                    <h3>{h.temp}&deg;</h3>
                                </ListItem>
                            )
                        })}


                    </List>


                </div >
      

    )
}