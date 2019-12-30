
// 全局前置守卫拦截器
import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫，当路由发生改变时这个方法里的回调函数就会执行
router.beforeEach(function (to, from, next) {
  progress.start()// 开启进度条
  // console.log(to)
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  // setTimeout(() => progress.done(), 1000)
  progress.done()// 关闭进度条
})

// import router from '../router'
// router.beforeEach(function (to, from, next) {
//   if (to.path.startsWith('/home')) {
//     let token = window.localStorage.getItem('user-token')
//     if (token) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

// 全局前置守卫拦截器
// 引入router
// import router from '../router'
// router.beforeEach(function (to, from, next) {
//   // 判断path里面又没有以./home开头,如果有就获取token
//   if (to.path.startsWith('/home')) {
//     let token = window.localStorage.getItem('user-token')
//     if (token) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })
