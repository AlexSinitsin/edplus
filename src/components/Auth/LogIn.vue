<template>
  <div class="auth__box">
    <h2>{{ $t("heading.login") }}</h2>
    <input type="text" v-model="email" :placeholder="$t('auth.email')" />
    <input type="password" v-model="password" :placeholder="$t('auth.pass')" />
    <div class="errors">{{ errors }}</div>
    <div class="send__data" @click="sendData">
      {{ $t("buttonLogin.login") }}
    </div>
    <div class="links">
      <div @click="$emit('openModal', 'registration')">
        {{ $t("heading.registration") }}
      </div>
      <div @click="$emit('openModal', 'passwordRecovery')">
        {{ $t("heading.passwordRecovery") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits /*, defineProps*/ } from "vue";
import { useStore } from "vuex";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

let userSchema = Yup.object({
  email: Yup.string()
    .email(t("authValidationErrors.email"))
    .required(t("authValidationErrors.require")),
  password: Yup.string().required(t("authValidationErrors.require")),
});

const store = useStore();

const email = ref("");
const password = ref("");

const errors = ref("");
const serverError = computed(() => store.getters.error);

const emits = defineEmits(["closeModal"]);

const sendData = async () => {
  await userSchema
    .validate({
      email: email.value,
      password: password.value,
    })
    .then((result) => {
      errors.value = "";

      store
        .dispatch("AUTH", {
          email: email.value,
          password: password.value,
        })
        .then(() => {
          if (!serverError.value) {
            emits("closeModal");
            email.value = "";
            password.value = "";
          }
        })
        .then(() => {
          store.dispatch("GET_USER");
        });
      return result;
    })
    .catch((e) => {
      errors.value = e.errors[0];
      return e;
    });
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
