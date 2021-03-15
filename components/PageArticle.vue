<template>
  <div>
    <div
      v-lazy:background-image="'/images/background.jpg'"
      class="absolute top-0 left-0 w-full bg-center bg-no-repeat bg-cover"
      style="height: 1000px; width: 100% !important; z-index: -1;"
    ></div>
    <div class="flex container-auto pt" style="color: #fff">
      <div class="mt-20 md:w-6/12">
        <h3 class="font-bold title">
          Польза и вдохновение
        </h3>
        <p class="mt-3 text-xl">
          Узнавай новое, развлекайся, самосовершенствуйся вместе с нами. Будь в курсе последних трендов.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 32px;
}

@media screen and (min-width: 1440px) {
  .title {
    font-size: 70px;
    line-height: 70px;
  }
}

.pt {
  padding-top: 100px;
}

@media (min-width: 1200px) {
  .pt {
    padding-top: 160px;
  }
}
</style>
