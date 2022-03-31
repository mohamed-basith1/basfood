import Axios from 'axios';

//app api port 5000
const Instance = Axios.create({
  baseURL: ' https://bastyfoodnew.herokuapp.com/',
});

export default Instance;
