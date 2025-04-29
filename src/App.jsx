import AppRouters from './routes/AppRouters';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouters/>
    </AuthProvider>
  );
}

export default App;
