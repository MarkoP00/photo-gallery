<template>
  <SimpleHeader></SimpleHeader>
  <main>
    <div class="content">
      <div class="containerImage">
        <img
          src="/images/pexels-bertellifotografia-2376991.jpg"
          alt="" />
      </div>
      <input
        type="checkbox"
        id="check"
        aria-hidden="true" />
      <div class="signup">
        <form
          action=""
          class="signupForm"
          @keydown.enter="handleLogin">
          <label
            for="check"
            aria-hidden="true"
            >Prijavi se</label
          >

          <div class="inputField">
            <input
              type="email"
              placeholder="Email"
              required
              v-model="userData.email.value"
              :class="userData.email.invalid ? 'invalid' : ''"
              @blur="userData.email.invalid = false" />
          </div>

          <div class="passwordInput">
            <input
              :type="passwordsVisible ? 'text' : 'password'"
              placeholder="Šifra"
              required
              v-model="userData.password.value"
              :class="userData.password.invalid ? 'invalid' : ''"
              @blur="userData.password.invalid = false" />
            <i
              v-if="!passwordsVisible"
              class="fa-solid fa-lock"
              @click="toggleVisibility('signup')"></i>
            <i
              v-else
              class="fa-solid fa-lock-open"
              @click="toggleVisibility('signup')"></i>
          </div>

          <button
            @click="handleLogin"
            type="button">
            Potvrdi
          </button>
        </form>
      </div>
      <div class="login">
        <label
          for="check"
          aria-hidden="true"
          >Pomoć?</label
        >
        <div class="text">
          <p>
            Ako se suočavaš s problemima prilikom prijavljivanja, slobodno
            kontaktiraj naš tim na
            <a href="mailto:office@apiforge.net">office@apiforge.net</a>
          </p>
          <p>
            Molimo te da ne pokušavaš prijavu na nalog bez ovlašćenja. Hvala ti
            na razumevanju! 😉
          </p>
        </div>
      </div>
    </div>
  </main>
  <AnimatedBackground></AnimatedBackground>
  <GlobalSpinner v-if="loading"></GlobalSpinner>
  <GlobalPopup
    v-if="popupTitle"
    :title="popupTitle"
    :message="popupMessage"
    :singleButton="true"></GlobalPopup>
  <GlobalSuccess v-if="loginSuccessful"></GlobalSuccess>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import AnimatedBackground from "../components/AnimatedBackground.vue";
import GlobalSpinner from "../global/GlobalSpinner.vue";
import GlobalPopup from "../global/GlobalPopup.vue";
import GlobalSuccess from "../global/GlobalSuccess.vue";
import SimpleHeader from "../components/SimpleHeader.vue";

const router = useRouter();
const passwordsVisible = ref(false);
const loading = ref(false);
const loginSuccessful = ref(false);

const popupTitle = ref("");
const popupMessage = ref("");

const userData = ref({
  email: {
    value: "",
    invalid: false,
    message: "",
  },
  password: {
    value: "",
    invalid: false,
    message: "",
  },
});

function formValidation() {
  let formIsInvalid = false;
  Object.keys(userData.value).forEach((key) => {
    if (userData.value[key].value.length < 5) {
      formIsInvalid = true;
      userData.value[key].invalid = true;
    } else {
      userData.value[key].invalid = false;
    }

    if (key === "email" && !userData.value.email.value.includes("@")) {
      formIsInvalid = true;
      userData.value.email.invalid = true;
    }
  });
  return formIsInvalid;
}

async function handleLogin() {
  loading.value = true;
  const formIsInvalid = formValidation();

  if (formIsInvalid) {
    loading.value = false;
    return;
  }

  try {
    const body = {
      email: userData.value.email.value,
      password: userData.value.password.value,
      returnSecureToken: true,
    };

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCon1VM6BlITYjQXhyE2gW8Q74l92eEeUY",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const expirationTime =
        new Date().getTime() + responseData.expiresIn * 1000;

      localStorage.setItem("idToken", responseData.idToken);
      localStorage.setItem("localId", responseData.localId);
      localStorage.setItem("refreshToken", responseData.refreshToken);
      localStorage.setItem("email", responseData.email);
      localStorage.setItem("expirationTime", expirationTime);
      loginSuccessful.value = true;

      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } else {
      const errorData = await response.json();
      popupTitle.value = "Greška!";
      popupMessage.value =
        errorData.error.message || "Molim vas pokušajte ponovo...";
    }
  } catch (error) {
    popupTitle.value = "Neuspešno!";
    popupMessage.value = "Molim vas pokušajte ponovo...";
  } finally {
    loading.value = false;
  }
}

function toggleVisibility() {
  passwordsVisible.value = !passwordsVisible.value;
}
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e); */
  padding: 10px;
}

.content {
  width: 400px;
  height: 530px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
  position: relative;
}
.containerImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.containerImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#check {
  display: none;
}

.signup {
  position: relative;
  width: 100%;
  height: 100%;
}
.signupForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.inputField {
  width: 100%;
}
input {
  width: 70%;
  background-color: rgb(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: 0.3s ease;
  border: 2px solid transparent;
}

input::placeholder {
  color: #fff;
}
input:focus {
  border: 2px solid #6b44d8;
}
.invalid {
  border: 2px solid red;
}
.passwordInput {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  width: 70%;
}

.passwordInput input {
  width: 100%;
}

.passwordInput i {
  position: absolute;
  right: 20px;
  color: #fff;
  font-size: 1em;
}

button {
  width: 70%;
  height: 45px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: 600;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  transition: 0.2s ease-in;
  cursor: pointer;
}

button:hover {
  background: #6b44d8;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 25px;
}
.text a {
  font-weight: 700;
}
.login {
  height: 460px;
  background: linear-gradient(to bottom, #e7560def, #24243e);
  border-radius: 60% / 10%;
  transform: translateY(-100px);
  transition: 0.8s ease-in-out;
}
.login label {
  color: #fff;
  transform: scale(0.6);
}
.login button {
  background-color: #e7560def;
}
.login button:hover {
  background-color: #f36219ef;
}
#check:checked ~ .login {
  transform: translateY(-470px);
}
#check:checked ~ .login label {
  transform: scale(1);
}
#check:checked ~ .signup label {
  transform: scale(0.6);
}

@media (max-width: 540px) {
  .content {
    width: 350px;
    height: 500px;
  }
  .login {
    transform: translateY(-90px);
  }
  #check:checked ~ .login {
    transform: translateY(-440px);
  }
}
</style>
