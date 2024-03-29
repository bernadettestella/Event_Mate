import React from 'react';
import styled from 'styled-components';

// Styled components for About page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
`;

const AboutPage = () => {
  return (
    <Container>
      <Title>About EventMate</Title>
      <Description>
        EventMate is a platform designed to bring together ushers and event planners in one place. Our mission is to simplify the process of hiring ushers for events, making it easy for event planners to find reliable and professional staff for their events.
      </Description>
      <Description>
        Whether you're planning a wedding, corporate event, or any other special occasion, EventMate has you covered. Our platform connects event planners with a network of experienced ushers who are ready to make your event a success.
      </Description>
    </Container>
  );
};

export default AboutPage;
