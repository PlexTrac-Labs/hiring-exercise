<template>
  <div class="container-fluid">
    <div class="border border-dark mb-5 title">
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
  background-color: #b0c4de;
}
.title {
  background-color: #d4dfed;
  padding: 15px;
}
.bg-light {
  background-color: #d4dfed !important;
}
html {
  background-color: lightsteelblue;
}
</style>
