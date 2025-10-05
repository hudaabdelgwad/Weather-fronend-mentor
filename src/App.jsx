
import "./App.css";
import { styled, alpha } from "@mui/material/styles";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { WeatherDataContex } from "./Contexts/WeatherDataContext";
import { useDispatch } from "react-redux";
import { fetchWeatherApi } from "./features/weatherApiSlice";
import { useSelector } from "react-redux";
import Home from "./Components/Home";
import moment from "moment";
import { setUnits } from "./features/weatherApiSlice";
import {
  Menu,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ArrowDropDown, KeyboardArrowDown } from "@mui/icons-material";

const dateNome = moment().format('yyyy-mm-ddThh:mm');;
console.log(dateNome);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "white",
  fontSize: "20px",
  backgroundColor: "#262540",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  }
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    fontSize: "20px",
    colors: "#D4D3D9"
  },
}));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 500,
      sm: 640,
      md: 788,
      lg: 1024,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: ["Bricolage Grotesque", "DM Sans", "sans-serif"].join(","),
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          // optionally align with Tailwind's container widths
          "@media (min-width:640px)": {
            maxWidth: "640px",
          },
          "@media (min-width:788px)": {
            maxWidth: "788px",
          },
          "@media (min-width:1024px)": {
            maxWidth: "1024px",
          },
          "@media (min-width:1440px)": {
            maxWidth: "1440px",
          },
        },
      },
    },
  },
});


function App() {

  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const units = useSelector((state) => state.weather.units);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log(units);

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeatherApi(city));
    }

  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (type, value) => {
    dispatch(setUnits({ [type]: value }));
    dispatch(fetchWeatherApi(city));

  };
  console.log(weather);




  return (
 
 <WeatherDataContex.Provider value={weather}>
      <div className="bg-[#02012C] pb-[80px] h-[100%]">
        <ThemeProvider theme={theme}>
          <Container className="">
            {/* header */}
            <header className="pt-12 flex justify-between ">
              <img src="/assets/logo.svg" alt="Weather App Logo"></img>

            <div>
              
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<SettingsOutlinedIcon />}
        endIcon={<KeyboardArrowDown/>}
        className="!bg-[#3C3B5E] !capitalize"
      >
        Units
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            marginTop:"4px",
            bgcolor: "#262540",
            color: "white",
            border:"1px solid #3C3B5E",
            borderRadius: "12px",
            minWidth: 220,
            p: 1,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography className="!text-base !font-[DM] px-2 pb-[10px] leading-[120%] ">
          Switch to Imperial
        </Typography>

        {/* Temperature */}
        <Typography className="text-[#ACACB7] !text-[14px] px-2">
          Temperature
        </Typography>
        {[
          { value: "celsius", label: "Celsius (°C)" },
          { value: "fahrenheit", label: "Fahrenheit (°F)" },
        ].map((item) => (
          <MenuItem
            key={item.value}
            className={`${units.temperature===item.value?"!bg-[#302F4A]":""}`}
            onClick={() => handleChange("temperature", item.value)}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText>{item.label}</ListItemText>
            {units.temperature === item.value && (
              <ListItemIcon>
                <CheckIcon fontSize="small" sx={{ color: "white" }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}

        <Divider sx={{ borderColor: "#3C3B5E", my: 1 }} />

        {/* Wind Speed */}
        <Typography
          sx={{ px: 2, pt: 1, pb: 0.5, fontSize: 12, opacity: 0.7 }}
        >
          Wind Speed
        </Typography>
        {[
          { value: "kmh", label: "km/h" },
          { value: "mph", label: "mph" },
        ].map((item) => (
          <MenuItem
          className={`${units.wind_speed===item.value?"!bg-[#302F4A]":""}`}
            key={item.value}
            onClick={() => handleChange("wind_speed", item.value)}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText>{item.label}</ListItemText>
            {units.wind_speed === item.value && (
              <ListItemIcon>
                <CheckIcon fontSize="small" sx={{ color: "white" }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}

        <Divider sx={{ borderColor: "#3C3B5E", my: 1 }} />

        {/* Precipitation */}
        <Typography
          sx={{ px: 2, pt: 1, pb: 0.5, fontSize: 12, opacity: 0.7 }}
        >
          Precipitation
        </Typography>
        {[
          { value: "mm", label: "Millimeters (mm)" },
          { value: "inch", label: "Inches (in)" },
        ].map((item) => (
          <MenuItem
          className={`${units.precipitation===item.value?"!bg-[#302F4A]":""}`}

            key={item.value}
            onClick={() => handleChange("precipitation", item.value)}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText>{item.label}</ListItemText>
            {units.precipitation === item.value && (
              <ListItemIcon>
                <CheckIcon fontSize="small" sx={{ color: "white" }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
            </div>

            </header>
            {/* header */}
            <div className={`flex flex-col items-center`}>


              {/* Title */}
              <h1
                className={`w-full text-center mt-16 text-[52px] font-[DM] font-bold leading-[120%] text-white`}
              >
                How’s the sky looking today?
              </h1>
              {/* Title */}

              {/* Search bar */}
              <div className="flex flex-col md:flex-row justify-center item-center mt-16 w-full xl:max-w-[566px] max-h-32 gap-3">
                <Search className="flex !rounded-xl !h-14 !w-full ">
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </Search>
                <Button
                  onClick={handleSearch}
                  variant="contained"
                  className="!bg-[#4658D9] !border-none !shadow-none !capitalize !font-sans !font-medium !rounded-xl !py-4 !px-6 !text-xl !w-full md:!w-fit h-14"
                >
                  Search
                </Button>

              </div>

              {/* Search bar */}
            </div>

            {/* Main content */}
            <Home />
            {/* Main content */}
          </Container>
        </ThemeProvider>
      </div>
    </WeatherDataContex.Provider>
)}
export default App;
