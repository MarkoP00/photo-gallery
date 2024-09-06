import { createWebHashHistory, createRouter } from "vue-router";
import MainPage from "./pages/MainPage.vue";
import UploadImages from "./components/UploadImages.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/admin", component: UploadImages },
  ],
});

export default router;
