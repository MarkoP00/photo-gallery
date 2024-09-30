<template>
  <AnimatedBackground></AnimatedBackground>
  <SimpleHeader></SimpleHeader>
  <section class="upload-container">
    <Transition name="fade">
      <GlobalPopup
        v-if="popupTitle"
        @close="closePopup"
        :singleButton="true"
        :title="popupTitle"
        :message="popupMessage"></GlobalPopup>
    </Transition>

    <main class="upload-main">
      <div class="upload-form">
        <div class="form-header">
          <h3>Nova slika</h3>
        </div>
        <div class="form-group">
          <label for="title">Naslov slike</label>
          <input
            type="text"
            v-model="imageValues.title"
            id="title"
            placeholder="Unesite naslov"
            class="input-field"
            autocomplete="off" />
        </div>
        <div class="form-group">
          <label for="desc">Opis slike</label>
          <input
            type="text"
            v-model="imageValues.description"
            id="desc"
            placeholder="Unesite opis"
            class="input-field"
            autocomplete="off" />
        </div>
        <div class="form-group">
          <label for="family">Kategorija slike</label>
          <input
            type="text"
            v-model="imageValues.category"
            id="category"
            placeholder="Unesite kategoriju"
            class="input-field"
            autocomplete="off" />
        </div>
        <div class="upload-button-container">
          <p class="attention">
            Naslov, opis i slika će se automatski poslati na server čim
            odaberete sliku.
          </p>
          <button
            @click="openUploadWidget"
            class="upload-button">
            Odaberi sliku
          </button>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import GlobalPopup from "../global/GlobalPopup.vue";
import AnimatedBackground from "./AnimatedBackground.vue";
import SimpleHeader from "./SimpleHeader.vue";
const router = useRouter();

function checkUserToken() {
  const idToken = localStorage.getItem("idToken");
  const expirationTime = localStorage.getItem("expirationTime");
  console.log(expirationTime);

  if (!idToken || !expirationTime) {
    return router.push("/signup");
  } else if (idToken && expirationTime) {
    const currentTime = Date.now();
    console.log(currentTime, " curr");

    if (currentTime >= expirationTime) {
      return router.push("/signup");
    }
  }
}

function getCurrentDate() {
  const now = new Date();
  const formattedTime = now.toLocaleString();

  return formattedTime;
}

const popupTitle = ref("");
const popupMessage = ref("");

function closePopup() {
  popupTitle.value = "";
  popupMessage.value = "";
}

const imageValues = ref({
  title: "",
  description: "",
  category: "",
});

const widget = window.cloudinary.createUploadWidget(
  {
    cloud_name: "djre34b8c",
    upload_preset: "send-it",
    api_key: "612221761856468",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      fetch(
        "https://cloudinary-images-default-rtdb.europe-west1.firebasedatabase.app/images.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageURL: result.info.secure_url,
            title: imageValues.value.title,
            description: imageValues.value.description,
            family: imageValues.value.category,
            date: getCurrentDate(),
          }),
        }
      );
      popupTitle.value = "Uspesno!";
      popupMessage.value = "Slika je dodata u galeriju";

      imageValues.value.title = "";
      imageValues.value.description = "";
      imageValues.value.category = "";
    } else if (error && !result && result.event !== "success") {
      popupTitle.value = "Nastao je problem...";
      popupMessage.value = "Molim vas pokusajte ponovo";
    }
  }
);

function openUploadWidget() {
  widget.open();
}

onMounted(() => {
  checkUserToken();
});
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.upload-main {
  background-color: rgb(44, 44, 44, 0.8);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
}

.upload-form {
  display: flex;
  flex-direction: column;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h3 {
  color: #ffffff;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #cccccc;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  background-color: #3d3d3d;
  border: 1px solid #555555;
  border-radius: 4px;
  font-size: 1rem;
  color: #ffffff;
  transition: border-color 0.3s;
}

.input-field::placeholder {
  color: #aaaaaa;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
}

.upload-button-container {
  text-align: center;
}

.attention {
  font-size: 0.9rem;
  color: rgb(231, 217, 13);
  margin-bottom: 1rem;
  background: rgba(231, 217, 13, 0.2);
  padding: 10px;
  border-left: 6px solid rgba(231, 217, 13);
}

.upload-button {
  background-color: #573b8a;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #6b44d8;
}

@media (max-width: 376px) {
  .upload-main {
    max-width: 300px;
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
