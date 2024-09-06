<template>
  <section @click="close">
    <main @click.stop>
      <div class="title">
        <h2>{{ props.title }}</h2>
      </div>
      <div class="message">
        <p>{{ props.message }}</p>
      </div>
      <div class="actionButton" v-if="!props.singleButton">
        <button class="confirm" @click="confirm">Da</button>
        <button class="cancel" @click="close">Ne</button>
      </div>
      <div class="singleButton" v-else>
        <button @click="close">U redu!</button>
      </div>
    </main>
  </section>
</template>

<script setup>
const emits = defineEmits(["confirm", "close"]);
const props = defineProps({
  title: String,
  message: String,
  id: String,
  singleButton: Boolean,
});

function confirm() {
  emits("confirm", props.id);
  close();
}

function close() {
  emits("close");
}
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999999999999999999;
  background-color: rgba(0, 0, 0, 0.6);
}
main {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  background-color: rgba(34, 34, 34, 0.9);
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: fade-in 0.5s;
}
.title h2 {
  color: #f1f1f1;
  font-size: 22px;
  font-weight: 600;
}
.message p {
  color: #d1d1d1;
  font-size: 14px;
}
.actionButton {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  padding: 12px 18px;
  background-color: #1e90ff;
  width: 48%;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
button:hover {
  background-color: #187bcd;
  transform: translateY(-2px);
}
button:active {
  background-color: #1669c1;
  transform: translateY(0);
}

@media (min-width: 375px) {
  main {
    width: 340px;
  }
}
@media (min-width: 425px) {
  main {
    width: 380px;
  }
}
@media (min-width: 600px) {
  main {
    width: 400px;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
