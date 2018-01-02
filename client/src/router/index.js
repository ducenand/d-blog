import Vue from 'vue'
import Router from 'vue-router'

import article from '../components/article'
import index from '../components/index'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/article/:id',
      name: 'article',
      component: article
    }
  ]
})
