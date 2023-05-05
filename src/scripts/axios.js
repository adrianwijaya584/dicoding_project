import axios from 'axios';

axios.interceptors.request.use((req)=> {
  req.baseURL= 'https://api.thecatapi.com/v1/';

  req.headers['x-api-key']=
  'live_P65A8SkZ1GjQlOB6ThkMgQCw3xtVfCCpBsPeAVOLZ7Nv91fxHuH6D6LTxOOkv2zp';

  return req;
}, (error)=> {
  return Promise.reject(error);
});

axios.interceptors.response.use((data)=> {
  return Promise.resolve(data.data);
}, (error)=> {
  return Promise.reject(error);
});

export default axios;
