<template>
  <div>
    <div v-if="data" class="pb-5 mx-auto max-w lg:pr-5">
      <h1 class="text-3xl font-bold text-center">
        {{ data.title }}
      </h1>

      <div
        v-for="(blocks, idx) in data.body.blocks"
        :key="idx"
        class="mt-7">
        <p
          v-if="blocks.type === 'paragraph'"
          class="text-left paragraph-block"
          v-html="blocks.data.text">
        </p>
        <div v-if="blocks.type === 'image'">
          <h3 class="text-xl font-bold text-center">{{ blocks.data.caption }}</h3>
          <div class="flex items-center justify-center mt-2 md:p-5">
            <img
              class="object-cover w-full blog-img"
              :src="blocks.data.file.url"
              alt="article" />
          </div>
        </div>
        <div v-if="blocks.type === 'header'">
          <h1 class="w-full text-2xl font-bold text-center" v-html="blocks.data.text">
          </h1>
        </div>
        <div v-if="blocks.type === 'button'">
          <div class="flex justify-center w-full py-3">
            <a
              class="px-5 py-3 border border-black hover:bg-black hover:text-white"
              target="_blank"
              :href="blocks.data.link">{{ blocks.data.input }}</a>
          </div>
        </div>
        <div v-if="blocks.type === 'list'">
          <ul
            class="ml-10"
            style="list-style-type: decimal !important;"
          >
            <li
              v-for="(li, id) in blocks.data.items"
              :key="id"
            >
              {{ li }}
            </li>
          </ul>
        </div>
      </div>

    </div>
    <RecommendSidebar />

    <div class="mt-10">
      <p class="w-full text-center">
        Рубрика данной статьи
      </p>
      <div class="flex flex-wrap justify-center mt-5">
        <NuxtLink
          v-for="(tag, idx) in data.tags"
          :key="idx"
          :to="'/blogs/'+ tag.slug"
          class="px-3 py-3 mb-3 mr-3 border border-gray-300 rounded">
          {{ tag.title }}
        </NuxtLink>
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
}
</script>
<style>
  .paragraph-block > a {
    text-decoration-style: solid !important;
    text-decoration-line: underline !important;
  }

  .blog-img {
    width: 500px;
    height: 500px;
  }

  @media (max-width: 500px) {
    .blog-img {
      width: 100%;
      object-fit: contain;
      height: auto;
    }
  }
</style>
