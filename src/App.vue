<template>
    <h1 class="wetholds-title">Wetholds</h1>
    <div>
        <input class="name-filter-input" type="text" v-model="nameFilter" placeholder="Filter by name" @input="debounceFetchCrags"/>

        <DaySelectorComponent :days="days" @update:day="updateDay"/>
        <CragsListComponent :crags="crags" :selectedDay="selectedDay" />
    </div>
</template>

<script>
import 'weather-icons/css/weather-icons.min.css';
import DaySelectorComponent from './components/DaySelectorComponent.vue';
import CragsListComponent from './components/CragsListComponent.vue';

export default {
  components: {
    CragsListComponent,
    DaySelectorComponent
  },
  data() {
    const currentDate = new Date()
    const currentDay = currentDate.toISOString().split('T')[0]

    return {
      crags: [],
      days: [],
      selectedDay: currentDay,
      debounceFetchTimer: null,
      locationFilter: null,
      nameFilter: null,
    }
  },
  mounted() {
    this.requestLocationAndFetchCrags();
  },
  methods: {
    requestLocationAndFetchCrags() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          this.locationFilter = `${latitude},${longitude}`;
          this.fetchCrags()
        },
        () => {
          console.error('Location access denied by the user.');
          this.fetchCrags()
        },
        { enableHighAccuracy: false, timeout: 500 }
      );
    },
    fetchCrags() {
      let url = new URL('http://localhost:9990/crags')
      const params = {}

      if (this.locationFilter) {
        params.location = this.locationFilter
      }

      if (this.nameFilter) {
        params.name = this.nameFilter
      }

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.crags = data.crags
          this.days = Object.keys(data.crags[0].weather.temperature)
        })
        .catch(error => console.error('Error fetching crags:', error))
    },
    debounceFetchCrags() {
      clearTimeout(this.debounceFetchTimer)

      this.debounceFetchTimer = setTimeout(() => {
        this.fetchCrags()
      }, 200)
    },
    updateDay(day) {
      this.selectedDay = day
    }
  }
};
</script>

<style>

body {
  font-family: 'Inter', sans-serif;
  background-color: white;
}

.wetholds-title {
  text-align: center;
}

.name-filter-input {
  width: 100%; /* Full-width */
  padding: 12px 20px; /* Padding inside the input */
  margin: 8px 0; /* Margin outside the input */
  display: inline-block; /* Ensuring it doesn't break the layout */
  border: 1px solid #ccc; /* Grey border */
  border-radius: 4px; /* Rounded corners */
  box-sizing: border-box; /* Makes sure padding doesn't affect width */
}

</style>
