import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//  登录的要求：通过点击按钮判断是否登录，未登录就带上？redirect=当前页面的参数进入登录页面
// 登录成功后需要通过这个参数返回到之前的页面
export default new Vuex.Store({
  state: {
    user: {
      userId: 100010, //这里要小心判断是字符串还是数字，用数字，不然发送请求给后端得格式化
      username: '',//       username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
      // 其他需要保存的用户信息
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
    //       window.localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
