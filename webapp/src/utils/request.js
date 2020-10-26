import axios from 'axios';
const baseUrl='';
const request =axios.create({
    baseURL:baseUrl
})
export default request;