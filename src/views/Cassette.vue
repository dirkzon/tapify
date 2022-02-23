<template>
  <div data-app>
    <v-card style="width: fit-content; padding: 20px">
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
          <CassetteSide v-bind:index="n - 1"></CassetteSide>
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
});
</script>

<style scoped></style>
