<template>
  <div class="container-fluid">
    <div class="border border-dark mb-5">
      <h1>User Management System</h1>
    </div>
    <!-- <Home /> -->
    <router-view></router-view>
  </div>
</template>

<script>
//import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    //Home,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: lightgrey;
}
html {
  background-color: lightgrey;
}
</style>
