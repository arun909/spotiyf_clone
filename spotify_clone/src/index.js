import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import { StateProvider } from './utils/StateProvider';
import reducer, { initialState } from './utils/reducer';


const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <StateProvider initialState={initialState} reducer={reducer}>

    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

