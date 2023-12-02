import RouterContent from './routes/Routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './App.css';


function App() {
  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <RouterContent />
      </div>
    </QueryClientProvider>
  );
}

export default App;