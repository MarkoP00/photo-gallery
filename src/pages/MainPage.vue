<template>
  <Header></Header>
  <PhotoGallery
    :images="sortArray"
    @imageLink="colletImageID"
    @sortBy="sortByFamily"
    @onReset="resetFilter"
  ></PhotoGallery>
  <AnimatedBackground></AnimatedBackground>

  <Transition name="fade">
    <SingleImage
      v-if="selectedImageURL"
      :selectedImageURL="selectedImageURL"
      :images="sortArray"
      :onClose="closeImage"
    ></SingleImage>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import PhotoGallery from "../components/PhotoGallery.vue";
import AnimatedBackground from "../components/AnimatedBackground.vue";
import SingleImage from "../components/SingleImage.vue";

const selectedImageURL = ref("");
const imagesData = ref([]);
const sortArray = ref([]);

async function getImages() {
  const response = await fetch(
    "https://cloudinary-images-default-rtdb.europe-west1.firebasedatabase.app/images.json"
  );

  if (response.ok) {
    const responseData = await response.json();

    Object.keys(responseData).forEach((key) => {
      imagesData.value.push({
        title: responseData[key].title,
        description: responseData[key].description,
        imageURL: responseData[key].imageURL,
        date: responseData[key].date,
        id: key,
        family: responseData[key].family,
      });
    });

    imagesData.value.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortArray.value = [...imagesData.value];
    console.log(sortArray.value);
  } else {
    console.error("Failed to fetch images");
  }
}

function sortByFamily(family) {
  if (family) {
    const lowercasedFamily = family.toLowerCase();
    sortArray.value = imagesData.value.filter((element) => {
      const families = element.family
        .toLowerCase()
        .split(",")
        .map((f) => f.trim());
      return families.includes(lowercasedFamily);
    });
  } else {
    sortArray.value = [...imagesData.value];
  }
}

function resetFilter() {
  sortArray.value = [...imagesData.value];
}

function colletImageID(link) {
  selectedImageURL.value = link;
}

function closeImage() {
  selectedImageURL.value = "";
}

onMounted(() => {
  getImages();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
