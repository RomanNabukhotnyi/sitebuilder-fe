import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import * as appRouter from './appRouter';

const app = createApp(App);

app.use(createPinia());
app.use(appRouter.routeConfig);

app.mount('#app');