<template>
  <div class="flex flex-col lg:flex-row pt-nav container-auto">
    <div class="w-full pt-10 xl:w-9/12 lg:w-8/12">
      <BlogView :data="blog" />
    </div>
    <div
      class="w-full mb-3 xl:w-3/12 lg:pt-10 lg:w-4/12">
      <RecommendSidebar :data="records" />
    </div>
  </div>
</template>
<script>
export default {
  async fetch() {
    const params = { page: 1, pageSize: 3 }
    const data = await this.$axios.$get('/api/v1/blog/public/articles/' + this.$route.params.slug)
    const { result } = await this.$axios.$get('/api/v1/blog/public/articles/', { params })
    this.records = result
    this.blog = data
    console.log(data)
  },
  layout: 'blog',
  data: () => ({
    blog: undefined,
    records: undefined
  })
}
</script>>
