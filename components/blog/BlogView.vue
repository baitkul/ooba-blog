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
        <NuxtLink
          v-for="(tag, idx) in data.tags"
          :key="idx"
          :to="'/blogs/'+ tag.slug"
          class="px-3 py-3 mb-3 mr-3 border border-gray-300 rounded">
          {{ tag.title }}
        </NuxtLink>
      </div>
    </div>
    <div
      v-for="(blocks, idx) in data.body.blocks"
      :key="idx"
      class="mt-7">
      <p
        v-if="blocks.type === 'paragraph'"
        class="paragraph-block"
        v-html="blocks.data.text">
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
        <h1 class="text-2xl font-bold" v-html="blocks.data.text">
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
</style>
