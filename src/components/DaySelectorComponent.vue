<template>
    <div class="day-selector">
        <button @click="decrementDay">←</button>
        <span>Day: {{ days[currentDayIndex] }}</span>
        <button @click="incrementDay">→</button>
    </div>
</template>

<script>
export default {
  name: 'DaySelector',
  props: {
    days: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentDayIndex: 2,
      day: this.days[this.currentDayIndex],
    }
  },
  methods: {
    incrementDay() {
      if (this.currentDayIndex > this.days.length - 2) return

      this.currentDayIndex++
      this.day = this.days[this.currentDayIndex]

      this.$emit('update:day', this.day)
    },
    decrementDay() {
      if (this.currentDayIndex == 0) return

      this.currentDayIndex--
      this.day = this.days[this.currentDayIndex]
      this.$emit('update:day', this.day);
    }
  }
}
</script>

<style>
.day-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.day-selector button {
    border: none;
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.day-selector span {
    margin: 0 15px;
}
</style>
