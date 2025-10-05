import { Container, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DailyForcast from "./DailyForast";
import HourlyForcast from "./Hourlyforcast";
import { weatherIcons } from "./weatherIcons";
import { Box, keyframes } from "@mui/material";
import { useContext } from "react";
import { WeatherDataContex } from "../Contexts/WeatherDataContext";
import moment from 'moment';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { FormControl, Select, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;
export default function Home() {
    const units = useSelector((state) => state.weather.units);
    const weather = useContext(WeatherDataContex);
    console.log(weather);
    const icon = weather?.weather?.current
        ? weatherIcons[weather.weather.current.weathercode]
        : null;
    return (
        <>
            {weather.error !== "City not found" ? (
                <div className={`w-full mt-8 flex flex-col xl:flex-row gap-8 max-w-800px`}>
                    <div className="w-full flex-2">
                        <div className="w-full h-72 bg-[#262540] flex justify-center rounded-3xl">

                            {!weather.isLoading && weather?.weather?.current ? (
                                <div className=" w-full bg-[url('/assets/bg-today-small.svg')] sm:bg-[url('/assets/bg-today-large.svg')] bg-no-repeat bg-cover bg-center h-72 flex flex-col sm:flex-row justify-around items-center px-6 rounded-[20px] ">
                                    <div>
                                        <h1 className="font-[DM] font-bold text-white text-[28px] leading-[120%] mb-3 !capitalize">
                                            {weather.weather.city}
                                        </h1>
                                        <h6 className="font-[DM] font-medium text-lg leading-[120%] text-white trading">
                                            {moment().format('dddd, MMMM D, YYYY')}
                                        </h6>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <span style={{ width: "120px" }}>{icon}</span>
                                        <h1 className="text-white text-8xl font-[DM] font-[800]">{weather?.weather?.current?.temperature_2m ?? "--"}&deg;</h1>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col !text-white !text-lg font-[DM] !font-medium justify-center items-center gap-3.5">

                                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }} className="">
                                        {[0, 1, 2].map((i) => (
                                            <Box
                                                key={i}
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: "50%",
                                                    bgcolor: "white",
                                                    animation: `${bounce} 1.4s infinite ease-in-out`,
                                                    animationDelay: `${i * 0.2}s`,
                                                }}
                                            />
                                        ))}




                                    </Box>
                                    Loading...
                                </div>

                            )
                            }
                        </div>

                        <div className="mt-8 flex flex-wrap justify-between gap-4">
                            <Card className="card ">
                                <CardActionArea
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ height: '100%' }} className="flex flex-col justify-between">
                                        <Typography component="div" className="!text-[#D4D3D9] capitalize text-base !font-[DM] !font-medium">
                                            Feels Like
                                        </Typography>
                                        <Typography variant="body2" className="cardBpdy" >
                                            {weather?.weather?.current?.apparent_temperature ?? "__"}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className=" card">
                                <CardActionArea
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ height: '100%' }} className="flex flex-col justify-between">
                                        <Typography component="div" className="!text-[#D4D3D9] text-base capitalize">
                                            Humidity
                                        </Typography>
                                        <Typography variant="body2" className="cardBpdy">
                                            {weather?.weather?.current?.relative_humidity_2m != null
                                                ? `${weather.weather.current.relative_humidity_2m}%`
                                                : "__"}


                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className="card">
                                <CardActionArea
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ height: '100%' }} className="flex flex-col justify-between">
                                        <Typography component="div" className="!text-[#D4D3D9] capitalize text-base" >
                                            Wind
                                        </Typography>
                                        <Typography variant="body2" className="cardBpdy">
                                            {weather?.weather?.current?.wind_speed_10m != null
                                                ? `${weather.weather.current.wind_speed_10m}${units.wind_speed}`
                                                : "__"}

                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className=" card">
                                <CardActionArea
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ height: '100%' }} className="flex flex-col justify-between">
                                        <Typography variant="h5" component="div" className="!text-[#D4D3D9] capitalize">
                                            Precipitation
                                        </Typography>
                                        <Typography variant="body2" className="cardBpdy">
                                            {weather?.weather?.current?.precipitation != null
                                                ? `${weather.weather.current.precipitation}${(units.precipitation).slice(0, 2)}`
                                                : "__"}

                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <DailyForcast />
                    </div>
                    <div className="flex-1">
                        {!weather.isLoading && weather?.weather?.current ? <HourlyForcast /> : <div className='text-white bg-[#262540] p-6 rounded-[20px] min-h-[200px]' >

                            <div className='flex justify-between items-center !w-full'>
                                <Typography className='!font-[DM] !text-xl !font-semibold'>
                                    Hourly Forcast
                                </Typography>

                                <FormControl>

                                    <Select
                                        IconComponent={KeyboardArrowDownIcon}

                                        value={"--"}
                                        sx={{
                                            bgcolor: "#3C3B5E",
                                            color: "white",
                                            borderRadius: "8px",
                                            "& .MuiSvgIcon-root": { color: "white" },
                                        }}

                                    >

                                    </Select>
                                </FormControl>
                            </div>


                            <List className='w-full !mt-2 flex flex-col gap-4 '>
                                {[...Array(8)].map((h) => {
                                    return (
                                        <ListItem key={h} className="!w-full !flex !justify-between !p-0 bg-[#302F4A] border-[1px] border-[#3C3B5E] rounded-lg">
                                            <div className='flex justify-between items-center h-[60px]'>


                                            </div>

                                        </ListItem>
                                    )
                                })}


                            </List>


                        </div >}

                    </div>



                </div>) : (
                <div className="w-full flex justify-center h-screen mt-4">
                    <h1 className="text-[28px] font-[DM] font-bold text-white">
                        No search result found!
                    </h1>
                </div>)}



        </>
    )
}