<template>
    <div class="crag-detail">
        <button @click="close">Close</button>
        <h2>{{ crag.name }}</h2>

        <div class="climbing-info">
            <p>{{ getCragDisciplines() }}</p>
        </div>

        <div class="weather-grid">
            <div class="weather-grid-hour" v-for="(n, hour) in 24" :key="hour">
                <p>{{ getFormattedHour(hour) }}</p>
                <p>{{ getWeatherValueForHour('temperature', hour) }}°</p>
                <p>{{ getWeatherValueForHour('precipitationProbability', hour) }}%</p>
                <p>{{ getWeatherValueForHour('windSpeed', hour) }} km/h</p>
                <p>{{ getWeatherValueForHour('cloudCover', hour) }}%</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    crag: Object,
    selectedDay: String
  },
  methods: {
    getFormattedHour(hour) {
      const formattedHour = new Date().setHours(hour, 0, 0, 0)

      return new Date(formattedHour).toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    },
    getWeatherValueForHour(weatherValueType, hour) {
      return this.crag.weather[weatherValueType][this.selectedDay][hour]
    },
    getCragDisciplines() {
      return this.crag.disciplines.join(', ')
    },
    close() {
      this.$emit('closeCragDetail');
    }
  }
};

</script>

<style>

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
