import {getQuery, postForm, postJson} from "./ApiManage";

export const manageAddCatchword = (catchword) => {
    return postJson("/manage/catchword/add", catchword)
}

export const manageDeleteCatchword = (catchwordId) => {
    return postForm("/manage/catchword/delete", {id: catchwordId})
}

export const manageQueryCatchword = (keyword, page_size, page_num) => {
    return getQuery("/manage/catchword/query", {key_word: keyword, page_size: page_size, page_num: page_num})
}

export const manageUpdateCatchword = (catchword) => {
    return postJson("/manage/catchword/update", catchword)
}
