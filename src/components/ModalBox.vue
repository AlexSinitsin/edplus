<template>
  <div class="wrapper" v-show="close">
    <div class="background" @click="closeFunc"></div>
    <div class="modal">
      <div class="close" @click="closeFunc"></div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({ close: Boolean });
const closeFunc = () => {
  emit("close", !props.close);
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 10;
  .background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 20;
    background: rgba(0, 0, 0, 0.7);
  }
  .modal {
    width: 400px;

    z-index: 30;
    position: absolute;
    top: 200px;
    left: calc(50% - 200px);
    background: black;
    border: 2px solid #ff8c0d;
    padding: 10px 10px 5px 10px;
    .close {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;

      &:before {
        content: "";
        display: block;
        width: 22px;
        background: #ff8c0d;
        height: 2px;
        transform: rotate(45deg);
        position: absolute;
        right: 2px;
        top: 10px;
      }
      &:after {
        content: "";
        display: block;
        width: 22px;
        background: #ff8c0d;
        height: 2px;
        transform: rotate(-45deg);
        position: absolute;
        right: 2px;
        top: 10px;
      }
    }
  }
}
</style>
