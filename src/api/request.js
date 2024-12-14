import axios from 'axios';
import cookieService from '../services/cookie.service';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || 'http://127.0.0.1:8001/api',
});

const reqAxios = () => {
  const token = cookieService.get('token');
  instanceAxios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  instanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  instanceAxios.defaults.headers.common['Api-Key'] = import.meta.env.VITE_API_KEY || 'e202d36168224a12b378622ec28ca601';
  return instanceAxios;
};

export default reqAxios;
