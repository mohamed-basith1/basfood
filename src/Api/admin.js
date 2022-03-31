import Axios from 'axios';
//admin  api  port 8000
const Instance = Axios.create({
  baseURL: ' https://adminpanalfinalfood.herokuapp.com',
});

export default Instance;
