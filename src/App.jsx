import AppRouters from './routes/AppRouters';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { StatusPriorityProvider } from './contexts/StatusPriority/StatusPriorityProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusPriorityProvider>
          <AppRouters/>
        </StatusPriorityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
