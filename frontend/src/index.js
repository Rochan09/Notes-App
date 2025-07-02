import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { Provider } from "react-redux";
import { store } from './redux/store';

function ThemeSync() {
  const { colorMode } = useColorMode();
  useEffect(() => {
    document.body.setAttribute('data-theme', colorMode);
    console.log('Theme changed:', colorMode);
  }, [colorMode]);
  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider store = {store}>
        <ThemeSync />
        <App />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
