import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FruitsSection from './FruitsSection';
import VegetablesSection from './VegetablesSection';
import NavbarComponent from './NavbarComponent';

const App = () => {
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/fruits')
      .then(response => response.json())
      .then(data => setFruits(data))
      .catch(error => console.error('Error fetching fruits:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/vegetables')
      .then(response => response.json())
      .then(data => setVegetables(data))
      .catch(error => console.error('Error fetching vegetables:', error));
  }, []);

  return (
    <>
      <NavbarComponent />

      <Container
        fluid
        id="home-section"
        className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center mt-5 pt-5"
      >
        <h1 className="my-4">Welcome to Hellth-Wellth</h1>
        <p>Discover the freshest fruits and vegetables with detailed descriptions.</p>
      </Container>

      <FruitsSection fruits={fruits} />
      <VegetablesSection vegetables={vegetables} />

      <footer className="text-center mt-5">
        <p>&copy; 2024 Fresh Produce. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;
