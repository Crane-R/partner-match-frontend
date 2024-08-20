import {createApp} from 'vue'
// import './style.css'
import App from './App.vue'
import Vant from 'vant';
import {createRouter, createWebHashHistory} from "vue-router";
import routes from "./config/route.ts";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
const app = createApp(App)

app.use(Vant);
app.use(router)
app.mount('#app')





