import axios from 'axios';
const request =axios.create({
    baseURL:'http://8.129.38.95:2005/'
})
export default request;