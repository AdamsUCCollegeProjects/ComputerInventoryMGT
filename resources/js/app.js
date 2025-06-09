import { createApp } from "vue";
import App from './components/App.vue';
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from './router/index';
import { createPinia } from 'pinia';
import axios from "axios"

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
    components,
    directives,
});

const pinia = createPinia();

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);

// Set up axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = '/api';

app.mount("#app");