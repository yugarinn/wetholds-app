<template>
    <div class="crags-list-container" v-if="!selectedCrag">
        <ul class="crags-list">
            <CragPreview v-for="crag in crags" :crag="crag" :selectedDay="selectedDay" :key="crag.id" @openCragDetail="openCragDetail"/>
        </ul>
    </div>
    <CragDetail v-if="selectedCrag" :crag="selectedCrag" :selectedDay="selectedDay" @closeCragDetail="closeCragDetail"/>
</template>

<script>
import CragPreview from './CragPreview.vue';
import CragDetail from './CragDetail.vue';

export default {
  name: 'CragsList',
  components: {
    CragPreview,
    CragDetail
  },
  data() {
    return {
      selectedCrag: null
    }
  },
  props: {
    crags: {
      type: Array,
      required: true
    },
    selectedDay: {
      type: String,
      required: true
    },
  },
  methods: {
    openCragDetail(crag) {
      this.selectedCrag = crag
    },
    closeCragDetail() {
      this.selectedCrag = null
    }
  }
};
</script>

<style>
.crags-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
