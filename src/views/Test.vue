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
              <select
                id="location"
                class="mt-1 p-2 w-full border rounded appearance-none bg-white"
                v-model="selectedLocation"
                @change="updateLocationCoordinates"
              >
                <option
                  v-for="(loc, index) in locations"
                  :key="index"
                  :value="loc"
                >
                  {{ loc.name }}
                </option>
              </select>
            </div>

            <!-- Time -->
            <div>
              <label for="time" class="block text-sm font-medium text-gray-700"
                >Time of Day</label
              >
              <input
                v-model="time"
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
              <select
                id="weather"
                class="mt-1 p-2 w-full border rounded appearance-none bg-white"
                v-model="weather"
              >
                <option value="clear">Clear</option>
                <option value="rainy">Rainy</option>
                <option value="snowy">Snowy</option>
                <option value="sunny">Sunny</option>
                <option value="cold">Cold</option>
                <option value="clouds">Clouds</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Alerts Section -->
        <!-- <section class="container mx-auto py-4 mb-8">
          <div id="alerts" class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-semibold">Alerts & Notifications</h2>
            <div
              v-if="showNotification"
              class="fixed top-0 left-0 w-full bg-green-500 text-white text-center p-4"
            >
              {{ notificationMessage }}
            </div>
            <div v-else id="notifications" class="text-gray-500 mt-2">
              <p>No alerts at the moment.</p>
            </div>
          </div>
        </section> -->

        <!-- Alerts Section -->

        <!-- Preferred Meal Times -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">Preferred Meal Times</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <span
              class="text-gray-400 text-base"
              v-if="preferences.preferred_meal_time.length <= 0"
              >No outdoor preferred meal time yet yet</span
            >
            <div
              class="border rounded bg-white shadow p-5"
              v-for="item in preferences.preferred_meal_time"
              :key="item"
            >
              <h3 class="text-lg font-semibold">{{ item.meal }}</h3>
              <p class="text-gray-700">{{ item.time }}</p>
            </div>
          </div>
        </section>

        <!-- User Cuisines -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">User Cuisines</h2>
          <div class="border rounded bg-white p-5">
            <span
              class="text-gray-400 text-base"
              v-if="preferences.cuisines.length <= 0"
              >No cuisine preferences yet</span
            >
            <span
              v-for="cuisine in preferences.cuisines"
              :key="cuisine"
              class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full m-1"
            >
              {{ cuisine }}
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
                  class="text-gray-400 text-base"
                  v-if="preferences.indoor_activities.length <= 0"
                  >No indoor activities preferences yet</span
                >
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
                  class="text-gray-400 text-base"
                  v-if="preferences.outdoor_activities.length <= 0"
                  >No outdoor activities preferences yet</span
                >
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
        <!-- Alerts Section -->
        <section class="container mx-auto py-4 mb-8">
          <div
            id="alerts"
            class="bg-white p-4 rounded-lg shadow relative flex items-center"
          >
            <!-- SVG Notification Indicator -->
            <div
              v-if="showNotification"
              class="absolute top-2 left-2 h-12 w-12 flex items-center justify-center"
            >
              <img
                src="../../public/icons/notifications.gif"
                class="w-12 h-12"
                alt="Notification Icon"
              />
            </div>

            <!-- Title and Content -->
            <div
              :class="{ 'ml-12 bg-pink-50 p-4 w-fullS': showNotification }"
              class="transition-all duration-300"
            >
              <h2
                :class="{
                  'text-red-500 ': showNotification,
                  'text-gray-800': !showNotification,
                }"
                class="text-xl font-semibold"
              >
                Alerts & Notifications
              </h2>
              <div v-if="showNotification" class="text-gray-800 mt-2">
                <p>{{ notificationMessage }}</p>
              </div>
              <div v-else class="text-gray-500 mt-2">
                <p>No alerts at the moment.</p>
              </div>
            </div>
          </div>
        </section>
        <!-- Results Section -->
        <section>
          <section
            id="personalized-recommendations"
            class="bg-white p-4 rounded-lg shadow space-y-6 pt-8"
          >
            <h2 class="text-xl font-semibold">Personalized Recommendations</h2>
            <p
              class="text-base text-gray-400"
              v-if="paginatedPersonalizedRecommendations <= 0"
            >
              No personalized recommendation yet.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                v-for="(item, index) in paginatedPersonalizedRecommendations"
                :key="index"
                class="bg-white shadow rounded-lg p-4 flex flex-col justify-between border border-gray-200"
              >
                <div>
                  <div class="text-lg font-bold text-gray-600 mb-2">
                    {{ item.name }}
                    <span class="text-gray-400 font-normal text-sm"
                      >({{ item.type }})</span
                    >
                  </div>
                  <div
                    class="nline-block bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full m-1"
                  >
                    {{ item.cuisine_type }}
                  </div>
                  <p class="text-sm text-gray-500">
                    <span class="font-semibold">Address:</span>
                    {{ item.address }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-semibold">Distance:</span>
                    {{ item.distance }} km
                  </p>
                  <div class="flex items-center space-x-2">
                    <!-- <span class="font-semibold text-sm text-gray-500"
                    >Rating:
                  </span> -->

                    <span class="text-yellow-500 font-semibold text-medium">{{
                      item.rating
                    }}</span>
                    <img
                      src="../assets/svgs/star.svg"
                      class="w-5 h-5"
                      alt="review"
                    />
                    <span
                      v-if="item.review_count > 0"
                      class="text-sm text-gray-600"
                      >({{ item.review_count }} reviews)</span
                    >
                  </div>
                </div>
                <div class="mt-2 flex space-x-2">
                  <button
                    id="drop-by-btn"
                    class="text-orange-500 lg:hover:text-orange-600 text-sm font-semibold px-4 rounded w-full flex"
                    data-id="${item._id}"
                    data-index="${index}"
                  >
                    <img
                      src="../assets/svgs/dropby.svg"
                      class="w-5 h-5 mr-2"
                      alt="dropby"
                    />
                    Drop by
                  </button>
                  <button
                    @click="openTransportationModal(item)"
                    class="see-more-btn text-slate-500 hover:text-slate-600 text-sm font-semibold py-2 px-4 rounded w-full hover:underline"
                  >
                    Transport Options
                  </button>
                </div>
              </div>

              <!-- Modal for Transportation -->
              <div
                v-if="selectedItem"
                class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              >
                <div
                  class="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-lg relative"
                >
                  <!-- Close Button -->
                  <button
                    @click="closeTransportationModal"
                    class="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    &times;
                  </button>
                  <h2 class="text-2xl font-semibold mb-4">
                    Recommended Transportations for
                    <span class="text-orange-500">{{ selectedItem.name }}</span>
                  </h2>

                  <div
                    v-if="paginatedTransportations.length > 0"
                    class="space-y-4"
                  >
                    <div
                      v-for="(
                        transportation, tIndex
                      ) in paginatedTransportations"
                      :key="tIndex"
                      class="border border-gray-300 rounded-lg p-4"
                    >
                      <h3 class="text-lg font-bold">
                        {{ transportation.name }}
                      </h3>
                      <p>
                        <strong>Address:</strong> {{ transportation.address }}
                      </p>
                      <p>
                        <strong>Category:</strong> {{ transportation.category }}
                      </p>
                      <p>
                        <strong>Distance:</strong>
                        {{ transportation.distance }} km
                      </p>
                    </div>
                  </div>
                  <p v-else class="text-gray-500">
                    No transportation recommendations available.
                  </p>

                  <!-- Pagination Controls -->
                  <div
                    v-if="totalTransportationPages > 1"
                    class="flex justify-center items-center space-x-4 mt-4"
                  >
                    <button
                      @click="changeTransportationPage(false)"
                      :disabled="transportationPage === 1"
                      class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span class="text-gray-700"
                      >Page {{ transportationPage }}</span
                    >
                    <button
                      @click="changeTransportationPage(true)"
                      :disabled="
                        transportationPage === totalTransportationPages
                      "
                      class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center items-center space-x-2 mt-4">
              <button
                @click="changePage('personalized', false)"
                :disabled="personalizedPage === 1"
                class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span class="page-indicator text-gray-700"
                >Page {{ personalizedPage }}</span
              >
              <button
                @click="changePage('personalized', true)"
                :disabled="personalizedPage === totalPersonalizedPages"
                class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </section>

          <!-- Popular Recommendations -->
          <section
            id="popular-recommendations"
            class="bg-white p-4 rounded-lg shadow space-y-6 pt-8"
          >
            <h2 class="text-xl font-semibold">Popular Recommendations</h2>
            <p
              class="text-base text-gray-400"
              v-if="paginatedPopularRecommendations <= 0"
            >
              No personalized recommendation yet.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                v-for="item in paginatedPopularRecommendations"
                :key="item._id"
                class="bg-white shadow rounded-lg p-4 flex flex-col justify-between border border-gray-200"
                data-id="${item._id}"
              >
                <div>
                  <div class="text-lg font-bold text-gray-600 mb-2">
                    {{ item.name }}
                    <span class="text-gray-400 font-normal text-sm"
                      >({{ item.type }})</span
                    >
                  </div>
                  <div
                    class="nline-block bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full m-1"
                  >
                    {{ item.cuisine_type }}
                  </div>
                  <p class="text-sm text-gray-500">
                    <span class="font-semibold">Address:</span>
                    {{ item.address }} km
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-semibold">Distance:</span>
                    {{ item.distance }} km
                  </p>
                  <div class="flex items-center space-x-2">
                    <!-- <span class="font-semibold text-sm text-gray-500"
                    >Rating:
                  </span> -->

                    <span class="text-yellow-500 font-semibold text-medium">{{
                      item.rating
                    }}</span>
                    <img
                      src="../assets/svgs/star.svg"
                      class="w-5 h-5"
                      alt="review"
                    />
                    <span
                      v-if="item.review_count > 0"
                      class="text-sm text-gray-600"
                      >({{ item.review_count }} reviews)</span
                    >
                  </div>
                </div>
                <div class="mt-2 flex space-x-2">
                  <button
                    id="drop-by-btn"
                    class="text-orange-500 lg:hover:text-orange-600 text-sm font-semibold px-4 rounded w-full flex"
                    data-id="${item._id}"
                    data-index="${index}"
                  >
                    <img
                      src="../assets/svgs/dropby.svg"
                      class="w-5 h-5 mr-2"
                      alt="dropby"
                    />
                    Drop by
                  </button>
                  <button
                    @click="popenTransportationModal(item)"
                    class="see-more-btn text-slate-500 hover:text-slate-600 text-sm font-semibold py-2 px-4 rounded w-full hover:underline"
                  >
                    Transport Options
                  </button>

                  <!-- Modal for Transportation -->
                  <div
                    v-if="pselectedItem"
                    class="fixed inset-0 bg-gray-900 bg-opacity-25 flex justify-center items-center z-50"
                  >
                    <div
                      class="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-lg relative"
                    >
                      <!-- Close Button -->
                      <button
                        @click="pcloseTransportationModal"
                        class="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        &times;
                      </button>
                      <h2 class="text-2xl font-semibold mb-4">
                        Recommended Transportations for
                        <span class="text-orange-500">{{
                          pselectedItem.name
                        }}</span>
                      </h2>

                      <div
                        v-if="ppaginatedTransportations.length > 0"
                        class="space-y-4"
                      >
                        <div
                          v-for="(
                            transportation, tIndex
                          ) in ppaginatedTransportations"
                          :key="tIndex"
                          class="border border-gray-300 rounded-lg p-4"
                        >
                          <h3 class="text-lg font-bold">
                            {{ transportation.name }}
                          </h3>
                          <p>
                            <strong>Address:</strong>
                            {{ transportation.address }}
                          </p>
                          <p>
                            <strong>Category:</strong>
                            {{ transportation.category }}
                          </p>
                          <p>
                            <strong>Distance:</strong>
                            {{ transportation.distance }} km
                          </p>
                        </div>
                      </div>
                      <p v-else class="text-gray-500">
                        No transportation recommendations available.
                      </p>

                      <!-- Pagination Controls -->
                      <div
                        v-if="ptotalTransportationPages > 1"
                        class="flex justify-center items-center space-x-4 mt-4"
                      >
                        <button
                          @click="pchangeTransportationPage(false)"
                          :disabled="transportationPage === 1"
                          class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span class="text-gray-700"
                          >Page {{ ptransportationPage }}</span
                        >
                        <button
                          @click="pchangeTransportationPage(true)"
                          :disabled="
                            transportationPage === totalTransportationPages
                          "
                          class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center items-center space-x-2 mt-4">
              <button
                @click="changePage('popular', false)"
                :disabled="popularPage === 1"
                class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span class="page-indicator text-gray-700"
                >Page {{ popularPage }}</span
              >
              <button
                @click="changePage('popular', true)"
                :disabled="popularPage === totalPopularPages"
                class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </section>

          <button
            @click="fetchRecommendations"
            class="mt-5 px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded"
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
import { socket, joinSocketRoom } from "../services/socket.js";

export default {
  name: "Test",
  components: {
    Header,
    Navigation,
  },
  data() {
    return {
      notificationMessage: "", // Store the notification message
      showNotification: false, // Control the visibility of the notification
      selectedLocation: null,

      locations: [
        { name: "Downtown Montreal", lat: 45.5017, lon: -73.5673 },
        // { name: "Old Montreal", lat: 45.5074, lon: -73.5541 },
        // { name: "Plateau Mont-Royal", lat: 45.5234, lon: -73.5795 },
        // { name: "Mile End", lat: 45.5245, lon: -73.6048 },
        // { name: "Griffintown", lat: 45.4914, lon: -73.5581 },
        // { name: "West Island", lat: 45.4713, lon: -73.8689 },
        // { name: "Hochelaga-Maisonneuve", lat: 45.5581, lon: -73.551 },
        // { name: "Little Italy", lat: 45.5369, lon: -73.6146 },
        // { name: "Chinatown", lat: 45.5088, lon: -73.56 },
        { name: "Quartier Latin", lat: 45.51458, lon: -73.57165 },
        {
          name: "Plateau-Mont-Royal (La Petite Marche)",
          lat: 45.526767,
          lon: -73.588768,
        },
        {
          name: "Shaughnessy Village (Near Barbie Expo)",
          lat: 45.500802,
          lon: -73.574279,
        },
        {
          name: "Plateau-Mont-Royal (Au Pied de Cochon)",
          lat: 45.522169,
          lon: -73.57445,
        },
        {
          name: "Quartier Latin (Near Book Nook Library)",
          lat: 45.509,
          lon: -73.5619,
        },
        {
          name: "Plateau-Mont-Royal (La Bella Vita)",
          lat: 45.5036,
          lon: -73.5587,
        },
        {
          name: "Milton-Parc (Mount Royal Hiking Trails)",
          lat: 45.5045,
          lon: -73.5872,
        },
        {
          name: "Parc-Extension",
          lat: 45.53701,
          lon: -73.60569,
        },
        {
          name: "Plateau-Mont-Royal",
          lat: 45.526678,
          lon: -73.580239,
        },
        {
          name: "Plateau-Mont-Royal ",
          lat: 45.5184,
          lon: -73.573,
        },
        {
          name: "Golden Square Mile ",
          lat: 45.498535,
          lon: -73.579402,
        },
        { name: "Plateau-Mont-Royal ", lat: 45.522169, lon: -73.57445 },
        { name: "Verdun", lat: 45.4612, lon: -73.5673 },
        { name: "Outremont", lat: 45.5158, lon: -73.6078 },
        { name: "Côte-des-Neiges", lat: 45.496, lon: -73.6179 },
        { name: "Rosemont–La Petite-Patrie", lat: 45.5441, lon: -73.5938 },
        { name: "Lachine", lat: 45.4319, lon: -73.6759 },
        { name: "LaSalle", lat: 45.43, lon: -73.649 },
        { name: "Villeray", lat: 45.5442, lon: -73.6165 },
        { name: "Saint-Henri", lat: 45.4745, lon: -73.579 },
        { name: "Notre-Dame-de-Grâce", lat: 45.4734, lon: -73.616 },
        { name: "Ville-Marie", lat: 45.5091, lon: -73.5528 },
        { name: "Pointe-Claire", lat: 45.4487, lon: -73.8166 },
      ],
      location: null,
      weather: null,
      time: null,
      personalizedPage: 1,
      popularPage: 1,
      visitedPage: 1,
      itemsPerPage: 4,
      selectedPlace: null, // Holds the place the user is rating
      currentRating: 0, // Tracks the current star rating
      selectedItem: null,
      transportationPage: 1, // Current page of transportation
      transportationsPerPage: 4, // Items per page for transportation modal
      pselectedItem: null,
      ptransportationPage: 1, // Current page of transportation
      ptransportationsPerPage: 4, // Items per page for transportation modal
      transportation: [],
      isModalOpenPer: false,
      pisModalOpenPer: false,
      personalizedRecommendations: [],
      popularRecommendations: [],
      preferences: {
        cuisines: [],
        indoor_activities: [],
        outdoor_activities: [],
        preferred_meal_time: [],
        visited_places: [],
      },
    };
  },
  mounted() {
    this.fetchUserPreferences();
    socket.on("notification", (data) => {
      console.log("Received notification:", data.message);
      this.handleNotification(data.message); // Check if this function is invoked
    });
    // Add event listener to hide notification on page click
    document.addEventListener("click", this.dismissNotification);
  },
  destroyed() {
    socket.off("notification"); // Clean up listener on component destroy
  },
  beforeUnmount() {
    // Clean up the event listener
    document.removeEventListener("click", this.dismissNotification);
  },
  computed: {
    paginatedTransportations() {
      if (!this.selectedItem || !this.selectedItem.transportation) return [];
      const start = (this.transportationPage - 1) * this.transportationsPerPage;
      const end = start + this.transportationsPerPage;
      return this.selectedItem.transportation.slice(start, end);
    },
    totalTransportationPages() {
      if (!this.selectedItem || !this.selectedItem.transportation) return 0;
      return Math.ceil(
        this.selectedItem.transportation.length / this.transportationsPerPage
      );
    },
    ppaginatedTransportations() {
      if (!this.pselectedItem || !this.pselectedItem.transportation) return [];
      const start =
        (this.ptransportationPage - 1) * this.ptransportationsPerPage;
      const end = start + this.ptransportationsPerPage;
      return this.pselectedItem.transportation.slice(start, end);
    },
    ptotalTransportationPages() {
      if (!this.pselectedItem || !this.pselectedItem.transportation) return 0;
      return Math.ceil(
        this.pselectedItem.transportation.length / this.ptransportationsPerPage
      );
    },
    paginatedPersonalizedRecommendations() {
      const start = (this.personalizedPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.personalizedRecommendations.slice(start, end);
    },

    paginatedPopularRecommendations() {
      const start = (this.popularPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.popularRecommendations.slice(start, end);
    },
    totalPersonalizedPages() {
      return Math.ceil(
        this.personalizedRecommendations.length / this.itemsPerPage
      );
    },
    totalPopularPages() {
      return Math.ceil(this.popularRecommendations.length / this.itemsPerPage);
    },
  },
  methods: {
    dismissNotification() {
      // Hide the notification after 3 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 40000);
    },

    //----------------------------------------------------------------------
    openTransportationModal(item) {
      this.selectedItem = item; // Set the selected item
      this.transportationPage = 1; // Reset pagination
    },

    //----------------------------------------------------------------------
    popenTransportationModal(item) {
      this.pselectedItem = item; // Set the selected item
      this.ptransportationPage = 1; // Reset pagination
    },

    //---------------------------------------------------------------------
    closeTransportationModal() {
      this.selectedItem = null; // Clear the selected item
    },

    //----------------------------------------------------------------------
    pcloseTransportationModal() {
      this.pselectedItem = null; // Clear the selected item
    },

    //----------------------------------------------------------------------
    changeTransportationPage(forward) {
      if (forward && this.transportationPage < this.totalTransportationPages) {
        this.transportationPage++;
      } else if (!forward && this.transportationPage > 1) {
        this.transportationPage--;
      }
    },

    //----------------------------------------------------------------------------
    pchangeTransportationPage(forward) {
      if (
        forward &&
        this.ptransportationPage < this.ptotalTransportationPages
      ) {
        this.ptransportationPage++;
      } else if (!forward && this.ptransportationPage > 1) {
        this.ptransportationPage--;
      }
    },
    //-----------------------------------------------------------------------------
    formatTimeTo12Hour(time) {
      // Ensure the time is in "HH:mm" format
      const [hour, minute] = time.split(":").map(Number);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12; // Convert 0 or 12 to 12-hour format
      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    },

    //--------------------------------------------------------------------------
    updateLocationCoordinates() {
      if (this.selectedLocation) {
        this.location = [this.selectedLocation.lat, this.selectedLocation.lon]; // Update location as an array [lat, lon]
      }
    },

    //-------------------------------------------------------------------------
    handleNotification(message) {
      console.log("Handling notification:", message); // Debug log
      this.notificationMessage = message;
      this.showNotification = true;

      // Auto-hide the notification after 1 minute
      setTimeout(() => {
        this.showNotification = false;
      }, 40000); // 60 seconds
    },
    //------------------------------------------------------------------------------
    async fetchRecommendations() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("JWT not found in localStorage.");
        return;
      }

      if (!this.location.length || !this.time || !this.weather) {
        console.warn("Please ensure all fields are filled.");
        return;
      }

      try {
        // Prepare payload to match API requirements
        const payload = {
          location: this.location, // Array format [latitude, longitude]
          time: this.formatTimeTo12Hour(this.time), // Convert time to 12-hour format
          weather: this.weather, // String format, e.g., "sunny"
        };
        console.log(payload);
        // Make the POST request to fetch recommendations
        const response = await axios.post(
          "http://localhost:5000/recommendation/get_recommendations",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Recommendations Response:", response.data);
        // socket.on("notification", (data) => {
        //   console.log("Received notification:", data.message);
        //   this.handleNotification(data.message);
        // });

        // Handle the response data as needed
        this.personalizedRecommendations =
          response.data.personalized_recommendations || [];

        console.log(
          "Personalized recommendation: " + this.personalizedRecommendations
        );
        this.popularRecommendations =
          response.data.popular_recommendations || [];
        console.log("Popular recommendation: " + this.popularRecommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    },

    //----------------------------------------------------------------------------------------------------------------------//
    changePage(type, direction) {
      if (type === "personalized") {
        if (direction && this.personalizedPage < this.totalPersonalizedPages) {
          this.personalizedPage++;
        } else if (!direction && this.personalizedPage > 1) {
          this.personalizedPage--;
        }
      } else if (type === "popular") {
        if (direction && this.popularPage < this.totalPopularPages) {
          this.popularPage++;
        } else if (!direction && this.popularPage > 1) {
          this.popularPage--;
        }
      } else if (type === "visitedPlaces") {
        if (direction && this.visitedPage < this.totalVisitedPages) {
          this.visitedPage++;
        } else if (!direction && this.visitedPage > 1) {
          this.visitedPage--;
        }
      }
    },

    //-----------------------------------------------------------------------------------
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
        //-------------------------------------------------------------------------------------

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
};
</script>

<style></style>
