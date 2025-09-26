import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// global styles
import './index.css';
import 'tailwindcss/tailwind.css';
import '@fontsource/inter/variable.css';

// utils
import './js/utils/constants.js';
import './js/utils/helpers.js';

// components
import './js/components/modal.js';
import './js/components/notifications.js';
import './js/components/navigation.js';

// auth
import './js/auth/auth.js';

// dashboards
import './js/dashboards/superadmin.js';
import './js/dashboards/admin.js';
import './js/dashboards/green-champion.js';
import './js/dashboards/worker.js';
import './js/dashboards/citizen.js';

// features
import './js/features/complaints.js';
import './js/features/tracking.js';
import './js/features/training.js';
import './js/features/ecommerce.js';

// main entry
import './js/main.js';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element not found! Did you forget to add <div id="root"></div> in index.html?');
}
