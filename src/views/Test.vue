<template>
  <div>
    <Header />
    <Navigation />
    <div class="bg-gray-100 text-gray-900">
      <div class="container mx-auto py-10">
        <h1 class="text-2xl font-bold mb-5 text-center">
          Montreal Island Travel Companion - Wizard of Oz Testing
        </h1>

        <!-- User Context Inputs -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">Simulate User Context</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Location -->
            <div>
              <label
                for="location"
                class="block text-sm font-medium text-gray-700"
                >Location</label
              >
              <select id="location" class="mt-1 p-2 w-full border rounded">
                <option value="downtown">Downtown Montreal</option>
                <option value="old-montreal">Old Montreal</option>
                <option value="plateau">Plateau Mont-Royal</option>
                <option value="west-island">West Island</option>
              </select>
            </div>

            <!-- Time -->
            <div>
              <label for="time" class="block text-sm font-medium text-gray-700"
                >Time of Day</label
              >
              <input
                type="time"
                id="time"
                class="mt-1 p-2 w-full border rounded"
              />
            </div>

            <!-- Weather -->
            <div>
              <label
                for="weather"
                class="block text-sm font-medium text-gray-700"
                >Weather</label
              >
              <select id="weather" class="mt-1 p-2 w-full border rounded">
                <option value="clear">Clear</option>
                <option value="rainy">Rainy</option>
                <option value="snowy">Snowy</option>
                <option value="hot">Sunny</option>
                <option value="cold">Cold</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Preferred Meal Times -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">Preferred Meal Times</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="border rounded bg-white shadow p-5">
              <h3 class="text-lg font-semibold"></h3>
              <p class="text-gray-700">meal time</p>
            </div>
          </div>
        </section>

        <!-- User Cuisines -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">User Cuisines</h2>
          <div class="border rounded bg-white p-5">
            <span
              class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full m-1"
            >
            </span>
          </div>
        </section>

        <!-- Activities Section -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">Activities</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Indoor Activities -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Indoor Activities</h3>
              <div class="border rounded bg-white p-5">
                <span
                  v-for="activity in preferences.indoor_activities"
                  :key="activity"
                  class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full m-1"
                >
                  {{ activity }}
                </span>
              </div>
            </div>

            <!-- Outdoor Activities -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Outdoor Activities</h3>
              <div class="border rounded bg-white p-5">
                <span
                  v-for="activity in preferences.outdoor_activities"
                  :key="activity"
                  class="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full m-1"
                >
                  {{ activity }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Results Section -->
        <section>
          <h2 class="text-xl font-semibold mb-3">Generated Recommendations</h2>
          <div class="p-5 bg-white border rounded shadow">
            <!-- <div v-if="recommendations.length === 0" class="text-gray-500">
            No recommendations yet. Adjust inputs and click the "Generate"
            button below.
          </div> -->
            <div class="mb-3 p-3 border rounded">
              <h3 class="font-bold"></h3>
              <p></p>
            </div>
          </div>
          <button
            @click="generateRecommendations"
            class="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Generate Recommendations
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import axios from "axios";

export default {
  name: "Test",
  components: {
    Header,
    Navigation,
  },
  data() {
    return {
      preferences: {
        cuisines: [],
        indoor_activities: [],
        outdoor_activities: [],
        preferred_meal_time: [],
        visited_places: [],
      },
    };
  },
  methods: {
    async fetchUserPreferences() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("JWT not found in localStorage.");
        return;
      }

      try {
        // Make the GET request to fetch user preferences
        const response = await axios.get(
          "http://127.0.0.1:5000/user/get_preferences",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("User Preferences Response:", response.data);

        // Update preferences and user details
        const data = response.data;
        this.preferences = {
          cuisines: data.cuisines || [],
          indoor_activities: data.indoor_activities || [],
          outdoor_activities: data.outdoor_activities || [],
          preferred_meal_time: data.preferred_meal_time || [],
          visited_places: data.visited_places || [],
        };
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    },
  },
  mounted() {
    this.fetchUserPreferences();
  },
};
</script>

<style></style>
