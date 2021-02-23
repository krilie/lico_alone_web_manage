import {ToastWarn} from "../utils/toastNormal";


export let apiBaseUrl = "";
console.log(process.env)
if (process.env.NODE_ENV === "development") {
    apiBaseUrl = ''
} else {
    apiBaseUrl = 'https://api-app.lizo.top'
}
export const imageProxy = 'https://imageproxy.lizo.top' // 缩略图地址
export const minioUrl = 'https://minio.lizo.top' // minio地址
export const imageProxied = (path, ops) => imageProxy + "/" + ops + "/" + path.replace(minioUrl+"/","")

// res.data is returned data from api
// with have filed [code.message.data]
export const checkResData = (res) => res.data.code === 2000 ? res.data.data : undefined;
export const checkResDataBool = (res) => res.data.code === 2000 ? true : false;
export const getResData = (res) => checkResData(res) ? res.data.data : undefined;
export const checkIsNotFound = (res) => res.data.code === 4004;
export const checkResDataWithToast = (res) => {
    if (res.data.code !== 2000) {
        ToastWarn(res.data.message);
        return undefined;
    } else {
        return res.data.data;
    }
}
