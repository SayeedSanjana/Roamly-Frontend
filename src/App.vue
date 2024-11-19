<template>
  <div id="app">
    <!-- Render the active route's component -->
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Scoped styles only affect this component */
#app {
  font-family: "Roboto", sans-serif;
  background-color: #f9f9f9; /* Light background for the app */
  min-height: 100vh; /* Ensures the app covers the full viewport height */
}
</style>
