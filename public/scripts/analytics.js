
// Optimized Google Analytics - Defer loading
window.addEventListener('load', function() {
  setTimeout(function() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-MJD4ERPGL8';
    document.head.appendChild(script);
    
    script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MJD4ERPGL8');
    };
  }, 1000); // 1 saniye gecikme ile yükle
});
