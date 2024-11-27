<template>
  <!-- Header -->
  <header
    class="bg-gray-200 border-b-2 border-neutral-300 text-gray-700 p-4 shadow-md"
  >
    <div class="container mx-auto flex items-center justify-between">
      <h1 class="text-3xl font-semibold">
        Roamly <span class="text-gray-500"> - </span
        ><span class="text-2xl text-orange-400"
          >Intelligent Travel Companion</span
        >
      </h1>
      <button
        id="sign-out"
        @click="handleSignOut"
        class="flex items-center space-x-2 text-gray-700 hover:text-gray-600"
      >
        <span class="font-semibold">Sign Out</span>
        <img
          src="../assets/svgs/login-svgrepo-com.svg"
          class="h-5 w-5"
          alt="Sign Out Icon"
        />
      </button>
    </div>
  </header>
</template>

<script>
import Swal from "sweetalert2";
import { socket, joinSocketRoom } from "../services/socket.js";

export default {
  name: "Header",
  methods: {
    async handleSignOut() {
      Swal.fire({
        title: "Are you sure you want to sign out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#4caf50",
        confirmButtonText: "Yes, Sign Out",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Retrieve the token before clearing it
          const token = localStorage.getItem("token");

          if (token) {
            try {
              // Dynamically import jwt-decode
              const { default: jwtDecode } = await import("jwt-decode");
              const decoded = jwtDecode(token); // Decode the token
              const userId = decoded.userId || decoded.sub; // Adjust based on your token structure

              // Leave the room for this user
              if (userId) {
                socket.emit("leave_room", { userId }, (response) => {
                  console.log("Left room successfully:", response);
                });
              }
            } catch (error) {
              console.error("Error decoding token or leaving room:", error);
            }
          }

          // Clear the session (remove token)
          localStorage.removeItem("token");

          // Redirect to the homepage
          this.$router.push("/");

          // Show success message
          Swal.fire({
            title: "Signed Out",
            text: "You have been successfully signed out.",
            icon: "success",
            confirmButtonColor: "#4caf50",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
/* Optional styling for the header */
</style>
