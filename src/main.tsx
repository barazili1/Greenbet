import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global resilience handlers for cross-origin iframe sandbox execution
if (typeof window !== "undefined") {
  window.onerror = function (message) {
    if (message === "Script error." || (typeof message === "string" && message.includes("Script error"))) {
      return true; // Ignore and suppress untrackable cross-origin script errors
    }
    return false;
  };
  window.addEventListener("unhandledrejection", function (event) {
    event.preventDefault();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
