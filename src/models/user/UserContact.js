export default class UserContact {
  constructor(jsonObject) {
    let data = jsonObject.data;
    this.name = data.name;
    this.telephone = data.telephone;
    this.zip_code = data.zip_code;
    this.address = data.address;
  }
}
