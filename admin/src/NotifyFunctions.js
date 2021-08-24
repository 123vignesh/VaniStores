import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export let notifyFailure = (data) => toast.error(data, {
    position: toast.POSITION.TOP_RIGHT
}, { autoClose: 15000 });

export let notifySuccess = (data) => toast.success(data, {
    position: toast.POSITION.TOP_RIGHT
}, { autoClose: 15000 });

export let notifyInfo = (data) => toast.info(data, {
    position: toast.POSITION.TOP_RIGHT
}, { autoClose: 15000 });