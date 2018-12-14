import Http from "./Http";

export default class AuthService {
  constructor() {}

  login(username, password) {
    Http({
      method: "post",
      url: "/oauth/token",
      data: {
        username: username,
        password: password,
        grant_type: "password",
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET
      }
    })
      .then(function(response) {
        response = JSON.parse(response);
        window.sessionStorage.setItem("access_token", response.access_token);
        window.sessionStorage.setItem("token_type", response.token_type);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
