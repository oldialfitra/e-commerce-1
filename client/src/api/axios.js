import axios from 'axios';

const server = axios.create({
  baseURL: 'http://e-commerce-server.oldialfitra.com',
  headers: {
    token: localStorage.getItem('token'),
  },
});

export default server;
