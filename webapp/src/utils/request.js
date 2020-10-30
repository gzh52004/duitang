import axios from 'axios';
const baseUrl='http://10.3.140.198:2005/';
const request =axios.create({
    baseURL:'http://10.3.140.198:2005/'
})
export default request;