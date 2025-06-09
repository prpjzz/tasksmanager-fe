import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import publicRoutes from './routes/publicRoutes'; // Đảm bảo đường dẫn đúng
import { AuthProvider } from './contexts/Auth/AuthProvider'; // Đảm bảo đường dẫn đúng
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddSchedule from './pages/AddSchedule/AddSchedule'; // Đảm bảo đường dẫn đúng
import SchedulePage from './pages/SchedulePage';
// Khởi tạo QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}

            <Route path="/add-schedule" element={<AddSchedule />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;