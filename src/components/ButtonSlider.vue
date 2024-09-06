<template>
  <div class="container">
    <i class="fa-solid fa-chevron-left" @click="scrollLeft"></i>
    <div class="tab-slider" ref="tabSlider">
      <div
        class="tab"
        :class="{ active: activeTab === 'sve' }"
        @click="resetFilter('sve')"
      >
        <p>Sve</p>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'životinje' }"
        @click="sortByFamily('životinje', 'životinje')"
      >
        <button>Životinje</button>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'automobili' }"
        @click="sortByFamily('automobili', 'automobili')"
      >
        <button>Automobili</button>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'priroda' }"
        @click="sortByFamily('priroda', 'priroda')"
      >
        <button>Priroda</button>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'umetnost' }"
        @click="sortByFamily('umetnost', 'umetnost')"
      >
        <button>Umetnost</button>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'okean' }"
        @click="sortByFamily('voda', 'okean')"
      >
        <button>Voda</button>
      </div>
    </div>
    <i class="fa-solid fa-chevron-right" @click="scrollRight"></i>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  sortBy: Function,
  onReset: Function,
});

const tabSlider = ref(null);
const activeTab = ref("sve");

const scrollLeft = () => {
  const scrollAmount = 300;
  if (tabSlider.value) {
    tabSlider.value.scrollLeft -= scrollAmount;
  }
};

const scrollRight = () => {
  const scrollAmount = 300;
  if (tabSlider.value) {
    tabSlider.value.scrollLeft += scrollAmount;
  }
};

function sortByFamily(family, tab) {
  props.sortBy(family);
  activeTab.value = tab;
}

function resetFilter(tab) {
  props.onReset();
  activeTab.value = tab;
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
  height: 0px;
}

.container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.tab-slider {
  width: 600px;
  height: 10px;
  border-radius: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: 20px;
  align-items: center;
  scroll-behavior: smooth;
  padding: 30px;
}

.container i {
  cursor: pointer;
}

.tab-slider .tab {
  border: none;
  background-color: #0f0f0f;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;
}
.tab button {
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}
.tab-slider .tab.active {
  background-color: rgb(22, 147, 230);
  color: #fff;
}
</style>
