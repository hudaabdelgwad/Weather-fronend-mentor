import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { Typography } from "@mui/material";
import { useContext } from 'react';
import { WeatherDataContex } from '../Contexts/WeatherDataContext';
import moment from 'moment/moment';
import { weatherIcons } from './weatherIcons';
export default function DailyForcast() {

    const weather = useContext(WeatherDataContex);

    return (
        <>
            <div className='mt-12'>
                <h1 className='text-left text-white font-[DM] text-xl font-semibold mb-5'>Daliy forcast</h1>
                <div className='flex gap-4 flex-wrap '>
                    {!weather.isLoading && weather?.weather?.current ? (weather?.weather?.daily?.time?.slice(0,7).map((date, index) => {
                        const Icon = weatherIcons[weather.weather.daily.weathercode[index]] || <CloudIcon />;
                        return (
                            <Card
                                key={date} // ✅ unique key per day
                                className="card h-[165px] px-2.5 py-4 flex-1 basis-[80px] max-w-[103px] min-[820px]:max-w-full"
                            >
                                <CardActionArea
                                    sx={{
                                        height: "100%",
                                        "&[data-active]": {
                                            backgroundColor: "action.selected",
                                            "&:hover": {
                                                backgroundColor: "action.selectedHover",
                                            },
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{ height: "100%" }}
                                        className="flex flex-col justify-between items-center !p-0"
                                    >
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            className="!text-[#D4D3D9] !capitalize !text-lg"
                                        >
                                            {moment(date).format("ddd")}
                                        </Typography>
                                        <div className='w-16'>
                                            {Icon}
                                        </div>
                                        <div className="flex text-white !text-base justify-between w-full">
                                            <Typography variant="body2" className="!m-0">
                                                {weather.weather.daily.temperature_2m_min[index]}
                                            </Typography>
                                            <Typography variant="body2">
                                                {weather.weather.daily.temperature_2m_max[index]}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })) : (
                        [1, 2, 3, 4, 5, 6, 7].map((c) => {
                            return (
                                <Card
                                    key={c} // ✅ unique key per day
                                    className="card h-[165px] px-2.5 py-4 flex-1 basis-[80px] max-w-[103px] min-[820px]:max-w-full"
                                >
                                    <CardActionArea
                                        sx={{
                                            height: "100%",
                                            "&[data-active]": {
                                                backgroundColor: "action.selected",
                                                "&:hover": {
                                                    backgroundColor: "action.selectedHover",
                                                },
                                            },
                                        }}
                                    >
                                        <CardContent
                                            sx={{ height: "100%" }}
                                            className="flex flex-col justify-between items-center !p-0"
                                        >
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                className="!text-[#D4D3D9] !capitalize !text-lg"
                                            >

                                            </Typography>
                                            <div className='w-16'>

                                            </div>
                                            <div className="flex text-white !text-base justify-between w-full">
                                                <Typography variant="body2" className="!m-0">

                                                </Typography>
                                                <Typography variant="body2">

                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })
                    )
                    }



                </div>
            </div>
        </>
    )

}