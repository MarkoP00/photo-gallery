<template>
  <header ref="headerRef">
    <div class="logo">
      <img
        src="/images/logo-transparent.png"
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
  <div class="banner">
    <img
      src="/images/bg-image.jpg"
      alt="image not found" />
    <div class="banner-text">
      <h1>Vaše uspomene</h1>
      <h2>naša umetnost</h2>
      <span>
        Svaki trenutak je jedinstven, a mi smo tu da ga zabeležimo na poseban
        način.
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const headerRef = ref(null);
const hamburgerMenuVisible = ref(false);

function toggleHamburger() {
  hamburgerMenuVisible.value = !hamburgerMenuVisible.value;
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        headerRef.value.classList.add("sticky");
      } else {
        headerRef.value.classList.remove("sticky");
      }
    },
    { threshold: 0.1 }
  );

  const banner = document.querySelector(".banner");
  observer.observe(banner);
});
</script>

<style scoped>
/* Header Styles */
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
  background-color: rgba(255, 255, 255, 0.1);
}

header.sticky {
  padding: 10px 100px;
  background: rgba(0, 0, 0, 0.4);
}

header img {
  height: 120px;
  width: 180px;
  margin: 5px;
  cursor: pointer;
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
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
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

.banner {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.banner img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.banner-text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
}

.banner-text h1 {
  font-size: 4em;
  margin-bottom: 10px;
}

.banner-text h2 {
  font-size: 3em;
  margin-bottom: 15px;
}

.banner-text span {
  font-size: 1.2em;
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
    padding: 10px 10px;
  }
  .mobileList ul li {
    border: 1px solid #fff;
    padding: 10px;
    background-color: rgb(22, 147, 230, 0.4);
    border-radius: 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header.sticky .mobileList ul li {
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.1);
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
