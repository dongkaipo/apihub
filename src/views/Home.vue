<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "../services/http.js";

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
  mounted() {
    console.log("i am run");
    axios({
      url: "/test/hello",
      method: "get"
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
