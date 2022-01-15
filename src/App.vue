<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">{{message}}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
  name: "App",

  components: {
    HelloWorld,
  },
  computed: {
    message: {
      get (): string {
        return this.$store.getters.getAccessToken
      }
    }
  },
  // mounted() {
  //   this.$store.dispatch("Authorize",
  //       {code:'AQDHGFPjs2dUOtbdfB4-C6RH8wmcI0DgaxIotJbxLScR_VfoIWAn9dBPKZcaNQjnOkoyM1zF4x8P6f31sfhttu-BvBX47fgo00beA7hM5E11nL-QqOCZdGvBWWvcQyFLjV35nsB30VRZiNgFRCuw73SLlOoFPkmRU-uhuoVcIyg1IqQFM2ETVpBdzDy1k3gB1yZ3hf4xhtBIhKD4l-fd0es7CDshGfxjya1nYPeOm6bhOFwxXWjLA-5PKVRr-OSpKUKb7KiZYs5MaN0YIcma3hz9Zrp_FQXmjd21e1tNp4nfiPeZ6g'});
  // },

  data: () => ({
    //
  }),
});
</script>
