<template>
    <div class="crag-detail">
        <button @click="close">Close</button>
        <h2>{{ crag.name }}</h2>

        <div class="climbing-info">
            <p>{{ getCragDisciplines() }}</p>
        </div>

        <div class="directions">
            <p><a target="_blank" :href="'https://www.google.com/maps/place/' + getCragCoordinates()">directions</a></p>
        </div>

        <div class="weather-grid">
            <div class="weather-grid-hour" v-for="(n, hour) in 24" :key="hour">
                <div class="time">
                    <p>{{ getFormattedHour(hour) }}</p>
                </div>
                <div class="temperature">
                    <p :style="getTemperatureStyle(getWeatherValueForHour('temperature', hour))">
                        {{ getWeatherValueForHour('temperature', hour) }}°
                    </p>
                </div>
                <div class="precipitation">
                    <p>{{ getWeatherValueForHour('precipitationProbability', hour) }}%</p>
                </div>
                <div class="wind">
                    <p>{{ getWeatherValueForHour('windSpeed', hour) }} km/h</p>
                </div>
                <div class="clouds">
                    <p>{{ getWeatherValueForHour('cloudCover', hour) }}%</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, toRefs } from 'vue';

export default {
  props: {
    crag: Object,
    selectedDay: String
  },
  setup(props) {
    const { crag, selectedDay } = toRefs(props)
    const temperatures = ref([])

    onMounted(() => {
      if (crag.value.weather && crag.value.weather.temperature && crag.value.weather.temperature[selectedDay.value]) {
        temperatures.value = Object.values(crag.value.weather.temperature[selectedDay.value])
      }
    })

    const maxTemperature = computed(() => Math.max(...temperatures.value))
    const minTemperature = computed(() => Math.min(...temperatures.value))

    function getTemperatureStyle(temperature) {
      if (maxTemperature.value - minTemperature.value === 0) return

      const position = ((temperature - minTemperature.value) / (maxTemperature.value - minTemperature.value)) * 100

      return {
        top: `${100 - position}%`
      }
    }

    function getFormattedHour(hour) {
      const formattedHour = new Date().setHours(hour, 0, 0, 0)
      return new Date(formattedHour).toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }

    function getWeatherValueForHour(weatherValueType, hour) {
      return crag.value.weather[weatherValueType][selectedDay.value][hour]
    }

    function getCragDisciplines() {
      return crag.value.disciplines.join(', ')
    }

    function getCragCoordinates() {
      return crag.value.lat + ',' + crag.value.lon
    }

    return { getTemperatureStyle, getFormattedHour, getWeatherValueForHour, getCragDisciplines, getCragCoordinates }
  },
  methods: {
    close() {
      this.$emit('closeCragDetail')
    }
  }
}
</script>

<style>
.time {
    border-bottom: 1px solid #e6e4e1;
}

.temperature p {
    position: absolute;
}

.temperature {
    position: relative;
    height: 100px;
}

.crag-detail {
    width: 70vw;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.crag-detail h2, .crag-detail h3 {
    color: #333;
}

.crag-detail p {
    color: #666;
    line-height: 1.6;
}

.temperature {
    height: 100px;
    margin: 40px 0px;
}

.temperature p {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    margin: 0;
}

@media (max-width: 768px) {
    .crag-detail {
        margin: 10px;
        padding: 10px;
    }
}

.weather-grid {
    display: flex;
    overflow: auto;
}

.weather-grid-hour {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    min-width: 60px;
    border-right: solid 1px #e6e4e1;
    padding: 0px 17px;
    text-align: center;
    font-size: 14px;
}

</style>
