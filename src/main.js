/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// main.js

import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from '@/plugins';
import router from './router';

const app = createApp(App);

registerPlugins(app); // Registra Vuetify e outros plugins
app.use(router); // Registrando o router na aplicação


app.mount('#app');

