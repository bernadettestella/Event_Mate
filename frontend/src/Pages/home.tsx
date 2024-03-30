import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import backgroundImage from '../assets/background.jpg';
import usherImage1 from '../assets/usher2.jpg';
import usherImage2 from '../assets/usher3.jpg';

// Define styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

// Image data
const images = [
  { id: 1, url: backgroundImage, alt: 'EventMate Background Image' },
  { id: 2, url: usherImage1, alt: 'Usher Image 1' },
  { id: 3, url: usherImage2, alt: 'Usher Image 2' },
  // Add more images as needed
];

const Home: React.FC = () => {
  return (
    <Container>
      <Carousel autoPlay interval={5000} showThumbs={false} showStatus={false} infiniteLoop>
        {images.map(image => (
          <Slide key={image.id} imageUrl={image.url} alt={image.alt} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Home;
