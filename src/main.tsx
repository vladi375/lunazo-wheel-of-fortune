import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const routeVariant = window.location.pathname.match(
    /\/landing-(1|2)(?:\/index\.html|\/)?$/,
)?.[1];
const variant =
    (routeVariant ?? document.body.dataset.variant) === '2' ? '2' : '1';
document.body.dataset.variant = variant;
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App variant={variant} />
    </StrictMode>,
);
