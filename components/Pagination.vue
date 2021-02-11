<template>
  <vue-ads-pagination
    :total-items="total"
    :max-visible-pages="visiblePages"
    :page="page"
  >
    <template slot-scope="props">
      <div class="hidden">
        {{ props.start }}
      </div>
    </template>
    <template
      slot="buttons"
      slot-scope="props"
    >
      <vue-ads-page-button
        v-for="(button, key) in props.buttons"
        :key="key"
        v-bind="button"
        class="px-2 rounded"
        :class="{'border border-gray-100': button.active}"
        @page-change="change(button.page)"
      />
    </template>
  </vue-ads-pagination>
</template>

<script>

import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination'

export default {
  components: {
    VueAdsPagination, VueAdsPageButton
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    visiblePages: {
      type: Number,
      default: () => 5
    }
  },
  methods: {
    change(page) {
      this.$emit('change-page', page + 1)
    }
  }
}
</script>
