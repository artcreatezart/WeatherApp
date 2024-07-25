import {useState, useEffect} from 'react'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
// Font awesome marker icon
import { FaMapMarkerAlt } from 'react-icons/fa'
// Celcius Icon
import { WiCelsius } from 'react-icons/wi'

// Api Key
const apikey = import.meta.env.VITE_WEATHER_API_KEY

const Weather = () => {
    // Set State
    // Weather
    const [weather, setWeather] = useState(null)
    // Location
    const [location, setLocation] = useState('Wellington')
    // Loading  (whether there is a state of loading or not)
    const [loading, setLoading] = useState(true)

    // UseEffect Wrapper for our api call
    useEffect(() => {
        // api call - use Axios - Request = Get HTTP method
        const fetchWeather = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}`)
                console.log(response.data);
                setWeather(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchWeather()
        // When the data is successfully retrieved setLoading to false
    }, [location])

    // Function to hangle location change on user input
    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

  return (
    <div className='weather-container'>
        {loading ? (
            <Puff color='#D90368' height={100} width={100}/>
        ) : (
        <>
            <div className='location-container'>
                <FaMapMarkerAlt/>
                <input 
                    type='text'
                    value={location}
                    onChange={handleLocationChange}
                />
            </div>
            <div className='temp-container'>
                <WiCelsius/>
                {weather.current.temp_c}
                °C
            </div>
            <div className='condition-container'>
                {weather.current.condition.text}
            </div>
        </>
        )}
    </div>
  )
}

export default Weather
