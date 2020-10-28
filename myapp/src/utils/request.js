import axios from 'axios';

const baseURL = 'http://10.3.140.198:2005/'
const requset = axios.create({
    baseURL : baseURL
})

export default requset
