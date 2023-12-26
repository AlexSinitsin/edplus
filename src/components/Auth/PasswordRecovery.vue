<template>
  <div class="auth__box">
    <h2>{{ $t("heading.passwordRecovery") }}</h2>
    <input type="text" v-model="email" :placeholder="$t('auth.email')" />
    <div class="errors">{{ errors }}</div>
    <div class="send__data" @click="sendData">
      {{ $t("buttonLogin.passwordRecovery") }}
    </div>
    <div class="links">
      <div @click="$emit('openModal', 'logIn')">{{ $t("heading.login") }}</div>
      <div @click="$emit('openModal', 'registration')">
        {{ $t("heading.registration") }}
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref, computed /*defineEmits, defineProps*/ } from "vue";
//import { useStore } from "vuex"
import * as Yup from "yup";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

const { t } = useI18n();
//const emits = defineEmits(['openModal'])
const store = useStore();

let userSchema = Yup.object({
  email: Yup.string().email().required(t("authValidationErrors.require")),
});

// const store = useStore()
const errors = ref("");

const email = ref("");
const emailCom = computed(() => email.value);

const sendData = async () => {
  userSchema
    .validate({
      email: email.value,
    })
    .then(() => {
      errors.value = "";

      store.dispatch("RECOVERY", {
        email: emailCom.value,
      });

      email.value = "";
    })
    .catch((e) => {
      errors.value = e.errors[0];
      return e;
    });
  //store.dispatch('AUTH', { login: login, email: email })
};
</script>

<style scoped lang="scss">
h2 {
  color: var(--orange);
}
.auth__box {
  input {
    width: 100%;
    height: 40px;
    border: 2px solid var(--orange);
    color: white;
    background: transparent;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding-left: 15px;
    &:focus {
      outline: none;
    }
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  .errors {
    margin-top: 10px;
    color: red;
  }
  .send__data {
    padding: 10px 20px 7px;
    background: var(--orange);
    margin-bottom: 20px;
    margin-top: 10px;
    color: white;
    cursor: pointer;
  }
}
.links {
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  div {
    color: var(--orange);
    cursor: pointer;
  }
}
</style>
