import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import store from './services/store';
import { Provider } from 'react-redux';

import App from './components/app/app';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

const basename =
  process.env.NODE_ENV === 'production' ? '/stellar-burgers' : '/';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// import React from 'react';
// import * as ReactDOMClient from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';

// import store from './services/store';
// import { Provider } from 'react-redux';

// import App from './components/app/app';

// const container = document.getElementById('root') as HTMLElement;
// const root = ReactDOMClient.createRoot(container!);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
