

import './App.css';

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { InputGroup, FormControl, Button, Card, Container, Row, Col } from "react-bootstrap";

function App() {
  const [userInput, setUserInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getDetails = async () => {

    if (userInput.trim()) {
      const response = await fetch(

        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );

      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
        setError("");
      } else {
        setError("Enter a valid place name");
        setWeatherData(null);
      }
    } else {
      setError("Enter any place name");
      setWeatherData(null);
    }
  };

  return (
    <div>
      <Container className="text-center py-5">
        <h2 className="mb-5">WEATHER APP</h2>

        <InputGroup className="mb-4 mx-auto w-75">
          <FormControl
            placeholder="Search Your City..." className="rounded-3"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button className='ms-2 rounded-5 text-white' variant="outline-primary " onClick={getDetails} >
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}

        {/* Weather details */}
        {weatherData && (
          <>
            <div className="mb-4 mt-5 pt-5 ">
              <h4>
                {weatherData.name}, {weatherData.sys.country}{" "}
                <img
                  src={`https://flagcdn.com/64x48/${weatherData.sys.country.toLowerCase()}.png`}
                  alt={weatherData.sys.country}
                  style={{ width: '50px', height: '38px' }}  // Adjust size as per your requirement
                />

              </h4>
              <h4 className='mt-3'>{weatherData.weather[0].description.toUpperCase()}</h4>
              <h2 className='mt-3'>{weatherData.main.temp}°C</h2>
            </div>

            <Row className="g-4 mt-5 pt-5">
              <Col >
                <Card className="text-center bg-light text-dark pt-3" style={{ height: '13rem' }}>
                  <Card.Body>
                    <i className="fas fa-wind fa-2x text-primary mb-3"></i>
                    <Card.Title className='text-white'>Windspeed</Card.Title>
                    <Card.Text className='text-white'>{weatherData.wind.speed} m/s</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-center bg-light text-dark pt-3" style={{ height: '13rem' }}>
                  <Card.Body>
                    <i className="fas fa-tint fa-2x text-success mb-3"></i>
                    <Card.Title className='text-white'>Humidity</Card.Title>
                    <Card.Text className='text-white'>{weatherData.main.humidity}%</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col >
                <Card className="text-center bg-light text-dark pt-3" style={{ height: '13rem' }}>
                  <Card.Body >
                    <i className="fas fa-cloud fa-2x text-primary mb-3"></i>
                    <Card.Title className='text-white'>Clouds</Card.Title>
                    <Card.Text className='text-white'>{weatherData.clouds.all}%</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;

