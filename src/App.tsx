import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppRouter from './App.router';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

if (process.env.REACT_APP_IS_MOCKED === '1') {
  import('setup').then((setup) => setup.setupAxiosMockV2(setup.axiosInstanceV2));
}

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
          </Col>
        </Row>
      </Container>
    </QueryClientProvider>
  );
};

export default App;
