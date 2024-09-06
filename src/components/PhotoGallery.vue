<template>
  <section>
    <Transition name="fade">
      <GlobalPopup
        v-if="popupTitle"
        :title="popupTitle"
        :message="popupMessage"
        :id="clickedImageId"
        :singleButton="messageDeleted"
        @confirm="deleteImage"
        @close="closePopup"
      ></GlobalPopup>
    </Transition>

    <main>
      <ButtonSlider :sortBy="sortImages" :onReset="resetFilter"></ButtonSlider>
      <div class="container">
        <p v-if="props.images.length === 0">
          Nažalost, došlo je do problema. Molim vas pokušajte ponovo
        </p>
        <GlobalSpinner v-if="images.length === 0"></GlobalSpinner>
        <div class="box" v-for="image in images" :key="image.id">
          <img :src="image.imageURL" :alt="'Slika:' + image.title" />
          <div class="imageDetails" @click="handleSingleImage(image.imageURL)">
            <div>
              <h3>{{ image.title }}</h3>
            </div>
            <div>
              <p>{{ image.description }}</p>
            </div>
          </div>
          <div class="deleteButton">
            <i class="fa-solid fa-trash-can" @click="showPopup(image.id)"></i>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import GlobalPopup from "../global/GlobalPopup.vue";
import ButtonSlider from "./ButtonSlider.vue";
import GlobalSpinner from "../global/GlobalSpinner.vue";
import { ref } from "vue";

const popupTitle = ref("");
const popupMessage = ref("");
const messageDeleted = ref(false);

const clickedImageId = ref("");

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["imageLink", "sortBy", "onReset"]);

function sortImages(family) {
  return emit("sortBy", family);
}

function resetFilter() {
  return emit("onReset");
}
function showPopup(id) {
  popupTitle.value = "Da li ste sigurni da želite da obrišete sliku?";
  popupMessage.value = "Slika će biti uklonjena iz galerije";
  clickedImageId.value = id;
  messageDeleted.value = false;
}

function closePopup() {
  popupTitle.value = "";
  popupMessage.value = "";
  clickedImageId.value = "";
}

function handleSingleImage(link) {
  emit("imageLink", link);
}

async function deleteImage() {
  try {
    const response = await fetch(
      `https://cloudinary-images-default-rtdb.europe-west1.firebasedatabase.app/images/${clickedImageId.value}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the image.");
    }
    popupTitle.value = "Uspešno!";
    popupMessage.value = "Slika je uspešno obrisana";
    messageDeleted.value = true;
  } catch (error) {
    popupTitle.value = "Nastao je problem...";
    popupMessage.value = "Molim vas pokušajte ponovo.";
    messageDeleted.value = true;
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

section {
  min-height: 50vh;
}
.container {
  width: 1400px;
  margin: 20px auto;
  columns: 4;
  column-gap: 20px;
}

.container .box {
  width: 100%;
  margin-bottom: 10px;
  break-inside: avoid;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 15px;
  animation: fade-in 0.5s;
}

.container .box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
}

.imageDetails {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.4);
  margin-bottom: 7px;
  border-radius: 15px;
  z-index: 1;
}

.imageDetails h3,
.imageDetails p {
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.imageDetails h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.imageDetails p {
  font-size: 0.9rem;
}

.deleteButton {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  opacity: 0;
  transition: all 0.3s;
}
.deleteButton i {
  font-size: 17px;
  z-index: 1;
  transition: all 0.3s;
}
.deleteButton i:hover {
  font-size: 20px;
}
.container .box:hover .imageDetails,
.container .box:hover .deleteButton {
  opacity: 1;
}

.container .box:hover .imageDetails h3,
.container .box:hover .imageDetails p {
  transform: translateY(0);
  opacity: 1;
}

.container .box:hover .imageOverlay {
  background: rgba(0, 0, 0, 0.6);
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 1200px) {
  .container {
    width: calc(100% - 40px);
    columns: 3;
  }
}

@media (max-width: 768px) {
  .container {
    columns: 2;
  }
}

@media (max-width: 480px) {
  .container {
    columns: 1;
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
