
const routes = [
  {
    path: '/',
    component: () => import('layouts/patternLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/game',
    component: () => import('layouts/patternLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Game.vue') }
    ]
  },
  {
    path: '/endGame',
    component: () => import('layouts/patternLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EndGame.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
