import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import Search from "../pages/Search.vue";
import User from "../pages/User.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import Login from "../pages/Login.vue";
import TeamAdd from "../pages/TeamAdd.vue";
import TeamUpdate from "../pages/TeamUpdate.vue";
import UserTeamCreate from "../pages/UserTeamCreate.vue";
import UserTeamJoin from "../pages/UserTeamJoin.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";

const routes = [
    {path: '/', component: Index},
    {path: '/team', component: Team},
    {path: '/search', component: Search},
    {path: '/searchResult', component: SearchResult},
    {path: '/login', component: Login},
    {path: '/teamAdd', component: TeamAdd},
    {path: '/teamUpdate', component: TeamUpdate},
    {path: '/user', component: User},
    {path: '/userEdit', component: UserEdit},
    {path: '/user/team/create', component: UserTeamCreate},
    {path: '/user/team/join', component: UserTeamJoin},
    {path: '/user/update', component: UserUpdatePage},
]

export default routes