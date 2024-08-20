import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import Search from "../pages/Search.vue";
import User from "../pages/User.vue";
import UserEdit from "../pages/UserEdit.vue";

const routes = [
    {path: '/', component: Index},
    {path: '/team', component: Team},
    {path: '/search', component: Search},
    {path: '/user', component: User},
    {path: '/userEdit', component: UserEdit}
]

export default routes