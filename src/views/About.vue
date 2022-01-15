<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "calback",
  mounted() {

    this.$store.dispatch("Authorize", {code: this.$route.query.code})
  }
};
</script>

