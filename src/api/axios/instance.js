import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 4000,
    headers: { 'Content-Type': 'application/json' }
});
export default instance;