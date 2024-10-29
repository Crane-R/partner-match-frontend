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
    {path: '/team', title: '队伍', component: Team},
    {path: '/search', title: '搜索伙伴', component: Search},
    {path: '/searchResult', title: '搜索结果', component: SearchResult},
    {path: '/login', title: '登录', component: Login},
    {path: '/teamAdd', title: '创建队伍', component: TeamAdd},
    {path: '/teamUpdate', title: '修改队伍', component: TeamUpdate},
    {path: '/user', title: '用户', component: User},
    {path: '/userEdit', title: '用户编辑', component: UserEdit},
    {path: '/user/team/create', title: '创建的队伍', component: UserTeamCreate},
    {path: '/user/team/join', title: '加入的队伍', component: UserTeamJoin},
    {path: '/user/update', title: '用户修改', component: UserUpdatePage},
]

export default routes