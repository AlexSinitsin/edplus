<template>
  <div class="account">
    <h2>{{ $t("heading.account") }}</h2>
    <form
      action=""
      class="form__avatar"
      ref="image"
      method="post"
      enctype="multipart/form-data"
    >
      <label for="image"><img :src="avatar" alt="" /></label>
      <input
        id="image"
        accept="image/gif, image/jpeg"
        type="file"
        @change="sendImg"
        name="avatar"
      />
    </form>
    <div class="user__box">
      <div v-if="cmdrOpened" class="header">
        <div>
          <span>CMDR:</span><span>{{ user.cmdr }}</span>
        </div>
        <img @click="cmdrOpened = false" src="../assets/edit.svg" alt="img" />
      </div>
      <div v-else class="input">
        <input type="text" v-model="cmdr" :placeholder="$t('auth.cmdr')" /><img
          @click="cmdrOpened = true"
          src="../assets/cross.svg"
          alt="img"
        />
      </div>
    </div>
    <div class="user__box">
      <div v-if="emailOpened" class="header">
        <div>
          <span>Email:</span><span>{{ user.email }}</span>
        </div>
        <img @click="emailOpened = false" src="../assets/edit.svg" alt="img" />
      </div>
      <div v-else class="input">
        <input
          type="text"
          v-model="email"
          :placeholder="$t('auth.email')"
        /><img
          @click="emailOpened = true"
          src="../assets/cross.svg"
          alt="img"
        />
      </div>
    </div>
    <div class="user__box">
      <div v-if="discordOpened" class="header">
        <div>
          <span>Discord account:</span><span>{{ user.discord }}</span>
        </div>
        <img
          @click="discordOpened = false"
          src="../assets/edit.svg"
          alt="img"
        />
      </div>
      <div v-else class="input">
        <input
          type="text"
          v-model="discord"
          :placeholder="$t('auth.discord')"
        /><img
          @click="discordOpened = true"
          src="../assets/cross.svg"
          alt="img"
        />
      </div>
    </div>
    <div class="user__box">
      <div
        class="header button"
        @click="passwordOpened = false"
        v-if="passwordOpened"
      >
        {{ $t("buttonLogin.editPassword")
        }}<img src="../assets/edit.svg" alt="img" />
      </div>
      <div class="password__box" v-else>
        <div>
          <input
            type="text"
            v-model="password"
            :placeholder="$t('auth.pass')"
          />
          <input
            type="text"
            v-model="passwordConfirmation"
            :placeholder="$t('auth.passwordConfirmation')"
          />
        </div>
        <img
          @click="passwordOpened = true"
          src="../assets/cross.svg"
          alt="img"
        />
      </div>
    </div>
    <div class="errors">{{ errors }}</div>
    <div
      class="send__data"
      v-if="!cmdrOpened || !emailOpened || !discordOpened || !passwordOpened"
      @click="sendData"
    >
      {{ $t("buttonLogin.saveChanges") }}
    </div>
    <div class="send__data" @click="logOut">{{ $t("buttonLogin.logout") }}</div>
  </div>
</template>

<script setup>
import { ref, computed, /*, defineProps */ onMounted } from "vue";
import { useStore } from "vuex";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const cmdrOpened = ref(true);
const emailOpened = ref(true);
const discordOpened = ref(true);
const passwordOpened = ref(true);

let userSchema = Yup.object({
  cmdr: Yup.string().required(t("authValidationErrors.require")),
  email: Yup.string()
    .email(t("authValidationErrors.email"))
    .required(t("authValidationErrors.require")),
  discord: Yup.string(),
  password: Yup.string().required(t("authValidationErrors.require")),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    t("authValidationErrors.match"),
  ),
});

const store = useStore();

const cmdr = ref(store.getters.user.cmdr);
const email = ref(store.getters.user.email);
const discord = ref("");
const password = ref(store.getters.user.password);
const passwordConfirmation = ref("");

const cmdrCom = computed(() => cmdr.value);
const emailCom = computed(() => email.value);
const discordCom = computed(() => discord.value);
const passwordCom = computed(() => password.value);
const passwordConfirmationCom = computed(() => passwordConfirmation.value);

const user = computed(() => store.getters.user);
console.log();
const avatar = computed(
  () => "http://localhost:8081" + store.getters.user.image,
);

const errors = ref("");

const image = ref(null);

const sendData = async () => {
  await userSchema
    .validate({
      cmdr: cmdrCom.value,
      email: emailCom.value,
      discord: discordCom.value,
      password: passwordCom.value,
      passwordConfirmation: passwordConfirmationCom.value,
    })
    .then(() => {
      errors.value = "";

      store.dispatch("UPDATE_ACCOUNT", {
        cmdr: cmdrCom.value,
        email: emailCom.value,
        password: passwordCom.value,
        discord: discordCom.value,
        token: store.getters.user.token,
        id: store.getters.user.id,
      });

      cmdrOpened.value = true;
      emailOpened.value = true;
      discordOpened.value = true;
      passwordOpened.value = true;
    })
    .catch((e) => {
      errors.value = e.errors[0];
      return e;
    });
};
const logOut = () => {
  store.commit("setIsAuth", false);
  router.push({ name: "main" });
};
const sendImg = () => {
  var form = new FormData(formImgCom.value);
  form.append("id", store.getters.user.id);
  store.dispatch("GET_SET_AVATAR", form);
};

const formImgCom = computed(() => image.value);

onMounted(() => {
  console.log(image.value);
});
console.log(image.value);
</script>

<style scoped lang="scss">
h2 {
  color: var(--orange);
}
.account {
  .form__avatar {
    width: 400px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    input {
      display: none;
    }
    label {
      width: 100px;
      height: 100px;
      display: block;
      border-radius: 100px;
      background: var(--orange);
      overflow: hidden;
      position: relative;
      &:before {
        content: "";
        width: 50px;
        height: 50px;
        left: calc(50% - 25px);
        top: calc(50% - 25px);
        display: block;
        position: absolute;
        background: url("../assets/cross-white.svg") no-repeat;
        background-size: 100%;
        transform: rotate(45deg);
      }
      img {
        position: relative;
      }
    }
  }
  .user__box {
    display: flex;
    justify-content: flex-start;
    .password__box {
      display: flex;
      align-items: flex-start;
      > div {
        display: flex;
        flex-flow: column wrap;
      }
      img {
        width: 20px;
      }
    }
  }
  .header {
    width: 400px;
    height: 40px;
    border-left: 2px solid var(--orange);
    border-bottom: 2px solid transparent;
    margin-bottom: 20px;

    padding-left: 15px;
    box-sizing: border-box;
    color: var(--orange);
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: inline;
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        color: white;
      }
    }
    &.button {
      border: 2px solid var(--orange);
      justify-content: center;
      padding: 0px;
      padding-top: 5px;
      cursor: pointer;
    }
    img {
      width: 20px;
      cursor: pointer;
      position: relative;
      top: -4px;
    }
  }
  .input {
    display: flex;
    align-items: center;
    img {
      width: 20px;
      cursor: pointer;
      position: relative;
      top: -7px;
      margin-bottom: 15px;
    }
  }
  input {
    width: 380px;
    height: 40px;
    border-bottom: 2px solid var(--orange);
    border-left: 2px solid var(--orange);
    border-top: 0px solid var(--orange);
    border-right: 0px solid var(--orange);
    color: white;
    background: transparent;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding-left: 15px;

    &:focus {
      outline: none;
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
    width: 400px;
    box-sizing: border-box;
  }
}
</style>
