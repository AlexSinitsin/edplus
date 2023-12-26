<template>
  <div class="rating__box">
    <div class="rating__type">
      <div class="rating__button 1v1">1v1</div>
      <div class="rating__button 2v2">2v2</div>
      <div class="rating__button 4v4">4v4</div>
      <div class="rating__button all__against__all">All against all</div>
      <div class="rating__button unique__event">Unique event</div>
    </div>
    <component
      @closeModal="closeModalFunc"
      @openModal="openModalFunc"
      :is="ratingTypeData"
    ></component>
  </div>
</template>

<script setup></script>

<style scoped lang="scss"></style>
