
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top only on initial load
const forceScrollTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

// Only force scroll on initial page load, not continuously
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    forceScrollTop();
    document.body.classList.add('loaded');
    
    // Check again after a delay to catch browser scroll restoration
    setTimeout(forceScrollTop, 50);
    setTimeout(forceScrollTop, 200);
    setTimeout(forceScrollTop, 500);
  });
} else {
  // DOM is already loaded
  forceScrollTop();
  document.body.classList.add('loaded');
  
  // Check again after a delay
  setTimeout(forceScrollTop, 50);
  setTimeout(forceScrollTop, 200);
  setTimeout(forceScrollTop, 500);
}

// Also add loaded class after window load to ensure everything is ready
window.addEventListener('load', () => {
  forceScrollTop();
  document.body.classList.add('loaded');
  
  // Check again after window load (browser might restore scroll here)
  setTimeout(forceScrollTop, 0);
  setTimeout(forceScrollTop, 100);
  setTimeout(forceScrollTop, 300);
}, { once: true });

// Handle back/forward navigation
window.addEventListener('popstate', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  forceScrollTop();
  
  // Check again after navigation
  setTimeout(forceScrollTop, 0);
  setTimeout(forceScrollTop, 100);
  setTimeout(forceScrollTop, 300);
});

// Get the root element once
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Create a stable root instance
const root = createRoot(rootElement);

// Render the app only once with a stable key
root.render(<App />);
