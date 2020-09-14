import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
Vue.use(VueRouter)

// 

const router = new VueRouter({
  routes
})

export default router
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}