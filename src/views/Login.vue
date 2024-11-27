<template>
  <div
    class="bg-black bg-opacity-50 flex items-center justify-center min-h-screen bg-cover"
    :style="{ backgroundImage: `url('/img/login.jpg')` }"
  >
    <div
      class="w-full max-w-md bg-white bg-opacity-90 p-10 rounded-lg shadow-lg"
    >
      <!-- Login Heading -->
      <h2 class="text-4xl font-bold mb-6 text-center text-lime-800">Login</h2>

      <!-- Display Backend Messages -->
      <!-- <p
        v-if="message"
        :class="{
          'text-red-500': isError,
          'text-green-500': !isError,
        }"
        class="text-center mb-4 font-semibold"
      >
        {{ message }}
      </p> -->

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label
            for="email"
            class="block text-lg font-semibold mb-2 text-gray-800"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-8">
          <label
            for="password"
            class="block text-lg font-semibold mb-2 text-gray-800"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-pink-600 text-white py-4 rounded-lg text-lg font-semibold transition duration-300 hover:bg-pink-700"
        >
          Login
        </button>
      </form>
      <p class="text-center text-sm mt-6 text-gray-700">
        Don't have an account?
        <RouterLink
          to="/signup"
          class="font-semibold text-pink-700 hover:underline"
          >Sign Up</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { socket, joinSocketRoom } from "../services/socket.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      message: "", // For inline messages
      isError: false, // Determines if the message is success or error
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Make the API request
        const response = await axios.post("http://127.0.0.1:5000/auth/login", {
          email: this.email,
          password: this.password,
        });

        // Handle success response
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        joinSocketRoom(); // Join the room with the new token

        // Set inline success message
        this.message = response.data.message || "Login successful!";
        this.isError = false;

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: response.data.message || "You have successfully logged in!",
          confirmButtonColor: "#4caf50",
        });

        // Redirect to dashboard
        setTimeout(() => {
          this.$router.push("/onboard");
        }, 2000);
      } catch (error) {
        // Handle error response
        const errorMessage =
          error.response?.data?.error || "An error occurred. Please try again.";
        this.message = errorMessage;
        this.isError = true;

        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage,
          confirmButtonColor: "#f44336",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add styles for success and error messages */
.text-red-500 {
  color: #f44336;
}
.text-green-500 {
  color: #4caf50;
}
</style>
