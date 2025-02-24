import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';


const domRoot = document.getElementById('root') as HTMLElement;
const root = createRoot(domRoot);
root.render(<App/>);
