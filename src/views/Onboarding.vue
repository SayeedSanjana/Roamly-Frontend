<template>
  <div>
    <Header />
    <Navigation />
    <div
      class="bg-gray-100 text-gray-600 flex items-center justify-center min-h-screen relative"
    >
      <!-- Background Image -->
      <div
        class="hidden lg:block absolute inset-0 bg-cover bg-center bg-repeat opacity-10 z-0"
        style="
          background-image: url('/img/onboarding_theme_2.jpg');
          background-size: 30%;
        "
      ></div>

      <div
        class="relative z-10 w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg"
      >
        <header class="text-center mb-10">
          <h1 class="text-5xl font-medium mb-4">Profile Board</h1>
        </header>
        <main class="space-y-8">
          <!-- User Profile Setup -->
          <section class="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 class="text-3xl font-normal mb-4">Build Your Roamly Profile</h2>
            <p class="text-lg">
              Please provide your preferences to personalize your travel
              experience:
            </p>

            <form class="mt-6 space-y-4" @submit.prevent="savePreferences">
              <!-- Meal Times -->
              <div class="mb-4">
                <label class="block text-lg font-semibold mb-2"
                  >Add Your Meal Times</label
                >
                <div class="space-y-4">
                  <div class="flex items-center space-x-4">
                    <!-- Meal Type Dropdown -->
                    <select
                      v-model="mealType"
                      class="appearance-none focus:outline-none focus:ring-2 focus:ring-orange-300 w-full p-3 border border-orange-200 rounded-lg"
                    >
                      <option value="" disabled>Select Meal Type</option>
                      <option
                        v-for="(range, key) in mealTimeRanges"
                        :key="key"
                        :value="key"
                      >
                        {{ capitalize(key) }}
                      </option>
                    </select>
                    <!-- Time Dropdown with Clock Icon -->
                    <div class="relative w-full">
                      <select
                        v-model="mealTime"
                        class="appearance-none focus:outline-none focus:ring-2 focus:ring-orange-300 w-full p-3 border border-orange-200 rounded-lg pl-10"
                      >
                        <option value="" disabled>Select Time</option>
                        <option
                          v-for="time in availableTimes"
                          :key="time"
                          :value="time"
                        >
                          {{ time }}
                        </option>
                      </select>
                      <!-- Clock SVG -->
                      <svg
                        class="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18C7.03 4 4 7.03 4 12s3.03 8 8 8 8-3.03 8-8-3.03-8-8-8zm1 10h4v-2h-3V7h-2v5c0 .55.45 1 1 1z"
                        />
                      </svg>
                    </div>

                    <!-- Add Meal Button -->
                    <button
                      type="button"
                      @click="addMealTime"
                      class="bg-rose-400 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-rose-500"
                    >
                      Add
                    </button>
                  </div>

                  <!-- Meal Tags -->
                  <div class="flex flex-wrap gap-2 mt-4">
                    <span
                      v-for="(meal, index) in addedMealTimes"
                      :key="index"
                      class="bg-orange-100 border-2 border-orange-400 text-gray-700 px-3 py-2 rounded-lg flex items-center space-x-2 shadow-sm"
                    >
                      <span>{{ meal }}</span>
                      <button
                        type="button"
                        @click="removeMealTime(meal)"
                        class="text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Favorite Cuisines -->
              <div class="relative mb-4">
                <label for="cuisines" class="block text-lg font-semibold mb-2"
                  >Favorite Cuisines</label
                >
                <input
                  id="cuisines"
                  type="text"
                  v-model="cuisineInput"
                  class="appearance-none focus:outline-none focus:ring-2 focus:ring-orange-300 w-full p-3 border border-orange-200 rounded-lg"
                  placeholder="e.g., Italian, Chinese"
                  @input="showSuggestions"
                />
                <!-- Suggestions Dropdown -->
                <div
                  v-if="filteredCuisines.length > 0"
                  class="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-2 max-h-40 overflow-y-auto z-10"
                >
                  <div
                    v-for="cuisine in filteredCuisines"
                    :key="cuisine"
                    class="p-2 hover:bg-gray-200 cursor-pointer"
                    @click="addCuisine(cuisine)"
                  >
                    {{ cuisine }}
                  </div>
                </div>
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="(cuisine, index) in selectedCuisines"
                    :key="index"
                    class="border-2 border-orange-400 text-gray-700 px-3 py-2 rounded-lg flex items-center space-x-2 shadow-sm"
                  >
                    <span>{{ cuisine }}</span>
                    <button
                      type="button"
                      @click="removeCuisine(cuisine)"
                      class="text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </span>
                </div>
              </div>

              <!-- Preferred Activities -->
              <div class="mt-8">
                <h3 class="text-lg font-semibold mb-4">Preferred Activities</h3>

                <!-- Indoor Activities -->
                <div class="mt-4">
                  <h4
                    class="text-md border-b border-orange-200 font-semibold mb-4"
                  >
                    Indoor Activities
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(activity, index) in indoorActivities"
                      :key="index"
                      :class="getActivityClass(activity, 'indoor')"
                      @click="toggleActivity(activity, 'indoor')"
                    >
                      {{ activity }}
                    </span>
                  </div>
                </div>

                <!-- Outdoor Activities -->
                <div class="mt-8">
                  <h4
                    class="text-md border-b border-orange-200 font-semibold mb-4"
                  >
                    Outdoor Activities
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(activity, index) in outdoorActivities"
                      :key="index"
                      :class="getActivityClass(activity, 'outdoor')"
                      @click="toggleActivity(activity, 'outdoor')"
                    >
                      {{ activity }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Save Preferences Button -->
              <div class="mt-8">
                <button
                  type="submit"
                  class="bg-rose-400 hover:bg-rose-500 w-full text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Onboarding",
  components: {
    Header,
    Navigation,
  },
  data() {
    return {
      mealTimeRanges: {
        breakfast: ["06:00", "10:00"],
        brunch: ["10:00", "12:00"],
        lunch: ["12:00", "14:00"],
        snack: ["15:00", "17:00"],
        dinner: ["18:00", "21:00"],
        midnight_snack: ["22:00", "23:59"],
      },
      mealType: "",
      mealTime: "",
      addedMealTimes: [],
      cuisineInput: "",
      selectedCuisines: [],
      indoorActivities: [
        "Painting",
        "Drawing",
        "Pottery",
        "Reading",
        "Gaming",
        "Scrapbooking",
        "Calligraphy",
        "Board Games",
        "Card Games",
        "Escape Room Games",
        "Jigsaw Puzzles",
        "Museums",
        "Chess",
        "Bars",
        "Cinema",
        "Cooking Classes",
        "Language Learning",
        "Yoga Sessions",
        "Dancing",
        "Music Lessons (e.g., piano, guitar)",
        "Science Experiments",
        "Watching Movies",
        "Visiting a Theater for a Play",
        "Visiting an Art Gallery",
        "Listening to Live Music",
        "Stand-up Comedy Shows",
        "Gym Workouts",
        "Dance Classes (e.g., Zumba, Salsa)",
        "Meditation Sessions",
        "Indoor Rock Climbing",
        "Aerobics",
        "Escape Rooms",
        "Karaoke",
        "Art Exhibitions",
        "Trivia Nights",
        "Bowling",
        "Indoor Mini-Golf",
        "Spa Treatments",
        "Sauna/Steam Bath",
        "Indoor Swimming",
        "Massage Sessions",
        "Meditation Classes",
        "Cooking or Baking",
        "Pottery Workshops",
        "Sewing/Knitting",
        "DIY Home Decor",
        "Book Clubs",
        "Virtual Reality Experiences",
        "Video Gaming",
        "Coding Workshops",
        "Podcast Recording",
        "VR Escape Rooms",
        "Historical Sites",
        "Planetariums",
        "Aquariums",
        "Cultural Heritage Centers",
        "Yoga",
        "Libraries",
        "Music Venues",
      ],
      outdoorActivities: [
        "Bike Rentals",
        "Hiking",
        "Nature Walks",
        "Bird Watching",
        "Golf",
        "Go Karts",
        "Beach Visits",
        "Camping",
        "Forest Bathing",
        "Wildlife Safari",
        "Kayaking",
        "Boating",
        "Fishing",
        "Snorkeling",
        "Paddle Boarding",
        "Rafting",
        "Scuba Diving",
        "Rock Climbing",
        "Mountain Biking",
        "Zip Lining",
        "Skydiving",
        "Bungee Jumping",
        "Paragliding",
        "Sandboarding",
        "City Parks",
        "Picnics",
        "Botanical Gardens",
        "Outdoor Festivals",
        "Community Events",
        "Wildflower Viewing",
        "Stargazing",
        "Cycling",
        "Outdoor Yoga",
        "Jogging",
        "Parks",
        "Dog Parks",
        "Tennis",
        "Outdoor Gym",
        "Rollerblading",
        "Trail Running",
        "Tai Chi in the Park",
        "Guided Historical Tours",
        "Archaeological Sites",
        "Outdoor Museums",
        "Exploring Local Markets",
        "Swiming",
        "Historical Reenactments",
        "Sports Clubs",
      ],
      selectedActivities: {
        indoor: new Set(),
        outdoor: new Set(),
      },
    };
  },
  computed: {
    availableTimes() {
      if (!this.mealType) return [];
      const [start, end] = this.mealTimeRanges[this.mealType];
      return this.generateTimeIntervals(start, end);
    },
    filteredCuisines() {
      const query = this.cuisineInput.toLowerCase();
      return this.cuisineInput
        ? [
            "Italian",
            "Chinese",
            "Indian",
            "Thai",
            "Mexican",
            "Japanese",
            "Korean",
            "Mediterranean",
            "French",
            "Spanish",
            "Greek",
            "Vietnamese",
            "Turkish",
            "Caribbean",
            "Lebanese",
            "American",
            "Brazilian",
            "Argentinian",
            "Cuban",
            "Ethiopian",
            "Moroccan",
            "Russian",
            "German",
            "Polish",
            "Filipino",
            "Malaysian",
            "Indonesian",
            "Pakistani",
            "Burmese",
            "Persian",
            "Portuguese",
            "South African",
            "Australian",
            "Nepalese",
            "Bangladeshi",
            "Hawaiian",
            "Jamaican",
            "Swiss",
            "Saudi",
            "Egyptian",
            "Iraqi",
            "Afghan",
            "Scandinavian",
            "Belgian",
            "Peruvian",
            "Colombian",
            "Chilean",
            "Ecuadorian",
            "Bolivian",
            "Uzbek",
            "Kazakh",
            "Ukrainian",
            "Israeli",
            "Cajun",
            "Creole",
            "Soul Food",
            "Tex-Mex",
            "Barbecue",
            "Tibetan",
          ].filter(
            (cuisine) =>
              cuisine.toLowerCase().includes(query) &&
              !this.selectedCuisines.includes(cuisine)
          )
        : [];
    },
  },
  async created() {
    await this.fetchPreferences(); // Fetch preferences when the component is loaded
  },
  methods: {
    async fetchPreferences() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found. Please log in again.");
        }

        const response = await axios.get(
          "http://127.0.0.1:5000/user/get_preferences",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const preferences = response.data;

          // Populate data from the GET API response
          if (preferences.preferred_meal_time) {
            this.addedMealTimes = preferences.preferred_meal_time.map(
              (meal) => `${meal.meal} at ${meal.time}`
            );
          }
          if (preferences.cuisines) {
            this.selectedCuisines = preferences.cuisines;
          }
          if (preferences.indoor_activities) {
            this.selectedActivities.indoor = new Set(
              preferences.indoor_activities
            );
          }
          if (preferences.outdoor_activities) {
            this.selectedActivities.outdoor = new Set(
              preferences.outdoor_activities
            );
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: response.data.message || "Failed to fetch preferences.",
            icon: "error",
            confirmButtonText: "Retry",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response ? err.response.data.message : err.message,
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    },
    generateTimeIntervals(start, end) {
      const times = [];
      let current = new Date(`1970-01-01T${start}`);
      const endTime = new Date(`1970-01-01T${end}`);

      while (current <= endTime) {
        const hours = String(current.getHours()).padStart(2, "0");
        const minutes = String(current.getMinutes()).padStart(2, "0");
        times.push(`${hours}:${minutes}`);
        current.setMinutes(current.getMinutes() + 15);
      }

      return times;
    },
    addMealTime() {
      const mealTag = `${this.capitalize(this.mealType)} at ${this.mealTime}`;
      if (!this.addedMealTimes.includes(mealTag)) {
        this.addedMealTimes.push(mealTag);
        this.mealType = "";
        this.mealTime = "";
      }
    },
    removeMealTime(mealTag) {
      this.addedMealTimes = this.addedMealTimes.filter(
        (meal) => meal !== mealTag
      );
    },
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    addCuisine(cuisine) {
      if (!this.selectedCuisines.includes(cuisine)) {
        this.selectedCuisines.push(cuisine);
      }
      this.cuisineInput = "";
    },
    removeCuisine(cuisine) {
      this.selectedCuisines = this.selectedCuisines.filter(
        (item) => item !== cuisine
      );
    },
    toggleActivity(activity, type) {
      const selected = this.selectedActivities[type];
      if (selected.has(activity)) {
        selected.delete(activity);
      } else {
        selected.add(activity);
      }
    },
    getActivityClass(activity, type) {
      const selected = this.selectedActivities[type];
      return selected.has(activity)
        ? "bg-rose-500 text-white px-4 py-2 rounded-full"
        : "bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300";
    },
    formatTimeToAmPm(time) {
      // Check if the time already contains AM or PM
      if (time.includes("AM") || time.includes("PM")) {
        return time; // Return the time as is
      }

      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours, 10);
      const amPm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert 0 to 12 for midnight
      return `${formattedHour}:${minutes} ${amPm}`;
    },
    async savePreferences() {
      const payload = {
        cuisines: this.selectedCuisines,
        indoor_activities: Array.from(this.selectedActivities.indoor),
        outdoor_activities: Array.from(this.selectedActivities.outdoor),
        preferred_meal_time: this.addedMealTimes.map((meal) => {
          const [mealType, time] = meal.split(" at ");
          return {
            meal: mealType.toLowerCase(),
            time: this.formatTimeToAmPm(time), // Format the time to AM/PM
          };
        }),
        other_preferences: ["Vegan", "Non-Smoking"],
      };

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found. Please log in again.");
        }

        const response = await axios.post(
          "http://127.0.0.1:5000/user/update_profile",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Preferences saved successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            this.fetchPreferences(); // Refresh data without reloading the page
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.data.message || "Failed to save preferences.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response ? err.response.data.message : err.message,
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
