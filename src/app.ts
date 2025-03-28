import { createApp } from 'vue'
import { Tabbar, TabbarItem } from '@nutui/nutui-taro'
import './app.scss'

const App = createApp({
  onShow(options) {
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(Tabbar)
App.use(TabbarItem)
export default App
