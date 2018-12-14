<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Http from "../services/Http.js";
import User from "../models/user/User.js";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

export default {
  name: "home",
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  components: {
    HelloWorld
  },
  mounted: function() {

    let userService = new UserService();
    userService.my(
      function(user) {
        console.log(user.contact.address);
      },
      function(error) {
        console.log(error.message);
        console.log(error.response.status);
      }
    );




  }
};
</script>
