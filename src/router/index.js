import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

let routes = [{
  path: '/',
  name: 'Hello',
  component: Hello
}];

for (let i = 0; i < global.menu.length; i++) {
  let m = global.menu[i];
  for (let j = 0; j < m.children.length; j++) {
    let c = m.children[j];
    routes.push({
      path: c.router,
      name: c.label,
      component: require('@/components' + c.router)
    });
  }
}

console.log(routes);
export default new Router({
  routes: routes
})
