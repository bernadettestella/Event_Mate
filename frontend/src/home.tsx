import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

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
  { id: 1, url: 'image1.jpg' },
  { id: 2, url: 'image2.jpg' },
  { id: 3, url: 'image3.jpg' },
  // Add more images as needed
];

const Home: React.FC = () => {
  return (
    <Container>
      <Carousel autoPlay interval={5000} showThumbs={false} showStatus={false}>
        {images.map(image => (
          <Slide key={image.id} imageUrl={image.url} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Home;
