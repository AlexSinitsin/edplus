<template>
  <div id="app" translate="no">
    <div class="header">
      <div class="left__box">
        <router-link to="/" class="logo">
          <img src="./assets/logo.svg" alt="img" />
          <h1><span>ED</span>PLUS</h1>
        </router-link>
        <div class="menu">
          <router-link class="new__event button__transparent" to="/newevent"
            ><span>{{ $t("buttonLogin.newEvent") }}</span></router-link
          >
        </div>
      </div>
      <div class="right-box">
        <div class="right-box-login">
          <div
            class="right-box-login-text login"
            v-if="!isAuth"
            @click="openModalFunc('logIn')"
          >
            <img src="./assets/login.svg" alt="img" />
            <div>
              <span>{{ $t("buttonLogin.login") }}</span>
            </div>
          </div>
          <div class="right-box-login-text user" v-else @click="openAccount">
            <img src="./assets/user.svg" alt="img" />
            <div>
              <span>CMDR</span><span class="cmdr">{{ user?.cmdr }}</span>
            </div>
          </div>
        </div>
        <div class="lang" @click="openModalFunc('lang')">{{ $t("lang") }}</div>
      </div>
    </div>
    <div class="wrap">
      <div class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-route">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </div>

    <ErrorModal :text="error" />

    <Modal @close="closeModalFunc" :close="close"
      ><component
        @closeModal="closeModalFunc"
        @openModal="openModalFunc"
        :is="modatTypeData"
      ></component
    ></Modal>
  </div>
</template>

<script setup>
//import ErrorModal from './components/ErrorModal.vue'
import Modal from "./components/ModalBox.vue";
import ModalLang from "./components/ModalLang.vue";
import LogIn from "./components/Auth/LogIn.vue";
import RegistrationUser from "./components/Auth/RegistrationUser.vue";
import PasswordRecovery from "./components/Auth/PasswordRecovery.vue";
import ErrorModal from "./components/ErrorModal.vue";
import { computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const closeData = ref(false);
const modatTypeData = ref("");
const modalType = {
  lang: ModalLang,
  logIn: LogIn,
  registration: RegistrationUser,
  passwordRecovery: PasswordRecovery,
};

const close = computed(() => closeData.value);
const error = computed(() => store.getters.error);
const isAuth = computed(() => store.getters.isAuth);
const user = computed(() => store.getters.user);

const closeModalFunc = () => {
  closeData.value = false;
};

const openModalFunc = (lang) => {
  modatTypeData.value = modalType[lang];
  closeData.value = true;
};

const { locale } = useI18n();
onMounted(() => {
  locale.value = store.getters.lang;
});

const openAccount = () => {
  router.push({ name: "account" });
};
</script>

<style scoped lang="scss">
#app {
  font-family: Eurostile, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1280px;
  margin: 0px auto;
  .header {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    .left__box {
      display: flex;
      flex-flow: column wrap;
      align-items: flex-start;
      .menu {
        height: 32px;
        margin-top: 10px;
        margin-left: 30px;
        .new__event {
          width: 120px;
          padding-left: 26px;
          text-decoration: none;
          position: relative;
          font-size: 20px;
          padding-top: 8px;
          padding-right: 10px;
          display: inline-block;
          margin-top: 0px;
          &:before {
            content: "";
            width: 2px;
            height: 16px;
            position: absolute;
            left: 22px;
            top: 8px;
            background: var(--orange);
          }
          &:after {
            content: "";
            width: 16px;
            height: 2px;
            position: absolute;
            left: 15px;
            top: 15px;
            background: var(--orange);
          }
          &:hover {
            &:before {
              background: black;
            }
            &:after {
              background: black;
            }
          }
        }
      }
    }
    .logo {
      height: 50px;
      border-radius: 100px;
      margin-left: 30px;
      padding-top: 10px;

      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      text-decoration: none;

      > img {
        width: 50px;
      }
      h1 {
        font-size: 30px;
        padding-top: 20px;
        color: #9d5500;
        span {
          color: #ff8c0d;
        }
      }
    }
    .right-box {
      margin-right: 20px;
      display: flex;
      flex-flow: column wrap;
      align-items: flex-end;
      .right-box-login {
        margin-top: 20px;
        .right-box-login-text {
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
            width: 16px;
            margin-right: 10px;
          }
          &.user {
            display: flex;
            align-items: center;
          }
          div {
            color: #ff8c0d;
            position: relative;
            top: 2px;
            span {
              height: auto;
            }
          }
          span {
            margin-right: 10px;
          }
        }
      }
      .lang {
        width: 100px;
        padding: 5px;
        padding-bottom: 2px;
        text-align: center;
        border: 1px solid #ff8c0d;
        margin-top: 20px;
        color: #ff8c0d;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          color: black;
          background: #ff8c0d;
        }
      }
    }
  }
  .wrap {
    min-height: calc(100vh - 120px);
    background: rgba(40, 40, 40, 0.9);
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
