<template>
  <div
  >
    <h2 class="text-2xl font-bold">
      Рекомендуем вам
    </h2>
    <div class="mt-5">
      <div
        v-for="(item, idx) in data"
        :key="idx"
        class="p-4 mb-3 bg-gray-100 rounded-md">
        <NuxtLink
          :to="'/blog/'+ item.slug"
          class="text-xl font-bold"
          style="word-break: break-word">
          {{ item.title }}
        </NuxtLink>
        <p class="mt-3">{{ item.body.blocks[0].data.text.length > 100 ? item.body.blocks[0].data.text.slice(0, 100) + '...' : item.body.blocks[0].data.text }} </p>
        <div class="flex flex-wrap mt-5">
          <NuxtLink

            v-for="tag in item.tags"
            :key="tag._id"
            :to="'/blogs/'+ tag.slug"
            class="px-3 py-3 mb-2 mr-2 bg-white rounded">
            {{ tag.title }}
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  created() {
    console.log(this.data)
  }
}
</script>

