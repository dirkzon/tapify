<template>
  <div data-app>
    <v-dialog v-model="dialog" width="500"
      ><UploadPopUp></UploadPopUp>
    </v-dialog>
    <v-card style="width: fit-content; padding: 20px">
      <v-card-title> {{ this.playlist.name }} </v-card-title>
      <v-card-subtitle> {{ this.playlist.creator }} </v-card-subtitle>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <div style="padding: 5px">
            <v-btn
              title="Add side"
              class="v-icon"
              icon
              large
              @click="addSide"
              style="margin: 20px"
            >
              <v-icon large>mdi-playlist-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col :key="n" v-for="n in sidesCount">
          <CassetteSide v-bind:sideIndex="n - 1"></CassetteSide>
        </v-col>
      </v-row>
      <v-btn @click="showDialog"> upload cassette </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CassetteSide from "@/components/CassetteSide.vue";
import UploadPopUp from "@/components/UploadPopUp.vue";

export default Vue.extend({
  name: "Cassette",
  components: {
    CassetteSide,
    UploadPopUp,
  },
  data() {
    return {
      dialog: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("FillCassette", this.$route.params.playlist_id);
  },
  computed: {
    sidesCount() {
      return this.$store.getters.countCassetteSides;
    },
    playlist() {
      return this.$store.getters.getPlaylistData;
    },
  },
  methods: {
    addSide: function () {
      this.$store.dispatch("addSide");
    },
    showDialog: function () {
      this.dialog = true;
    },
  },
});
</script>

<style scoped></style>
