<template>
  <div class="absolute" style="z-index: 99;">
    <div
      id="fixedNav"
      class="fixed top-0 left-0 w-full bg-gray-100"
      style="transition: 0.5s"
      :class="{ 'scrolled': !view.atTopOfPage }">
      <nav class="flex items-center justify-between container-auto" style="height: 80px">
        <div>
          <NuxtLink to="/"> <img src="/images/Logo.svg" alt="logo" /></NuxtLink>
        </div>

        <transition
          enter-active-class="transition-opacity duration-100 ease-linear"
          leave-active-class="transition-opacity duration-100 ease-linear delay-75"
          enter-class="opacity-80"
          leave-to-class="opacity-80"
        >
          <div
            v-show="menuVisible"
            class="fixed inset-0 z-50 bg-black bg-opacity-30"
            @click="closeMenu"
          >
            <transition
              enter-active-class="transition-transform duration-100 ease-out transform"
              leave-active-class="transition-transform duration-100 ease-in transform"
              enter-class="-translate-y-8"
              leave-to-class="-translate-y-8"
            >
              <div v-show="menuVisible" class="bg-white">
                <div class="flex items-center h-20 px-4">
                  <nuxt-link to="/">
                    <img src="/images/Logo.svg" class="h-8 md:h-10" />
                  </nuxt-link>

                  <div class="flex justify-end flex-1 lg:hidden">
                    <button class="text-gray-600" @click="closeMenu">
                      <i class="mr-2 text-3xl fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <NuxtLink
                  to="/"
                  class="flex items-center px-4 text-black border-t border-gray-300 h-14"
                  exact-active-class="text-pink-600">
                  Главная
                </NuxtLink>
                <NuxtLink
                  v-for="(menu, idx) in menus"
                  :key="idx"
                  :to="'/blogs/'+ menu.slug"
                  exact-active-class="text-pink-600"
                  class="flex items-center px-4 text-black border-t border-gray-300 h-14"
                >
                  {{ menu.title }}
                </NuxtLink>
              </div>
            </transition>
          </div>
        </transition>


        <div class="hidden lg:block">
          <div class="flex space-x-3 xl:space-x-8 ">
            <NuxtLink to="/">
              Главная
            </NuxtLink>
            <NuxtLink
              v-for="(menu, idx) in menus"
              :key="idx"
              exact-active-class="text-pink-600"
              :to="'/blogs/'+ menu.slug">
              {{ menu.title }}
            </NuxtLink>
          </div>
        </div>

        <div></div>

        <div class="flex ">
          <div>
            <button
              class="px-4 py-3 text-pink-600 outline-none focus-within:outline-none focus:outline-none"
              style="line-height: 30px"
              @click="inputFocus"
            >
              <i v-if="!inputActive">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="#7b7b7b"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.8125 21.9844L18.1406 16.3125C18 16.2188 17.8594 16.125 17.7188 16.125H17.1094C18.5625 14.4375 19.5 12.1875 19.5 9.75C19.5 4.40625 15.0938 0 9.75 0C4.35938 0 0 4.40625 0 9.75C0 15.1406 4.35938 19.5 9.75 19.5C12.1875 19.5 14.3906 18.6094 16.125 17.1562V17.7656C16.125 17.9062 16.1719 18.0469 16.2656 18.1875L21.9375 23.8594C22.1719 24.0938 22.5469 24.0938 22.7344 23.8594L23.8125 22.7812C24.0469 22.5938 24.0469 22.2188 23.8125 21.9844ZM9.75 17.25C5.57812 17.25 2.25 13.9219 2.25 9.75C2.25 5.625 5.57812 2.25 9.75 2.25C13.875 2.25 17.25 5.625 17.25 9.75C17.25 13.9219 13.875 17.25 9.75 17.25Z" fill="#7b7b7b" />
                </svg>

              </i>
              <i
                v-else
                style="font-size: 24px; color: #7b7b7b; height: 24px; width: 24px"
                class="fas fa-times"></i>
            </button>
          </div>
          <div
            class="flex items-center justify-center text-xl outline-none lg:hidden focus-within:outline-none focus:outline-none"
          >
            <button
              class="px-4 py-3 outline-none focus:outline-none"
              @click="openMenu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="#7b7b7b"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  y="0.389648"
                  width="31"
                  height="3"
                  fill="#7b7b7b" />
                <rect
                  y="11.3896"
                  width="31"
                  height="3"
                  fill="#7b7b7b" />
                <rect
                  y="22.3896"
                  width="31"
                  height="3"
                  fill="#7b7b7b" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
    <transition
      enter-active-class="transition-transform duration-200 ease-out transform"
      leave-active-class="transition-transform duration-200 ease-in transform"
      enter-class="opacity-100"
      leave-to-class="translate-y-4"
    >
      <div
        v-show="inputActive"
        class="fixed left-0 right-0 flex items-center justify-center w-screen h-screen delay-100 opacity-0"
        style="backdrop-filter: blur(28px); z-index: 999; background: rgba(0, 0, 0, 0.8); opacity: 1; padding: 10px 20px"
      >
        <form
          class="flex justify-center container-auto"
          @submit.prevent="submit"
          @keyup.esc="closeForm">
          <input
            ref="inputForm"
            v-model="input"
            class="px-2 py-3 text-white border-b-2 border-pink-600 outline-none w-80 bg-none focus:outline-none focus-within:outline-none"
            style="background: rgba(0, 0, 0, 0); width: calc(100% - 25px)"
            type="text" />
          <button
            type="submit"
            class="px-3 py-3 ml-3 text-pink-600 rounded-md outline-none hover:text-pink-500 focus-within:outline-none focus:outline-none"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none">
              <path d="M23.8125 21.9844L18.1406 16.3125C18 16.2188 17.8594 16.125 17.7188 16.125H17.1094C18.5625 14.4375 19.5 12.1875 19.5 9.75C19.5 4.40625 15.0938 0 9.75 0C4.35938 0 0 4.40625 0 9.75C0 15.1406 4.35938 19.5 9.75 19.5C12.1875 19.5 14.3906 18.6094 16.125 17.1562V17.7656C16.125 17.9062 16.1719 18.0469 16.2656 18.1875L21.9375 23.8594C22.1719 24.0938 22.5469 24.0938 22.7344 23.8594L23.8125 22.7812C24.0469 22.5938 24.0469 22.2188 23.8125 21.9844ZM9.75 17.25C5.57812 17.25 2.25 13.9219 2.25 9.75C2.25 5.625 5.57812 2.25 9.75 2.25C13.875 2.25 17.25 5.625 17.25 9.75C17.25 13.9219 13.875 17.25 9.75 17.25Z" fill="#DD3564" />
            </svg>
          </button>
          <button class="px-3 py-3 text-xl text-pink-600 shadow-none outline-none focus-within:outline-none focus:outline-none" @click="inputFocus">
            &#10006;
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  async fetch() {
    const { result } = await this.$axios.$get('/api/blog/public/article-tags')
    this.menus = result
  },
  data: () => ({
    view: {
      atTopOfPage: true,
    },
    inputActive: false,
    input: '',
    menus: [],
    menuVisible: false
  }),
  watch: {
    '$route'(tag) {
      console.log(tag)
    }
  },
  methods: {
    inputFocus() {
      this.inputActive = !this.inputActive

      this.$nextTick(() => {
        if (this.inputActive) {
          this.$refs.inputForm.focus()
        }
      })
    },
    isActive(url) {
      if (url === '/') {
        return this.$route.path === url
      }

      return this.$route.path.endsWith(url)
    },
    submit() {
      if (this.input.length <= 0) {
        return false
      } else {
        this.$router.push({ path: '/blogs/?search=' + this.input })
        this.inputActive = false
      }
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },

    openMenu() {
      this.menuVisible = true
    },

    closeMenu() {
      this.menuVisible = false
    },
    closeForm() {
      this.inputActive = false
    }
  }
}
</script>

