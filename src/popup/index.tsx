import React from 'react';
import {createRoot} from 'react-dom/client';

const styles = {
  width: '400px',
};

const Popup = () => (
  <h1 style={styles}>Welcome to Tablication Popup!</h1>
);

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
