import myAxios from "../plugins/myAxios";
import { setCurrentUserState } from "../states/user";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    // 不存在则从远程获取
    const res = await myAxios.get('/user/currentUser');
    console.log(res);
    if (res.code === 200) {
        setCurrentUserState(res.data);
        console.log(res.data);
        return res.data;
    }
    return null;
}

