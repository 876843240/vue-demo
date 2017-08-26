import axios from 'axios'
import getHeaders from './getHeaders'
const getInstance=()=>{
   const headers=getHeaders();
   axios.defaults.timeout=8000;
   axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
   axios.defaults.baseURL='http://192.168.0.136:8080/api/v1';
   axios.defaults.headers['deviceId']=headers.deviceId;
   axios.defaults.headers['Authorization']=headers.Authorization;
   const instance=axios.create({});
   return instance;
}
export default getInstance

