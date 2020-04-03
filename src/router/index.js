import Vue from 'vue'
import Router from 'vue-router'
import PostBar from "../components/postbar/PostBar";
import ForumClass from "../components/postbar/ForumClass";
import Home from "../components/Home";
import ForumCatalogue from "../components/postbar/ForumCatalogue";
import ForumPartition from "../components/postbar/ForumPartition";
import PostInfo from "../components/postbar/PostInfo";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/postinfo',
      name: 'PostInfo',
      component: PostInfo
    },
    {
      path: '/postbar',
      name: 'PostBar',
      component: PostBar
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/forumclass',
          name: 'ForumClass',
          component: ForumClass
        },
        {
          path: '/forumcatalogue',
          name: 'ForumCatalogue',
          component: ForumCatalogue
        },
        {
          path: '/forumpartition',
          name: 'ForumPartition',
          component: ForumPartition
        }
      ]
    }
  ]
})
