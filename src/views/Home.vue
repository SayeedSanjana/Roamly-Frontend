<template>
  <div class="relative h-screen shadow-md bg-cover bg-center bg">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
    <div class="relative z-10 lg:py-8 text-gray-100">
      <!-- Header -->
      <header class="text-center px-6">
        <h1 class="text-5xl font-bold mb-4">
          Welcome to
          <span class="text-orange-400">Intelligent Travel Companion</span>
        </h1>
        <p class="text-2xl font-semibold mb-6">
          Your trusted companion to explore the world, tailored to your
          preferences and interests.
        </p>
      </header>

      <!-- Main Content -->
      <main>
        <section
          class="bg-gray-100 bg-opacity-80 p-8 rounded-md shadow-md text-center text-gray-700 max-w-4xl mx-auto"
        >
          <h2 class="text-3xl font-semibold mb-4">
            Discover Personalized Adventures
          </h2>
          <p class="text-2xl mb-6">
            We help you find the best places to visit, dine, and explore, based
            on your unique tastes and real-time information. <br />
            Enjoy every moment with recommendations made just for you.
          </p>
          <div class="space-x-4">
            <RouterLink
              to="/login"
              class="inline-block bg-pink-500 text-white py-3 px-8 rounded transition duration-300 hover:bg-pink-600"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/signup"
              class="inline-block bg-slate-500 text-white py-3 px-8 rounded transition duration-300 hover:bg-slate-600"
            >
              Sign Up
            </RouterLink>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Add responsive adjustments here if needed */
h1 {
  font-size: clamp(2.5rem, 5vw, 5rem); /* Responsive heading size */
}
.bg {
  background-image: url("/img/travel.jpg"); /* Corrected path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
