import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import ru from 'element-ui/lib/locale/lang/ru-RU'
import {
  Pagination,
} from 'element-ui'

export default () => {
  locale.use(ru)
  Vue.use(Pagination)
}
