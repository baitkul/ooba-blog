<template>
  <div class="flex flex-col lg:flex-row pt-nav">
    <div class="w-full pt-10 overflow-hidden">
      <div v-if="loading" class="flex items-center justify-center w-full">
        <i class="text-5xl far fa-spinner-third text-primary animate-spin"></i>
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
