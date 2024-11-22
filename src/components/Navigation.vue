<template>
  <!-- Navigation Bar -->
  <nav
    class="bg-orange-100 shadow-lg font-semibold border-b border-opacity-30 border-gray-400"
  >
    <div
      class="container mx-auto p-4 md:p-6 flex justify-between md:justify-around lg:justify-around"
    >
      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        id="menu-toggle"
        class="md:hidden flex text-gray-500 focus:outline-none"
      >
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <!-- Navigation Links -->
      <div
        :class="{ block: isMenuVisible, hidden: !isMenuVisible }"
        class="space-y-2 md:space-y-0 md:flex md:flex-row md:space-x-6 md:w-full md:justify-center"
      >
        <router-link
          to="/dashboard"
          class="text-gray-700 flex items-center text-base font-light"
          :class="{
            'underline decoration-2 text-gray-500  underline-offset-8':
              isActiveRoute('/dashboard'),
          }"
        >
          <span class="ml-2 font-medium">Dashboard</span>
        </router-link>
        <router-link
          to="/onboard"
          class="text-gray-700 flex items-center text-base font-light"
          :class="{
            'underline decoration-2 text-gray-500  underline-offset-8':
              isActiveRoute('/onboard'),
          }"
        >
          <span class="ml-2 font-medium">User Preferences</span>
        </router-link>
        <!-- <router-link
          to="/dashboard"
          class="text-gray-500 flex items-center text-base font-light"
          :class="{
            'underline decoration-2 text-gray-500 underline-offset-8':
              isActiveRoute('/dashboard'),
          }"
        >
          <span class="ml-2">Dashboard</span>
        </router-link> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      isMenuVisible: false, // Controls visibility of the mobile menu
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible; // Toggle menu visibility
    },
    isActiveRoute(route) {
      return this.$route.path === route; // Check if the current route matches the given route
    },
  },
};
</script>

<style></style>
