import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    import { BrowserRouter } from "react-router-dom";
    <App />
  </React.StrictMode>
);
