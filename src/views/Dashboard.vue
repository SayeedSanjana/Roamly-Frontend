<template>
    <div>
        <Header/>
        <Navigation/>

    </div>
    
</template>

<script>
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
export default {
  name: "Dashboard",
  components: {
    Header,
    Navigation,
  },
};
</script>

<style></style>
