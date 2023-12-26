<template>
  <div class="error__background" v-if="error" @click="close">
    <div class="modal">
      <div class="massege">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({ text: String });
const error = computed(() => props.text);
const close = () => store.commit("cleanError");
</script>

<style scoped lang="scss">
.error__background {
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  cursor: pointer;
}
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 120;
}
.massege {
  width: 90vw;
  left: 5vw;
  position: absolute;
  top: calc(50vh - 20px);
  box-sizing: border-box;
  padding: 22px 20px 18px;
  background: var(--orange);
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
  display: flex;
  justify-content: center;
}
.error {
  color: white;
  padding: 17px 10px;
}
hr {
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>
