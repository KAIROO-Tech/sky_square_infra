import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectsProvider } from './context/ProjectsContext';
import App from './App';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProjectsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
