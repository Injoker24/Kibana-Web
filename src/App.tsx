import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppRouter from './App.router';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: React.FC<any> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="h-100">
        <Row className="justify-content-center h-100">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            className="h-100"
          >
            <AppRouter /> 
            <h1></h1>
          </Col>
        </Row>
      </Container>
    </QueryClientProvider>
  );
};

export default App;
