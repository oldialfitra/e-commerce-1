import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    token: localStorage.getItem('token'),
  },
});

export default server;
