<template>
  <div class="auth__box">
    <h2>{{ $t("heading.registration") }}</h2>
    <input type="text" v-model="cmdr" :placeholder="$t('auth.cmdr')" />
    <input type="text" v-model="email" :placeholder="$t('auth.email')" />
    <input type="password" v-model="password" :placeholder="$t('auth.pass')" />
    <input
      type="password"
      v-model="passwordConfirmation"
      :placeholder="$t('auth.passwordConfirmation')"
    />
    <div class="errors">{{ errors }}</div>
    <div class="send__data" @click="sendData">
      {{ $t("buttonLogin.registration") }}
    </div>
    <div class="links">
      <div @click="$emit('openModal', 'logIn')">{{ $t("heading.login") }}</div>
      <div @click="$emit('openModal', 'passwordRecovery')">
        {{ $t("heading.passwordRecovery") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits /*, defineProps */ } from "vue";
import { useStore } from "vuex";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

let userSchema = Yup.object({
  cmdr: Yup.string().required(t("authValidationErrors.require")),
  email: Yup.string()
    .email(t("authValidationErrors.email"))
    .required(t("authValidationErrors.require")),
  password: Yup.string().required(t("authValidationErrors.require")),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    t("authValidationErrors.match"),
  ),
});

const store = useStore();

let cmdr = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const errors = ref("");

const emits = defineEmits(["open"]);

const sendData = async () => {
  await userSchema
    .validate({
      cmdr: cmdr.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    })
    .then(() => {
      errors.value = "";

      store
        .dispatch("REGISTRATION", {
          cmdr: cmdr.value,
          email: email.value,
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        })
        .then((e) => {
          if (e) {
            cmdr.value = "";
            email.value = "";
            password.value = "";
            passwordConfirmation.value = "";

            store.commit("setError", "ConfirmEmail");
            emits("openModal", "logIn");
          }
        });
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
