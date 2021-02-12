<template>
  <div class="flex flex-col lg:flex-row pt-nav container-auto">
    <div class="w-full pt-10 xl:w-9/12 lg:w-8/12">
      <div v-if="loading" class="flex items-center justify-center w-full">
        <div style="height: 60px; width: 60px" class="mt-10 border-t-2 border-r-2 border-pink-600 rounded-full animate-spin"></div>
      </div>
      <BlogView v-else :data="blog" />
    </div>
    <div
      class="w-full mb-3 xl:w-3/12 lg:pt-10 lg:w-4/12">
      <div v-if="loading" class="flex items-center justify-center w-full">
        <div style="height: 60px; width: 60px" class="mt-10 border-t-2 border-r-2 border-pink-600 rounded-full animate-spin"></div>
      </div>
      <RecommendSidebar v-else :data="records" />
    </div>
  </div>
</template>
<script>
export default {
  async fetch() {
    this.loading = true
    const params = { page: 1, pageSize: 3 }
    const data = await this.$axios.$get('/api/blog/public/articles/' + this.$route.params.slug)
    const { result } = await this.$axios.$get('/api/blog/public/articles/', { params })
    this.records = result
    this.blog = data
    this.loading = false
  },
  layout: 'blog',

  head() {
    return { title: this.blog && this.blog.title ? this.blog.title : 'Блог Ooba.kg' }
  },
  data: () => ({
    blog: undefined,
    records: undefined,
    loading: false
  })
}
</script>>
