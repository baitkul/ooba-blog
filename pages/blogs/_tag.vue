<template>
  <div style="margin-top: 160px">
    <div class="flex flex-col rounded" style="backdrop-filter: blur(28px); background: rgba(0, 0, 0, 0.04);">
      <div class="flex flex-col py-5 lg:px-6 lg:pt-10 lg:justify-between lg:flex-row">
        <h1 class="mb-5 text-2xl font-bold text-center lg:m-0">
          Последние публикации
        </h1>
        <div class="flex justify-center lg:justify-end">
          <Pagination
            v-if="model"
            :page="page - 1"
            :total="total"
            :visible-pages="3"
            @change-page="changePage" />
        </div>
      </div>

      <div class="mt-10" style="min-height: 75vh">
        <div v-if="loading" class="flex items-center justify-center">
          <div style="width: 60px; height: 60px;" class="border-t-2 border-l-2 border-pink-600 rounded-full animate-spin"></div>
        </div>
        <BlogList v-else :list="model" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'blog',
  async fetch() {
    this.loading = true
    const params = { page: this.page, pageSize: this.pageSize, tagSlug: this.tag, title: this.title }
    const { total, result } = await this.$axios.$get('/api/blog/public/articles/', { params })
    this.total = total
    this.model = result
    this.loading = false
  },
  head() {
    return { title: 'Блог Ooba.kg' }
  },
  data: () => ({
    total: 0,
    page: 1,
    pageSize: 9,
    model: undefined,
    tag: '',
    title: '',
    loading: true
  }),
  watch: {
    '$route.query.search'(search) {
      if (search) {
        if (search.length <= 0) {
          this.title = ''
          this.$fetch()
        } else {
          this.title = search
          this.$fetch()
        }
      }
    }
  },
  created() {
    if (this.$route.params.tag) {
      this.page = 1
      this.tag = this.$route.params.tag
      this.$fetch()
    } else if (this.$route.query.search) {
      this.page = 1
      this.title = this.$route.query.search
      this.$fetch()
    }
  },
  methods: {
    changePage(page) {
      this.page = page
      this.$fetch()
    }
  }
}
</script>>
