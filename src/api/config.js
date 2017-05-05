module.exports = {
  api: 'http://localhost:8083/api',

  timeout: 30000,
  headers: {
    //Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  getToken: "/dologin",
  getMenu: "/auth/menu/user?pageid=10011",

  /****全局菜单****/
  globalMenu: "/auth/menu/global"
}
