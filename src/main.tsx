import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { sites } from './config';
import type { SiteName } from './config';
import './styles.css';

const routeSite = window.location.pathname.match(
    /\/(wheel-v[12]-(?:ar|co))(?:\/index\.html|\/)?$/,
)?.[1] as SiteName | undefined;
const entrySite = `wheel-v${document.body.dataset.variant}-${document.body.dataset.country}` as SiteName;
const site = sites[routeSite ?? entrySite] ?? sites['wheel-v1-co'];
document.body.dataset.variant = site.variant;
document.body.dataset.country = site.country;
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App variant={site.variant} country={site.country} />
    </StrictMode>,
);
