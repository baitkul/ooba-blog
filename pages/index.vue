<template>
  <div>
    <PageArticle />
    <div class="xl:pt-10">
      <div class="flex flex-col mb-10 rounded container-auto">
        <div class="flex flex-col items-center px-4 py-5 lg:justify-between lg:flex-row">
          <h1 class="mb-5 text-3xl font-bold text-center lg:m-0">
            Последние публикации
          </h1>
          <div>
            <div class="flex justify-center lg:justify-end lg:text-sm" style="width: 300px">
              <Pagination
                v-if="model"
                :page="page - 1"
                :total="total"
                :visible-pages="3"
                @change-page="changePage"
              />

            </div>
          </div>
        </div>

        <div class="mt-5">
          <BlogList :list="model" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const params = { page: this.page, pageSize: this.pageSize }
    const { total, result } = await this.$axios.$get('/api/blog/public/articles', { params })
    this.total = total
    this.model = result
  },
  data: () => ({
    total: 0,
    page: 1,
    pageSize: 9,
    model: undefined
  }),
  methods: {
    changePage(page) {
      this.page = page
      this.$fetch()
    }
  }

}
</script>

<style>
.mt {
  margin-top: 100px;
}
</style>
