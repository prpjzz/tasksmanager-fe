import AppRouters from './routes/AppRouters';
import { AuthProvider } from './contexts/AuthProvider/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouters/>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
