import {createApp} from 'vue'
import Vant from 'vant';
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import routes from "./config/route.ts";
import Frame from "./pages/Frame.vue";
import "vant/es/toast/style"
import "../global.css"

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp(Frame)

app.use(Vant);
app.use(router)
app.mount('#app')





