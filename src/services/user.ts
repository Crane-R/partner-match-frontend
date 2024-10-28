// 有关用户的服务
import myAxios from "../plugins/axios.js"
import {setCurrentUser} from "../states/user.ts";

import {UserType} from "../model/user";

let currentUser: UserType

const setCurrentUser = async (user: UserType) => {
    currentUser = user
}

const getCurrentUser = async (): UserType => {
    // if (currentUser) {
    //     return currentUser
    // }
    const res = await myAxios.get('/user/current');
    if (res.code == 20000) {
        await setCurrentUser(res.data)
        console.log('获取当前用户成功', res.data)
    } else {
        console.log('获取当前用户信息失败')
    }
    return res.data
}

const userLogout = async () => {
    const res = await myAxios.post('/user/logout');
    if (res.code == 20000) {
        console.log('退出登录')
    }
}

const userUpdate = async (user: UserType) => {
    const res = await myAxios.post('/user/update', user);
    if (res.code == 20000) {
        console.log('修改成功')
    }
    return true
}

export {
    setCurrentUser,
    getCurrentUser,
    userLogout,
    userUpdate,
}