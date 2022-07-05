import React from 'react';
import {createRoot} from 'react-dom/client';

const Options = () => (
  <h1>Welcome to Tablication Options!</h1>
);

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
