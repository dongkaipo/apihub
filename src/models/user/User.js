import Http from "../../services/Http";
import UserContact from "./UserContact";

export default class User {
  constructor(jsonObject) {
    let data = jsonObject.data;
    this.id = data.id;
    this.avatar = data.avatar;
    this.nickname = data.nickname;
    if (data.telephone) {
      this.telephone = data.telephone;
    } else {
      this.telephone = null;
    }
    if (data.username) {
      this.username = data.username;
    } else {
      this.username = null;
    }
    if (data.email) {
      this.email = data.email;
    } else {
      this.email = null;
    }
    if (data.contact) {
      this.contact = new UserContact(data.contact);
    }
  }

  getMaxAvatar() {
    return this.avatar + "?x-oss-style:image/phoen_max";
  }
}
