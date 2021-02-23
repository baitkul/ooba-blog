<template>
  <div class="flex flex-wrap" style="min-height: 75vh">
    <div v-if="list.length <= 0" class="flex items-center justify-center w-full h-full">
      <span class="mt-20 text-2xl font-bold text-pink-600">
        Публикации пока отсутствует...
      </span>
    </div>
    <div
      v-for="item in list"
      v-else
      :key="item.slug"
      class="mb-10 mr-3 lg:mt-0 card-blog">
      <img
        :src="item.imageUrl"
        class="object-cover w-full h400"
      />
      <div class="p-5 bg-white">
        <h2 class="font-bold whitespace-normal xl:text-2xl text-md" style="word-wrap: break-word">
          {{ item.title }}
        </h2>
        <p
          class="mt-5 text-lg lg:text-sm xl:text-lg lg:break-all xl:break-words"
          v-html="firstBlock(item.body.blocks)">
        </p>
        <div class="flex flex-wrap mt-5">
          <NuxtLink

            v-for="tag in item.tags"
            :key="tag._id"
            :to="'/blogs/'+ tag.slug"
            class="px-3 py-3 mb-2 mr-2 bg-gray-100 rounded lg:text-sm xl:text-base">
            {{ tag.title }}
          </NuxtLink>
        </div>
        <div class="flex items-center justify-between mt-5 xl:text-base lg:text-xs">
          <div>
            {{ $utils.formatDate(item.createdAt) }}
          </div>
          <NuxtLink
            :to="`/blog/${item.slug} `"
            class="px-3 py-2 text-sm font-bold text-purple-600 uppercase break-normal border border-purple-600 outline-none xl:text-base xl:py-3 lg:text-xs xl:px-7 focus:outline-none hover:text-pink-50 hover:bg-purple-600"
          >
            Читать статью
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    firstBlock(blocks) {
      const filter = blocks.filter(bl => bl.type === 'paragraph')
      return filter[0].data.text.length > 100 ? filter[0].data.text.slice(0, 100) + '...' : filter[0].data.text
    }
  }
}
</script>

<style>
.card-blog {
  width: 100%;
  margin: 0 0 30px 0;
}

.h400 {
  height: 300px;
}

@media screen and (min-width: 768px) {
  .card-blog {
    width: calc(50% - 40px) !important;
    margin: 0 20px 20px 20px;
  }
}

@media screen and (min-width: 1024px) {
  .card-blog {
    width: calc(33.333% - 40px) !important;
    margin: 0 20px 30px 20px;
  }
}

@media (min-width: 1200px) {
  .h400 {
    height: 400px;
  }
}
</style>
