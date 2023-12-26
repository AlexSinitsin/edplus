<template>
  <div class="lang__box">
    <div
      class="lang"
      v-for="lang in langArr"
      :key="lang[0]"
      @click="changeLang(lang[0])"
    >
      {{ lang[1].lang }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { locale } = useI18n();
const langArr = computed(() => store.getters.fullLang);
const changeLang = (lang) => {
  store.commit("setLang", lang);
  locale.value = store.getters.lang;
};
</script>

<style scoped lang="scss">
.lang__box {
  display: flex;
  padding: 10px;
  padding-top: 40px;
  .lang {
    color: #ff8c0d;
    cursor: pointer;
    padding: 7px 10px 3px;

    transition: 0.3s;
    &:hover {
      color: black;
      background: #ff8c0d;
    }
  }
}
</style>
