import { createWebHashHistory, createRouter } from "vue-router";
import MainPage from "./pages/MainPage.vue";
import UploadImages from "./components/UploadImages.vue";
import SignupPage from "./pages/SignupPage.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/admin", component: UploadImages },
    { path: "/signup", component: SignupPage },
  ],
});

export default router;
