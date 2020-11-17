import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({
    autoClose: 1500,
    draggable: false,
    position: toast.POSITION.BOTTOM_CENTER
})

export const ToastNormal = (msg) => toast(msg);
export const ToastWarn = (msg) => toast.warn(msg);
export const ToastErr = (msg) => toast.error(msg);
export const ToastInfo = (msg) => toast.info(msg);