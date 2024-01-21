import React from 'react';
import AppRouter from './App.router';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Footer, Header } from 'shared/components';

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
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
