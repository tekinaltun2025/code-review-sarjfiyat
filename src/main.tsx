
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Daha kapsamlı hata yönetimi
const handleError = (error: Error) => {
  console.error('Uygulama hatası:', error);
  
  // Hata durumunda kullanıcıya görünür bir mesaj gösterebiliriz
  const errorElement = document.createElement('div');
  errorElement.style.position = 'fixed';
  errorElement.style.top = '0';
  errorElement.style.left = '0';
  errorElement.style.width = '100%';
  errorElement.style.padding = '20px';
  errorElement.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
  errorElement.style.color = 'white';
  errorElement.style.textAlign = 'center';
  errorElement.style.zIndex = '9999';
  errorElement.innerText = 'Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.';
  
  document.body.appendChild(errorElement);
};

// Global hata yakalama
window.addEventListener('error', (event) => {
  console.error('Global hata:', event.error);
});

// React hata sınırı için ayarlar
window.addEventListener('unhandledrejection', (event) => {
  console.error('İşlenmeyen Promise hatası:', event.reason);
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
  // Root element kontrolü
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root elementi bulunamadı. Sayfa yapısını kontrol edin.");
  }
  
  console.log("Uygulama başlatılıyor...");
  
  // Render işlemi
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  
  console.log("Uygulama başarıyla yüklendi.");
} catch (error) {
  handleError(error as Error);
}
