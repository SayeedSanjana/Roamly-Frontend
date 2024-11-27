<template>
  <div>
    <Header />
    <Navigation />
    <div class="bg-gray-50 min-h-screen text-gray-600">
      <!-- Welcome Banner -->
      <div class="container mx-auto py-4">
        <div
          id="welcome-banner"
          class="pt-4 pb-2 text-2xl font-medium inline-block"
        >
          <p id="custom-greeting" class="text-center" v-html="greeting"></p>
        </div>
      </div>

      <!-- Alerts Section -->
      <section class="container mx-auto py-4">
        <div id="alerts" class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold">Alerts & Notifications</h2>
          <div id="notifications" class="text-gray-500 mt-2">
            <p>No alerts at the moment.</p>
          </div>
        </div>
      </section>

      <!-- Widgets Section -->
      <section class="py-6 container mx-auto">
        <div class="flex flex-wrap gap-6">
          <!-- User Profile -->
          <div
            class="bg-white shadow-lg rounded-xl w-72 h-72 flex flex-col border border-gray-200"
          >
            <div
              class="w-full py-4 px-4 border-b border-orange-200 rounded-t-xl"
            >
              <h2 class="text-xl font-semibold">Meal Time:</h2>
            </div>
            <div class="flex-grow p-4">
              <div class="mt-2 text-base">
                <div class="mb-2 font-bold">Preferred Meal Time:</div>
                <br />
                <div v-if="preferences.preferred_meal_time.length > 0">
                  <div
                    v-for="v in preferences.preferred_meal_time"
                    :key="v"
                    class=""
                  >
                    <span class="text-amber-500 font-semibold"
                      >{{ v.meal }}: </span
                    ><span class="font-semibold">{{ v.time }}</span>
                  </div>
                </div>
                <div v-else>Loading...</div>
              </div>
            </div>
          </div>
          <!-- Clock Widget -->
          <div
            class="bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg rounded-xl p-6 w-72 h-72 flex flex-col justify-center items-center"
          >
            <div class="text-4xl font-bold">
              <p id="clock-seconds" class="text-gray-400 text-right">
                {{ seconds }}
              </p>
              <span id="clock-hours-minutes" class="clock-hours-minutes">{{
                time
              }}</span>
            </div>
            <div id="clock-date" class="text-sm mt-4">{{ date }}</div>
          </div>

          <!-- Weather Widget -->
          <div
            id="weather-card"
            class="shadow-lg rounded-xl p-6 w-72 h-72 flex flex-col justify-between items-center bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-1/2 bg-contain bg-no-repeat bg-center mix-blend-multiply"
              id="weather-gif-container"
              :style="{
                backgroundImage: `url('${weather.gifUrl}')`,
                opacity: 0.1,
              }"
            ></div>
            <div class="relative z-10 mt-16 text-center px-4">
              <h2 id="weather-location" class="text-2xl font-bold">
                {{ weather.cityName }}
              </h2>
              <p id="weather-condition" class="text-xl font-medium mt-2">
                {{ weather.condition }}
              </p>
              <p id="weather-temp" class="text-4xl font-semibold mt-4">
                {{ weather.temperature }}°C
              </p>
            </div>
          </div>
          <!-- Google Maps Widget -->
          <!-- <div
            class="bg-white shadow-lg rounded-xl flex-grow h-72 flex flex-col justify-between items-center border border-gray-200"
          >
            <div
              class="w-full py-2 px-4 border-b border-orange-200 rounded-t-xl"
            >
              <p class="text-xl font-semibold">
                Location :
                <span id="address" class="text-sm font-normal">{{
                  address
                }}</span>
              </p>
            </div>
            <div id="map" class="flex-grow w-full h-full rounded-b-xl"></div>
          </div> -->
          <!-- Google Maps Widget -->
          <div
            class="bg-white shadow-lg rounded-xl flex-grow h-72 flex flex-col justify-between items-center border border-gray-200"
          >
            <div
              class="w-full py-2 px-4 border-b border-orange-200 rounded-t-xl"
            >
              <p class="text-xl font-semibold">
                Location:
                <span
                  id="address"
                  class="text-sm text-green-600 font-semibold"
                  >{{ this.address }}</span
                >
              </p>
            </div>
            <!-- Map container -->
            <div id="map" class="flex-grow w-full h-full rounded-b-xl"></div>
          </div>
        </div>
      </section>

      <!-- User Profile -->
      <section class="container mx-auto py-4">
        <div id="user-profile" class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4 mt-2">
            <!-- User Profile Heading -->
            <h2 class="text-xl font-semibold">
              <span class="text-orange-500"> {{ this.userName }}'s </span>
              Preferences
            </h2>

            <!-- Edit Preferences Button -->
            <router-link
              id="edit-preferences"
              to="/onboard"
              class="bg-rose-400 hover:bg-rose-500 text-white text-sm font-semibold py-2 px-4 rounded"
            >
              Edit Preferences
            </router-link>
          </div>

          <!-- Cuisines -->
          <div class="mb-4 flex">
            <h3 class="text-base font-medium mb-2 mr-3">Preferred Cuisines:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-base text-gray-400"
                v-if="preferences.cuisines.length <= 0"
                >No preferred cuisines activities yet</span
              >
              <span
                v-for="(cuisine, index) in preferences.cuisines.slice(0, 6)"
                :key="'cuisine-' + index"
                class="px-4 py-2 bg-orange-100 border border-orange-300 rounded-full text-sm font-medium text-gray-700"
              >
                {{ cuisine }}
              </span>
            </div>
          </div>

          <!-- Indoor Activities -->
          <div class="mb-4 flex">
            <h3 class="text-base font-medium mb-2 mr-3">
              Preferred Indoor Activities:
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-base text-gray-400"
                v-if="preferences.indoor_activities.length <= 0"
                >No preferred indoor activities yet</span
              >
              <span
                v-for="(activity, index) in preferences.indoor_activities.slice(
                  0,
                  6
                )"
                :key="'indoor-' + index"
                class="px-4 py-2 bg-orange-100 border border-orange-300 rounded-full text-sm font-medium text-gray-700"
              >
                {{ activity }}
              </span>
            </div>
          </div>

          <!-- Outdoor Activities -->
          <div class="flex mb-4">
            <h3 class="text-base font-medium mb-2 mr-3">
              Preferred Outdoor Activities:
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-base text-gray-400"
                v-if="preferences.outdoor_activities.length <= 0"
                >No preferred outdoor activities yet</span
              >
              <span
                v-for="(
                  activity, index
                ) in preferences.outdoor_activities.slice(0, 6)"
                :key="'outdoor-' + index"
                class="px-4 py-2 bg-orange-100 border border-orange-300 rounded-full text-sm font-medium text-gray-700"
              >
                {{ activity }}
              </span>
            </div>
          </div>
        </div>
      </section>
      <div class="py-6 container mx-auto space-y-6">
        <!-- Visited Place -->
        <section
          id="visited_places"
          class="bg-white p-4 rounded-lg shadow space-y-6 mt-4 pt-8"
        >
          <h2 class="text-xl font-semibold">Visited Places</h2>
          <div
            v-if="paginatedVisitedPlaces.length <= 0"
            class="text-gray-500 text-base"
          >
            No visited places yet
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="item in paginatedVisitedPlaces"
              :key="item._id"
              class="bg-white shadow rounded-lg p-4 flex flex-col justify-between border border-gray-200"
              data-id="${item._id}"
            >
              <div>
                <div class="text-lg font-bold text-gray-600 mb-2">
                  {{ item.name }}
                </div>

                <p class="text-sm text-gray-500">
                  <span class="font-semibold">Address:</span>
                  {{ item.address }} km
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-semibold">Category:</span>
                  {{ item.category }}
                </p>
                <div v-if="item.rating > 0" class="flex items-center space-x-2">
                  <span class="text-yellow-500 font-semibold text-medium">{{
                    item.rating
                  }}</span>
                  <img
                    src="../assets/svgs/star.svg"
                    class="w-5 h-5"
                    alt="review"
                  />
                </div>
                <div class="mt-2 flex space-x-2">
                  <button
                    @click="dropBy(item)"
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
                    @click="openRatingModal(item)"
                    class="see-more-btn text-slate-500 hover:text-slate-600 text-sm font-semibold py-2 px-4 rounded w-full hover:underline"
                  >
                    Rate Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination Controls -->
          <div class="flex justify-center items-center space-x-2 mt-4">
            <button
              @click="changePage('visitedPlaces', false)"
              :disabled="visitedPage === 1"
              class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span class="page-indicator text-gray-700"
              >Page {{ visitedPage }}</span
            >
            <button
              @click="changePage('visitedPlaces', true)"
              :disabled="visitedPage === totalVisitedPages"
              class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </section>

        <!-- Rating Modal -->
        <div
          v-if="selectedPlace"
          class="fixed inset-0 bg-gray-900 bg-opacity-25 flex justify-center items-center z-50"
        >
          <div
            class="bg-white w-11/12 md:w-2/3 lg:w-1/3 rounded-lg p-6 shadow-lg relative"
          >
            <button
              @click="closeRatingModal"
              class="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <h2 class="text-base font-semibold mb-4">
              Rate
              <span class="text-orange-500 text-base">{{
                selectedPlace.name
              }}</span>
            </h2>
            <div class="flex justify-center items-center space-x-2 mb-4">
              <img
                v-for="index in 5"
                :key="index"
                :src="
                  index <= currentRating
                    ? '../../public/img/star-filled.png'
                    : '../../public/img/star.png'
                "
                class="w-8 h-8 cursor-pointer"
                alt="star"
                @click="setRating(index)"
              />
            </div>
            <p class="text-center text-gray-500 mb-4">
              You selected
              <span class="font-bold">{{ currentRating }}</span> star(s).
            </p>
            <div class="flex justify-center">
              <button
                @click="submitRating"
                class="bg-rose-400 hover:bg-rose-500 text-white py-2 px-6 rounded"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center mr-4 mt-4">
        <img
          src="../../public/icons/Loading.gif"
          class="w-16 h-16"
          alt="review"
        />
        <p class="text-2xl font-medium text-gray-500">
          Loading your personalized experience...
        </p>
      </div>

      <!-- Recommendations Section -->
      <div v-else class="py-6 container mx-auto space-y-6">
        <!-- Personalized Recommendations -->
        <section
          id="personalized-recommendations"
          class="bg-white p-4 rounded-lg shadow space-y-6 pt-8"
        >
          <h2 class="text-xl font-semibold">Personalized Recommendations</h2>
          <p
            class="text-base text-gray-400"
            v-if="paginatedPersonalizedRecommendations <= 0"
          >
            We currently don't have personalized recommendations for you. Update
            your user profile to help us tailor recommendations specifically for
            you!
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
                  <span class="font-semibold">Address:</span> {{ item.address }}
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
                  @click="dropByPlace(item)"
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
                    v-for="(transportation, tIndex) in paginatedTransportations"
                    :key="tIndex"
                    class="border border-gray-300 rounded-lg p-4"
                  >
                    <h3 class="text-lg font-bold">{{ transportation.name }}</h3>
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
                    :disabled="transportationPage === totalTransportationPages"
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
                  @click="dropByPlace(item)"
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
                          <strong>Address:</strong> {{ transportation.address }}
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
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import axios from "axios";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    Header,
    Navigation,
  },
  data() {
    return {
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
      location: null,
      weather: null,
      time: null,
      personalizedPage: 1,
      popularPage: 1,
      visitedPage: 1,
      itemsPerPage: 4,
      preferences: {
        cuisines: [],
        indoor_activities: [],
        outdoor_activities: [],
        preferred_meal_time: [],
        visited_places: [],
      },
      userPreferences: "Loading user preferences...",
      userName: "",
      greetings: [
        "Have a great day!",
        "Enjoy your journey!",
        "Explore your surroundings!",
      ],
      time: "",
      seconds: "",
      date: "",
      address: "Fetching location...",
      weather: {
        cityName: "Loading...",
        condition: "Fetching Weather...",
        temperature: "--",
        gifUrl: "",
      },
      // apiPayload: {
      //   location: [45.51458, -73.57165], // Default location
      //   time: "5:00 PM", // Default time
      //   weather: "sunny", // Default weather
      // },
      apiPayload: {
        location: null,
        time: null,
        weather: null,
      },
      loading: true, // Loading state
      weatherGifMap: {
        Clear: {
          day: "../public/icons/sun.gif",
          night: "../public/icons/cloudy-night.gif",
        },
        Clouds: {
          day: "../public/icons/clouds.gif",
          night: "../public/icons/cloudy-night.gif",
        },
        Rain: {
          day: "../public/icons/rain-day.gif",
          night: "../public/icons/rain-night.gif",
        },
        Snow: {
          day: "../public/icons/snow.gif",
          night: "../public/icons/snow.gif",
        },
        Thunderstorm: {
          day: "../public/icons/storm-day.gif",
          night: "../public/icons/storm-night.gif",
        },
        Drizzle: {
          day: "../public/icons/drizzle.gif",
          night: "../public/icons/drizzle.gif",
        },
        Mist: {
          day: "../public/icons/mist-day.gif",
          night: "../public/icons/mist-night.gif",
        },
        Smoke: {
          day: "../public/icons/smoke-day.gif",
          night: "../public/icons/smoke-night.gif",
        },
        Haze: {
          day: "../public/icons/haze-day.gif",
          night: "../public/icons/haze-night.gif",
        },
        Dust: {
          day: "../public/icons/dust-day.gif",
          night: "../public/icons/dust-night.gif",
        },
        Fog: {
          day: "../public/icons/foggy.gif",
          night: "../public/icons/foggy.gif",
        },
        Sand: {
          day: "../public/icons/sand-day.gif",
          night: "../public/icons/sand-night.gif",
        },
        Ash: {
          day: "../public/icons/ash-day.gif",
          night: "../public/icons/ash-night.gif",
        },
        Squall: {
          day: "../public/icons/squall-day.gif",
          night: "../public/icons/squall-night.gif",
        },
        Tornado: {
          day: "../public/icons/tornado-day.gif",
          night: "../public/icons/tornado-night.gif",
        },
        Default: {
          day: "../public/icons/temperature.gif",
          night: "../public/icons/temperature.gif",
        },
      },
    };
  },
  // async created() {
  //   await this.fetchUserPreferences();
  //   await this.fetchRecommendations();
  // },
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
    paginatedVisitedPlaces() {
      const start = (this.visitedPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.preferences.visited_places.slice(start, end);
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
    totalVisitedPages() {
      return Math.ceil(
        this.preferences.visited_places.length / this.itemsPerPage
      );
    },
    greeting() {
      this.userName = this.getUsernameFromJWT();

      const now = new Date();
      const hour = now.getHours();

      // Determine the appropriate greeting based on the time
      let timeGreeting;
      if (hour < 12) {
        timeGreeting = "Good Morning";
      } else if (hour < 18) {
        timeGreeting = "Good Afternoon";
      } else if (hour < 23) {
        timeGreeting = "Good Evening";
      } else {
        timeGreeting = "Good Night";
      }

      // Select a random greeting
      const randomGreeting =
        this.greetings[Math.floor(Math.random() * this.greetings.length)];

      // Return the complete greeting message
      return `${timeGreeting}, <span class="text-orange-500">${this.userName}</span>! ${randomGreeting}`;
    },
  },
  methods: {
    async showPlaceOnMap(address, name) {
      this.address = address;
      console.log(this.address);
      try {
        // Fetch coordinates from Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          const latitude = parseFloat(lat);
          const longitude = parseFloat(lon);

          // Center the map on the location and add a marker
          this.map.setView([latitude, longitude], 15); // Zoom level 15
          L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup(`<b>${name}</b><br>${address}`)
            .openPopup();
        } else {
          console.error("No results found for the address.");
        }
      } catch (error) {
        console.error("Error fetching coordinates for the address:", error);
      }
    },

    async dropBy(place) {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("JWT not found in localStorage.");
        return;
      }

      try {
        // Geocoding: Convert address to lat/lon
        const geoResponse = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json`,
          {
            params: {
              q: place.address, // The address to geocode
              key: "46473a2e56f54a77b64869d8a7225b39",
            },
          }
        );

        const results = geoResponse.data.results;
        if (results.length === 0) {
          Swal.fire({
            title: "Error!",
            text: "No results found for the provided address.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
        const { lat, lng } = results[0].geometry;
        // Show the location on the map
        this.showOnMap(lat, lng, place.name);
      } catch (error) {
        console.error("Error processing drop-by request:", error);
      }
    },

    //--------------------------------------------------------------------
    async dropByPlace(place) {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("JWT not found in localStorage.");
        return;
      }

      try {
        // Geocoding: Convert address to lat/lon
        const geoResponse = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json`,
          {
            params: {
              q: place.address, // The address to geocode
              key: "46473a2e56f54a77b64869d8a7225b39",
            },
          }
        );

        const results = geoResponse.data.results;
        if (results.length === 0) {
          Swal.fire({
            title: "Error!",
            text: "No results found for the provided address.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

        const { lat, lng } = results[0].geometry;

        // Add the place to visited_places
        const payload = {
          visited_places: [
            {
              name: place.name,
              address: place.address,
              category: place.category,
            },
          ],
        };

        const response = await axios.post(
          "http://127.0.0.1:5000/user/add_visited_places",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Visited place added successfully:", response.data);

        // Update local visited places list
        this.preferences.visited_places.push(payload.visited_places[0]);
        this.fetchUserPreferences();

        // SweetAlert success notification
        Swal.fire({
          title: "Success!",
          text: `${place.name} has been added to your visited places.`,
          icon: "success",
          confirmButtonText: "OK",
          timer: 3000,
          timerProgressBar: true,
        });

        // Show the location on the map
        this.showOnMap(lat, lng, place.name);
      } catch (error) {
        console.error("Error processing drop-by request:", error);

        // SweetAlert error notification
        Swal.fire({
          title: "Error!",
          text: "Failed to process the drop-by request. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },

    showOnMap(lat, lng, name) {
      this.address = name + " " + lat + " " + lng + " ";
      if (!this.map) {
        console.error("Map not initialized.");
        return;
      }

      // Set the map view to the specified location
      this.map.setView([lat, lng], 14);

      // Add a marker at the location
      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(`<strong>${name}</strong><br>${lat}, ${lng}`)
        .openPopup();
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

    //----------------------------------------------------------------------------------------
    openRatingModal(place) {
      this.selectedPlace = place;
      this.currentRating = place.rating || 0; // Default to existing rating if available
    },

    //-------------------------------------------------------------------------------------------------
    closeRatingModal() {
      this.selectedPlace = null;
      this.currentRating = 0;
    },

    //------------------------------------------------------------------------------------------------
    async submitRating() {
      if (this.selectedPlace) {
        const token = localStorage.getItem("token");
        const payload = {
          unique_id: this.selectedPlace.unique_id,
          rating: this.currentRating,
        };

        try {
          // API call to submit rating
          const response = await axios.post(
            "http://127.0.0.1:5000/user/rate_place",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Rating submitted successfully:", response.data);

          // Update the local data to reflect the new rating
          this.selectedPlace.rating = this.currentRating;

          // Optionally, update the overall rating in the visited places list
          const placeIndex = this.paginatedVisitedPlaces.findIndex(
            (place) => place._id === this.selectedPlace._id
          );
          if (placeIndex !== -1) {
            this.paginatedVisitedPlaces[placeIndex].rating = this.currentRating;
          }

          // Close the modal
          this.closeRatingModal();
        } catch (error) {
          console.error("Error submitting rating:", error);
        }
      }
    },

    //-----------------------------------------------------------------------------------------------------------
    setRating(stars) {
      this.currentRating = stars; // Update the current rating
    },
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const { latitude, longitude } = position.coords;
    //           resolve({ latitude, longitude });
    //         },
    //         (error) => {
    //           console.error("Error fetching location:", error);
    //           reject(error);
    //         }
    //       );
    //     } else {
    //       console.error("Geolocation is not supported by this browser.");
    //       reject(new Error("Geolocation not supported"));
    //     }
    //   });
    // },
    //----------------------------------------------------------------------------------------------------------------------//
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

        console.log("User Preferences Response:", response.data);

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

    //----------------------------------------------------------------------------------------------------------------------//
    getUsernameFromJWT() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("JWT not found in localStorage.");
        return "Guest"; // Fallback if no token exists
      }

      try {
        // Split the token to get the payload part (second part)
        const payloadBase64 = token.split(".")[1];

        if (!payloadBase64) {
          console.error("Invalid JWT structure.");
          return "Guest"; // Fallback for invalid structure
        }

        // Decode the Base64 payload and parse it as JSON
        const decodedPayload = JSON.parse(atob(payloadBase64));
        // console.log("Decoded Payload:", decodedPayload);

        // Extract the `name` from the decoded payload
        return decodedPayload.name || "Guest";
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return "Guest"; // Fallback in case of an error
      }
    },

    //----------------------------------------------------------------------------------------------------------------------//
    currentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const timeString = `${hours % 12 || 12}:${String(minutes).padStart(
        2,
        "0"
      )} ${hours >= 12 ? "PM" : "AM"}`;
      this.apiPayload.time = timeString; // Update API payload with time
    },

    //----------------------------------------------------------------------------------------------------------------------//
    updateClock() {
      const now = new Date();
      this.time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.seconds = String(now.getSeconds()).padStart(2, "0");
      this.date = now.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

    //----------------------------------------------------------------------------------------------------------------------//
    async fetchWeather() {
      try {
        const apiKey = "74877bd7268a9dd52cda3ae7cf3dc300";
        const location = await this.getUserLocation();
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        // console.log("Weather API Response:", data);

        const condition = data.weather[0].main;
        // console.log("Weather condition:", condition);

        const currentTime = Math.floor(Date.now() / 1000);
        const isDaytime =
          currentTime >= data.sys.sunrise && currentTime < data.sys.sunset;

        const gifUrl =
          (this.weatherGifMap[condition] &&
            this.weatherGifMap[condition][isDaytime ? "day" : "night"]) ||
          this.weatherGifMap.Default[isDaytime ? "day" : "night"] ||
          "../../public/icons/default.gif";

        this.weather = {
          cityName: data.name,
          condition,
          temperature: Math.round(data.main.temp),
          gifUrl,
        };

        // Update API payload with weather condition
        this.apiPayload.weather = condition.toLowerCase();
      } catch (error) {
        console.error("Error fetching weather:", error);
        this.weather = {
          cityName: "Unknown",
          condition: "N/A",
          temperature: "--",
          gifUrl: "../public/icons/default.gif",
        };
      }
    },

    //----------------------------------------------------------------------------------------------------------------------//
    async getUserLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            this.apiPayload.location = [latitude, longitude]; // Update API payload with location
            resolve({ lat: latitude, lon: longitude });
          },
          (error) => reject(new Error("Unable to fetch location"))
        );
      });
    },

    //----------------------------------------------------------------------------------------------------------------------//
    async fetchRecommendations() {
      const token = localStorage.getItem("token");
      // console.log("APIlOAD: " + this.apiPayload.location);
      // console.log("APIlOAD: " + this.apiPayload.time);
      // console.log("APIlOAD: " + this.apiPayload.weather);

      if (!token) {
        console.warn("JWT not found in localStorage.");
        return;
      }

      try {
        // Make the POST request to fetch recommendations
        const response = await axios.post(
          "http://localhost:5000/recommendation/get_recommendations",
          this.apiPayload, // Send location, weather, and time
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Recommendations Response:", response.data);

        // Update recommendations
        this.personalizedRecommendations =
          response.data.personalized_recommendations || [];

        this.popularRecommendations =
          response.data.popular_recommendations || [];
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

    //----------------------------------------------------------------------------------------------------------------------//
    async initMap() {
      const location = await this.getUserLocation();
      const address = await this.getAddress(location.lat, location.lon);
      this.address = address;
    },

    //----------------------------------------------------------------------------------------------------------------------//
    async getAddress(lat, lon) {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat, lng: lon };
      return new Promise((resolve, reject) => {
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject("Failed to fetch address");
          }
        });
      });
    },
  },
  mounted() {
    this.fetchUserPreferences();
    this.currentTime();
    this.updateClock();
    setInterval(this.updateClock, 1000);
    // Ensure Leaflet is loaded
    if (typeof L === "undefined") {
      console.error("Leaflet library not loaded.");
      return;
    }

    // Initialize map
    this.map = L.map("map").setView([45.5017, -73.5673], 13); // Default to Montreal

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    // Step 1: Fetch location, then weather, then recommendations
    this.getUserLocation()
      .then((location) => {
        console.log("Location fetched:", location);
        this.address = "Lat: " + location.lat + " Lon: " + location.lon;
        return this.fetchWeather(); // Step 2: Fetch weather after location
      })
      .then(() => {
        console.log("Weather fetched, now fetching recommendations...");
        return this.fetchRecommendations(); // Step 3: Fetch recommendations
      })
      .catch((error) => {
        console.error("Error during initialization:", error);
      })
      .finally(() => {
        this.loading = false; // Hide loading indicator after all tasks
      });
    //this.initMap();
    this.userName = this.getUsernameFromJWT();
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
