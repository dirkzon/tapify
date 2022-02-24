<template>
  <div data-app>
    <v-card style="width: fit-content; padding: 20px">
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
      <!--        <v-col>-->
      <!--          <v-select-->
      <!--            outlined-->
      <!--            :items="lengths"-->
      <!--            label="Cassette length"-->
      <!--            style="width: 300px"-->
      <!--            v-model="cassetteLength"-->
      <!--            value="60"-->
      <!--          ></v-select>-->
      <!--        </v-col>-->
      <v-row>
        <v-col :key="n" v-for="n in sidesCount">
          <CassetteSide v-bind:sideIndex="n - 1"></CassetteSide>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CassetteSide from "@/components/CassetteSide.vue";

export default Vue.extend({
  name: "Cassette",
  components: {
    CassetteSide,
  },

  async mounted() {
    await this.$store.dispatch("FillCassette", this.$route.params.playlist_id);
  },
  computed: {
    sidesCount() {
      return this.$store.getters.countCassetteSides;
    },
  },
  methods: {
    addSide: function () {
      this.$store.dispatch("addSide");
    },
  },
});
</script>

<style scoped></style>
