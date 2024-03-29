import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import backgroundImage from '../assets/background.jpg';
import usherImage1 from '../assets/usher2.jpg';
import usherImage2 from '../assets/usher3.jpg';

// Define styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Slide = styled.div`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px; /* Adjust height as needed */
`;

// Image data
const images = [
  { id: 1, url: backgroundImage },
  { id: 2, url: usherImage1 },
  { id: 3, url: usherImage2 },
  // Add more images as needed
];

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Welcome to EventMate</h1>
      <p>Where ushers and event planners meet!</p>
      <Carousel autoPlay interval={5000} showThumbs={false} showStatus={false}>
        {images.map(image => (
          <Slide key={image.id} imageUrl={image.url} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Home;
