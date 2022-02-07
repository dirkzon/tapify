<template>
  <div class="landing" style="text-align: center">
    <h1>Tapify</h1>
    <v-btn elevation="2" @click="rout()"> log in with Spotify </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "landingPage",
  methods: {
    rout() {
      window.location.href = `${
          process.env.VUE_APP_SPOTIFY_AUTH_URI
      }/authorize?response_type=code&client_id=${
          process.env.VUE_APP_CLIENT_ID
      }&scope=${encodeURIComponent(
          String(process.env.VUE_APP_SCOPE)
      )}&redirect_uri=${process.env.VUE_APP_REDIRECT_URL}`;
    },
  },
});
</script>
