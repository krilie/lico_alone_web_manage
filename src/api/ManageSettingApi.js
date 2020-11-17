import {getQuery, postForm} from "./ApiManage";

export const getSettingList = () => {
    return getQuery("/manage/setting/get_setting_all")
};

// 更新配置 已经检查2000成功
export const updateSettingItem = (name, value) => {
    return postForm("/manage/setting/update_config", {name, value});
}

export const getAMapKey = () => {
    return getQuery("/manage/setting/get_a_map_key"); // 高德地图key
}