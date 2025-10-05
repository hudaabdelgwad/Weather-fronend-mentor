import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
const startDate = moment().format("YYYY-MM-DD");
console.log("stdate",startDate);

// End date = 7 days later
const endDate = moment().add(7, "days").format("YYYY-MM-DD");
console.log("stdate",endDate);

export const fetchWeatherApi = createAsyncThunk(
  "weather/fetchWeatherApi",
  async (cityName, { rejectWithValue ,getState}) => {
    try {
      // Step 1: Geocoding API
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search`,
        {
          params: { name: cityName },
        }
      );

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        return rejectWithValue("City not found");
      }

      const { latitude, longitude,name } = geoRes.data.results[0];
      const { units } = getState().weather; 
      // Step 2: Forecast API
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude,
            longitude,
            hourly: "temperature_2m,weathercode",
            current:
              "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,wind_speed_10m",
            daily:"temperature_2m_max,temperature_2m_min,weathercode",
            start_date:startDate,
            end_date:endDate,
            temperature_unit: units.temperature,
            wind_speed_unit: units.wind_speed,
            precipitation_unit: units.precipitation,
            timezone: "auto",
          },
        }
      );

      return { city: name, ...weatherRes.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const weatherApiSlice = createSlice({
  name: "weather",
  initialState: {
    isLoading: false,
    weather: {},
    error:null,
     units: {
      temperature: "celsius",       // or "fahrenheit"
      wind_speed: "kmh",           // or "mph", "ms", "kn"
      precipitation: "mm",         // or "inch"
    },
  },
  reducers: {
    setUnits: (state, action) => {
      state.units = { ...state.units, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeatherApi.rejected, (state, action) => {
        state.isLoading = false;
         state.weather = action.payload;
        state.error = action.payload;
      });
  },
});

export const { setUnits } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
