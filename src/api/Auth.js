import http from "../http";

//let q = JSON.parse(localStorage.getItem('levelup'))
//http.defaults.headers.common['Authorization'] = 'Bearer ' + q.auth.token

class Auth {
  static async registrtion(data) {
    return await http.post("/user", data);
  }
  static async auth(auth) {
    console.log(auth);
    return await http.get("/auth", { params: auth });
  }
  static async getUser() {
    return await http.get("/user");
  }
  static async update(data) {
    return await http.patch(`/user`, data);
  }
  static async avatar(data) {
    return await http.post("/user/avatar", data);
  }
  static async recovery(data) {
    return await http.post("/user/recovery", data);
  }
}

export default Auth;
