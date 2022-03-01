<template>
  <v-card flat width="100%" style="padding: 10px">
    <v-col>
      <v-row>
        <v-col>
          <v-select
            v-model="sortKey"
            :items="items"
            style="width: 200px"
          ></v-select>
        </v-col>

        <v-col md="1">
          <v-row>
            <v-btn
              icon
              @click="changeDirection"
              :title="
                sort.direction === 'ASC' ? 'sort ascending' : 'sort descending'
              "
            >
              <v-icon v-if="sort.direction === 'ASC'"
                >mdi-sort-ascending</v-icon
              >
              <v-icon v-else>mdi-sort-descending</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn icon @click="deleteSort">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-sparkline
          height="30px"
          :value="graphData"
          :gradient="['#86C6F4']"
          line-width="1.5"
          smooth="8"
          type="trend"
          auto-draw
        ></v-sparkline>
      </v-row>
    </v-col>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Graph",
  props: ["sideIndex", "sortIndex", "sort"],
  data() {
    return {
      items: [
        "danceability",
        "instrumentalness",
        "liveness",
        "tempo",
        "energy",
      ],
    };
  },
  computed: {
    graphData() {
      return this.$store.getters.getCassetteSideSortByKey(
        this.sideIndex,
        this.sort.by
      );
    },
    sortKey: {
      get() {
        return this.sort.by;
      },
      set(value) {
        this.$store.dispatch("updateSort", {
          sideIndex: this.sideIndex,
          sortIndex: this.sortIndex,
          sort: { by: value, direction: this.sortDirection },
        });
      },
    },
    sortDirection() {
      return this.sort.direction;
    },
  },
  methods: {
    deleteSort: function () {
      this.$store.dispatch("deleteSort", {
        sideIndex: this.sideIndex,
        sortIndex: this.sortIndex,
      });
    },
    changeDirection: function () {
      let direction;
      if (this.sortDirection === "ASC") {
        direction = "DESC";
      } else {
        direction = "ASC";
      }
      this.$store.dispatch("updateSort", {
        sideIndex: this.sideIndex,
        sortIndex: this.sortIndex,
        sort: { by: this.sort.by, direction: direction },
      });
    },
  },
});
</script>

<style scoped></style>
