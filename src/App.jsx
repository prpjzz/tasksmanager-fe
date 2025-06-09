import AppRouters from './routes/AppRouters';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { StatusPriorityProvider } from './contexts/StatusPriority/StatusPriorityProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProfilePage from './pages/UserProfilePage';
import UserAccountSettingsPage from './pages/UserAccountSettingsPage';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusPriorityProvider>
          <AppRouters/>
          <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/account-settings" element={<UserAccountSettingsPage />} />
        </StatusPriorityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
