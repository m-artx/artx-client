import axios from 'axios';

const url = process.env.REACT_APP_artx_base_url;

const instance = axios.create({
   baseURL: url,
   withCredentials: true,
});

export default instance;
