import {createApp} from 'vue'
// import './style.css'
import Vant from 'vant';
import {createRouter, createWebHashHistory} from "vue-router";
import routes from "./config/route.ts";
import Login from "./pages/Login.vue";
import Index from "./pages/Index.vue";
import Frame from "./pages/Frame.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
const app = createApp(Frame)

app.use(Vant);
app.use(router)
app.mount('#app')





