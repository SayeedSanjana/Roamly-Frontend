<template>
    <div
      class="bg-black bg-opacity-50 flex items-center justify-center min-h-screen bg-cover"
      :style="{
        backgroundImage: `url('/img/signup_img.jpg')`,
      }"
    >
      <div
        class="w-full max-w-md bg-white bg-opacity-90 p-10 rounded-lg shadow-lg"
      >
        <!-- Signup Heading -->
        <h2 class="text-4xl font-bold mb-6 text-center text-lime-800">Sign Up</h2>
  
        <!-- Signup Form -->
        <form @submit.prevent="handleSignup">
          <!-- Full Name Field -->
          <div class="mb-4">
            <label
              for="name"
              class="block text-lg font-semibold mb-2 text-gray-800"
              >Full Name</label
            >
            <input
              v-model="name"
              type="text"
              id="name"
              class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full name"
              required
            />
          </div>
  
          <!-- Email Field -->
          <div class="mb-4">
            <label
              for="email"
              class="block text-lg font-semibold mb-2 text-gray-800"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
  
          <!-- Password Field -->
          <div class="mb-4">
            <label
              for="password"
              class="block text-lg font-semibold mb-2 text-gray-800"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
  
          <!-- Confirm Password Field -->
          <div class="mb-8">
            <label
              for="confirm-password"
              class="block text-lg font-semibold mb-2 text-gray-800"
              >Confirm Password</label
            >
            <input
              v-model="confirmPassword"
              type="password"
              id="confirm-password"
              class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              required
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-pink-600 text-white py-4 rounded-lg text-lg font-semibold transition duration-300 hover:bg-pink-700"
          >
            Sign Up
          </button>
        </form>
  
        <!-- Login and Home Links -->
        <p class="text-center text-sm mt-6 text-gray-700">
          Already have an account?
          <RouterLink
            to="/login"
            class="font-semibold text-pink-700 hover:underline"
            >Login</RouterLink
          >
        </p>
        <p class="text-center text-sm mt-4 text-lime-800">
          <RouterLink to="/" class="font-semibold hover:underline"
            >Return to Home</RouterLink
          >
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "Signup",
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
    methods: {
      async handleSignup() {
        // Basic validation for matching passwords
        if (this.password !== this.confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: "Passwords do not match!",
            confirmButtonColor: "#f44336",
          });
          return;
        }
  
        try {
          // Send the signup data to the backend
          const response = await axios.post("http://127.0.0.1:5000/auth/signup", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
  
          // Show success message
          Swal.fire({
            icon: "success",
            title: "Signup Successful",
            text: response.data.message || "User created successfully!",
            confirmButtonColor: "#4caf50",
          });
  
          // Redirect to login after success
          this.$router.push("/login");
        } catch (error) {
          // Show error message
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: error.response?.data?.error || "An error occurred. Please try again.",
            confirmButtonColor: "#f44336",
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add responsive adjustments if needed */
  </style>
  