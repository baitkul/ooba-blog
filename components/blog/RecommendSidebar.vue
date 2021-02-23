<template>
  <div
  >
    <h2 class="py-5 text-3xl font-semibold text-center">
      Вам будет интересно
    </h2>
    <div class="flex flex-wrap justify-between mt-7">
      <div
        v-for="(item, idx) in records"
        :key="idx"
        class="overflow-hidden rounded-md cursor-pointer recomended-record"
        @click="$router.push({path: '/blog/' + item.slug})">
        <div class="p-4 mb-3 bg-gray-100">
          <div class="w-full mb-5">
            <img
              class="object-cover w-full rounded"
              :src="item.imageUrl"
              style="height: 350px"
              :alt="item.title" />
          </div>
          <NuxtLink
            :to="'/blog/'+ item.slug"
            class="text-xl font-bold"
            style="word-break: break-word">
            {{ item.title }}
          </NuxtLink>
          <p class="mt-3" v-html="firstBlock(item.body.blocks)">  </p>
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
  </div>
</template>

<script>
export default {
  async fetch() {
    const params = { page: 1, pageSize: 3 }
    const { result } = await this.$axios.$get('/api/blog/public/articles/', { params })
    this.records = result
  },

  data: () => ({
    records: undefined
  }),
  created() {
    console.log(this.data)
  },
  methods: {
    firstBlock(blocks) {
      const filter = blocks.filter(bl => bl.type === 'paragraph')
      return filter[0].data.text.length > 150 ? filter[0].data.text.slice(0, 150) + '...' : filter[0].data.text
    }
  }
}
</script>

<style scoped>
.recomended-record {
  width: 100%;
  min-height: auto;
}

@media (min-width: 768px) {
  .recomended-record {
    width: calc(50% - 10px);
  }
}

@media (min-width: 1024px) {
  .recomended-record {
    width: calc(33.3333% - 10px);
  }
}
</style>

