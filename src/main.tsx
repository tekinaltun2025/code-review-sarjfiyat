
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Add error handling
const handleError = (error: Error) => {
  console.error('Application error:', error);
  // You can add more error handling logic here
};

// Set up error boundaries
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element not found");
  
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
} catch (error) {
  handleError(error as Error);
}
