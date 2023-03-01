import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { POSITION } from 'vue-toastification';
import { useToast, type PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';

import router from './router';

const app = createApp(App);

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  bodyClassName: 'toastBody',
};

app.use(Toast, options);
app.use(createPinia());
app.use(router);

app.directive('focus', {
  mounted(el) {
    el.focus();
  },
});

const toast = useToast();

app.config.errorHandler = (err) => {
  toast.error((err as Error).message);
  console.error(err);
};

app.mount('#app');
