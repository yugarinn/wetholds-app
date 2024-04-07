<template>
  <div class="crags-list">
    <ul>
      <CragPreview v-for="crag in crags" :crag="crag" :selectedDay="selectedDay" :key="crag.id"/>
    </ul>
  </div>
</template>

<script>
import CragPreview from './CragPreview.vue';

export default {
  name: 'CragsList',
  components: {
    CragPreview
  },
  props: {
    crags: {
      type: Array,
      required: true
    },
    selectedDay: {
      type: String,
      required: true
    }
  },
};
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
