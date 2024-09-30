<template>
  <header ref="headerRef">
    <div class="logo">
      <img
        src="/images/KazakovLogo-BlackCrop.png"
        alt="" />
    </div>
    <ul class="headerList">
      <li><a href="">Početna</a></li>
      <li><a href="">O nama</a></li>
      <li><a href="">Usluge</a></li>
      <li><a href="">Kontakt</a></li>
      <li><a href="">Galerija</a></li>
      <li><router-link to="/admin">Dodaj slike</router-link></li>
    </ul>
    <div class="mobileHamburger">
      <div class="icon">
        <i
          v-if="!hamburgerMenuVisible"
          class="fa-solid fa-bars"
          @click="toggleHamburger"></i>
        <i
          v-else
          class="fa-solid fa-xmark"
          @click="toggleHamburger"></i>
      </div>
      <Transition name="fade">
        <div
          class="mobileList"
          v-if="hamburgerMenuVisible"
          :class="{ menuVisible: hamburgerMenuVisible }">
          <ul>
            <li><a href="">Početna</a></li>
            <li><a href="">O nama</a></li>
            <li><a href="">Usluge</a></li>
            <li><a href="">Kontakt</a></li>
            <li><a href="">Galerija</a></li>
            <li><router-link to="/admin">Dodaj slike</router-link></li>
          </ul>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const headerRef = ref(null);
const hamburgerMenuVisible = ref(false);

function toggleHamburger() {
  hamburgerMenuVisible.value = !hamburgerMenuVisible.value;
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.6s;
  padding: 0 50px;
  z-index: 100;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.4);
}

header.sticky {
  padding: 10px 100px;
  background: rgba(0, 0, 0, 0.4);
}

header img {
  height: 120px;
  width: 250px;
}

.headerList {
  display: flex;
  justify-content: center;
  align-items: center;
}

.headerList li {
  list-style: none;
}

.headerList li a {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  letter-spacing: 2px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: color 0.6s;
}

.headerList li a::before {
  content: "";
  position: absolute;
  width: 0%;
  height: 3px;
  bottom: -30%;
  left: 0;
  background-color: #ff6347;
  transition: width 0.6s;
  border-radius: 20px;
}

.headerList li a:hover::before {
  width: 100%;
}

.headerList li a:hover {
  color: #ff6347;
}

.mobileHamburger {
  display: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 101;
  transition: all 0.3s;
}

.mobileHamburger .icon {
  padding: 10px;
}

.mobileList {
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 20px;
  width: 100%;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  transform: translateX(-200px);
  transition: all 0.3s;
  animation: fade-in 0.3s;
}

.menuVisible {
  transform: translateX(0);
}

header.sticky .mobileList {
  width: 100%;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.4);
}

.mobileList ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

.mobileList ul li {
  margin: 10px 0;
}

.mobileList ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  letter-spacing: 2px;
  transition: 0.3s;
}

.mobileHamburger.active + .mobileList {
  display: flex;
  animation: slideDown 0.4s ease forwards;
}

@media (max-width: 1024px) {
  .headerList {
    display: none;
  }
  .mobileHamburger {
    display: block;
  }
}

@media (max-width: 670px) {
  header.sticky {
    padding: 10px 10px;
  }
}

@media (max-width: 426px) {
  header {
    padding: 0 40px 0 0;
  }
  .mobileList {
    padding: 10px 0;
  }

  .mobileList ul li a {
    font-size: 1rem;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(200px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
