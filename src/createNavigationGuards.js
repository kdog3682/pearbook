function goHomePage(user) {

}
function createNavigationGuards(pinia) {
    const user = useUserStore(pinia)

    return function beforeEach(to, from) {
        if (to.meta.requiresAdmin && !user.isAdmin) {
            return goHomePage(user)
        }

        next()
    }
    router.beforeEach((to) => {
      // ✅ This will work make sure the correct store is used for the
      // current running app

      if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
    })
}
