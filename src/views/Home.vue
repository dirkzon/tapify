<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {
    window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=f280f9a3cce84889a09f0b9c2b09df85&scope=user-read-private user-read-email&redirect_uri=http://localhost:8080/callback"
  }
};
</script>
