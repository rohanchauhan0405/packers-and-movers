// Import React
import { StrictMode } from 'react';

// Import React DOM
import { createRoot } from 'react-dom/client';

// Import BrowserRouter
import { BrowserRouter } from 'react-router-dom';

// Import CSS
import './index.css';

// Import App
import App from './App.jsx';


createRoot(document.getElementById('root')).render(

    <StrictMode>

        {/* BrowserRouter is used only once */}
        <BrowserRouter>

            <App />

        </BrowserRouter>

    </StrictMode>
);