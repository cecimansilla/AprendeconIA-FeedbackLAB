
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const Main = () => {
  useEffect(() => {
    // Check if it's the first time visiting or refresh on home
    const hasVisited = localStorage.getItem('fb_lab_onboarded');
    if (!hasVisited && window.location.hash === '#/') {
      localStorage.setItem('fb_lab_onboarded', 'true');
      window.location.hash = '#/welcome';
    }
  }, []);

  return <App />;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
