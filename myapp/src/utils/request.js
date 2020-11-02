import axios from 'axios';

const baseURL = 'http://8.129.38.95:2005/'
const requset = axios.create({
    baseURL : baseURL
})

export default requset
