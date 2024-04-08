<template>
      <li class="crag-list-item" @click="openCragDetail">
          <div class="crag-name">
              {{ crag.name }}
          </div>
          <div class="crag-information">
              <div class="crag-temperature">
                   {{ getMaxTemperature() }}° - {{ getMinTemprature() }}° <i class="wi wi-thermometer"></i>
              </div>

              <div class="crag-precipitation-probability">
                  {{ getPrecipitationProbability() }}% <i class="wi wi-rain"></i>
              </div>

              <div class="crag-wind-speed">
                  {{ getWindSpeed() }} km/h <i class="wi wi-strong-wind"></i>
              </div>

              <!-- Cloud Cover -->
              <div class="crag-cloud-cover">
                  {{ getCloudCover() }}% <i class="wi wi-cloudy"></i>
              </div>
          </div>
      </li>
</template>

<script>
export default {
  name: 'CragsList',
  data() {
    return {
      selectedCrag: null
    }
  },
  props: {
    crag: {
      type: Object,
      required: true,
    },
    selectedDay: {
      type: String,
      required: true,
    }
  },
  methods: {
    getMaxTemperature() {
      return Math.max.apply(Math, this.crag.weather.temperature[this.selectedDay])
    },
    getMinTemprature() {
      return Math.min.apply(Math, this.crag.weather.temperature[this.selectedDay])
    },
    getPrecipitationProbability() {
      return this.getMeanValueOf('precipitationProbability')
    },
    getWindSpeed() {
      return this.getMeanValueOf('windSpeed')
    },
    getCloudCover() {
      return this.getMeanValueOf('cloudCover')
    },
    getMeanValueOf(weatherProperty) {
      const values = this.crag.weather[weatherProperty][this.selectedDay].slice(7)

      return parseInt(values.reduce((carry, value) => carry + value, 0) / values.length)
    },
    openCragDetail() {
      this.$emit('openCragDetail', this.crag);
    }
  }
};
</script>

<style>
.crag-list-item {
  width: 400px;
  font-size: 16px;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.crag-list-item:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.crag-name {
  color: #111827;
  margin-bottom: 15px;
  font-size: 20px;
}

.crag-information {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crag-temperature,
.crag-precipitation-probability {
  display: flex;
  align-items: center;
}

.wi {
  margin-left: 8px;
  font-size: 20px;
}
</style>
