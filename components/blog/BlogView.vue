<template>
  <div v-if="data" class="pb-5 lg:pr-5">
    <h1 class="text-3xl font-bold">
      {{ data.title }}
    </h1>
    <div class="mt-10">
      <span>
        Рубрика данной статьи
      </span>
      <div class="flex flex-wrap mt-5">
        <div
          v-for="(tag, idx) in data.tags"
          :key="idx"
          class="px-3 py-3 mb-3 mr-3 border border-gray-300 rounded">
          {{ tag.title }}
        </div>
      </div>
    </div>
    <div
      v-for="(blocks, idx) in data.body.blocks"
      :key="idx"
      class="mt-7">
      <p v-if="blocks.type === 'paragraph'">
        {{ blocks.data.text }}
      </p>
      <div v-if="blocks.type === 'image'" class="mt-5">
        <h3 class="text-xl font-bold">{{ blocks.data.caption }}</h3>
        <div class="mt-5 bg-gray-100 md:p-5">
          <img
            class="object-contain w-full"
            style="height: 367px"
            :src="blocks.data.file.url"
            alt="article" />
        </div>
      </div>
      <div v-if="blocks.type === 'header'">
        <h1 class="text-2xl font-bold">
          {{ blocks.data.text }}
        </h1>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    console.log(this.data)
  }
}
</script>
