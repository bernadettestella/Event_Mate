import React from 'react';
import styled from 'styled-components';

// Styled components for Blog page
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

const BlogPost = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 600px;
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const BlogContent = styled.p`
  font-size: 1.2rem;
`;

const BlogPage = () => {
  return (
    <Container>
      <Title>EventMate Blog</Title>
      <BlogPost>
        <BlogTitle>Top Trends in Event Planning for 2024</BlogTitle>
        <BlogContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mi eu dui vestibulum scelerisque. Nulla facilisi. Praesent nec risus leo. Donec elementum velit ac sapien volutpat, et consequat felis aliquet. Sed id nibh vel mauris ultricies elementum.
        </BlogContent>
      </BlogPost>
      <BlogPost>
        <BlogTitle>How to Choose the Perfect Venue for Your Event</BlogTitle>
        <BlogContent>
          Vestibulum id mattis velit, eu condimentum est. Aliquam erat volutpat. Duis convallis lectus eu magna tincidunt, a tempus risus eleifend. Fusce nec erat nec arcu placerat faucibus.
        </BlogContent>
      </BlogPost>
      {/* Add more blog posts as needed */}
    </Container>
  );
};

export default BlogPage;
