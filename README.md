# ☀️ Modern Weather Dashboard

A sleek and responsive weather forecasting application built with React, Redux, and Material-UI, providing current weather conditions, daily forecasts, and hourly predictions for any location.

## ✨ Features

* **Current Weather at a Glance:** Displays real-time weather information including city, date, temperature, "feels like" temperature, humidity, wind speed, and precipitation.
* **Dynamic Weather Icons:** Intuitive icons visually represent current and forecasted weather conditions for easy understanding.
* **7-Day Daily Forecast:** Get a week-long weather outlook with daily minimum/maximum temperatures and corresponding weather icons.
* **Detailed Hourly Forecast:** Dive deep into hourly weather predictions for any selected day. Past hours for the current day are automatically filtered, showing only upcoming weather.
* **City Search Functionality:** Easily search for weather information by typing a city name into the prominent search bar.
* **Unit Preferences:** (Planned/Partial) A dedicated UI for switching between various measurement units (e.g., Celsius/Fahrenheit, km/h/mph, mm/inch) for a personalized experience.
* **Fully Responsive Design:** Adapts seamlessly to different screen sizes, from mobile devices to large desktop displays, thanks to Material-UI's breakpoints and Tailwind CSS.
* **Smooth Loading Experience:** Animated loading indicators provide visual feedback while fetching weather data.
* **Robust Error Handling:** User-friendly messages for cases like "City not found."

## 🚀 Technology Stack

This application is built using a modern frontend stack:

* **React.js (v18+):** For building a dynamic and component-based user interface.
* **Redux Toolkit:** For efficient and predictable state management across the application.
* **Material-UI (MUI):** A comprehensive React UI framework for beautiful and accessible components.
* **Tailwind CSS:** A utility-first CSS framework for rapid and flexible styling.
* **CSS Modules/Global CSS:** For additional custom styling.
* **Moment.js:** A robust library for parsing, validating, manipulating, and formatting dates.
* **External Weather API:** (Inferred) Fetches weather data.
* **Vite:** (Inferred) A next-generation frontend tooling for a fast development experience.

## 📁 Project Structure (Key Components)

* `src/App.js`: The main application component, setting up the global theme, header (logo, unit selection), search bar, and rendering the primary `Home` component.
* `src/Home.js`: The central component responsible for displaying current weather details and orchestrating the `DailyForcast` and `HourlyForcast` components.
* `src/components/DailyForcast.js`: Renders the 7-day weather forecast using Material-UI cards.
* `src/components/HourlyForcast.js`: Displays hourly weather predictions for a selected day, complete with a day selection dropdown.
* `src/main.jsx`: The application's entry point, responsible for rendering the React app, enabling `StrictMode`, and integrating the Redux store.
* `src/store.js`: (Inferred) Where the Redux store is configured and reducers are combined.
* `src/contexts/WeatherDataContext.js`: (Inferred) Provides weather data to consuming components via React Context.
* `src/components/weatherIcons.js`: (Inferred) A mapping of weather codes to visual icons.

## ⚙️ Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL_HERE>
    cd <your-project-folder>
    ```
    *(Replace `<YOUR_REPOSITORY_URL_HERE>` with the actual URL of your Git repository)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or if you prefer yarn
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application should now be running and accessible in your web browser, typically at `http://localhost:5173`.

## 🤝 Contributing

(Optional section - You can add guidelines here if you plan to accept contributions.)
We welcome contributions! Please feel free to open issues or submit pull requests.

## 📄 License

(Optional section - Specify your project's license here, e.g., MIT, Apache 2.0)
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
