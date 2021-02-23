<template>
  <div class="flex flex-col lg:flex-row pt-nav">
    <div class="w-full pt-10 overflow-hidden">
      <div v-if="loading" class="flex items-center justify-center w-full">
        <div style="height: 60px; width: 60px" class="mt-10 border-t-2 border-r-2 border-pink-600 rounded-full animate-spin"></div>
      </div>
      <BlogView v-else :data="blog" />
    </div>
  </div>
</template>
<script>
export default {
  async fetch() {
    this.loading = true
    try {
      const data = await this.$axios.$get('/api/blog/public/articles/' + this.$route.params.slug)
      this.blog = data
      this.loading = false
    } catch (e) {
      this.$router.push({ path: '/blogs' })
    } finally {
      this.loading = false
    }
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
