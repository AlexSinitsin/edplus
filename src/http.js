import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER,
  // headers: {'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": 'Bearer ' + store.getters.token }
});

//console.log( 1 + "" + localStorage.getItem('token'))
/*const parse = JSON.parse(localStorage.setItem('edplus'));
console.log() */
//instance.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX'

export default instance;
