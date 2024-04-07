<template>
    <h1 class="wetholds-title">Wetholds</h1>
    <div>
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
      selectedDay: currentDay
    }
  },
  mounted() {
    this.fetchCrags();
  },
  methods: {
    fetchCrags() {
      fetch('http://localhost:9990/crags')
        .then(response => response.json())
        .then(data => {
          this.crags = data.crags
          this.days = Object.keys(data.crags[0].weather.temperature)
        })
        .catch(error => console.error('Error fetching crags:', error))
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

</style>
