import Http from "./Http";
import User from "../models/user/User";

export default class UserService {
  constructor() {}

  show(id, success, fail) {
    Http({
      method: "get",
      url: `/users/${id}`
    })
      .then(function(response) {
        let json = JSON.parse(response);
        let user = new User(json);
        success(user);
      })
      .catch(function(error) {
        fail(error);
      });
  }

  my(success, fail) {
    Http({
      method: "get",
      url: "/users/my",
      params: {
        include: "contact"
      }
    })
      .then(function(response) {
        let json = JSON.parse(response);
        let user = new User(json);
        success(user);
      })
      .catch(function(error) {
        fail(error);
      });
  }
}
