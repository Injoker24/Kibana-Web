import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppRouter from './App.router';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from 'shared/components';

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
      <Header />
      <AppRouter /> 
    </QueryClientProvider>
  );
};

export default App;
