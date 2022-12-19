import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import * as appRouter from './appRouter';

const app = createApp(App);

app.config.errorHandler = (err) => {
  alert(err);
  console.log('err', err);
};

app.use(createPinia());
app.use(appRouter.routeConfig);

app.mount('#app');
