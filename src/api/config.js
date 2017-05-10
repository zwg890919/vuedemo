module.exports = {
    api: 'http://localhost:8083/api',

    timeout: 30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    getToken: "/dologin",
    getMenu: "/auth/menu/user?pageid=10011",

    /****全局菜单****/
    globalMenu: "/auth/menu/global",
    itemList:"/auth/item/list",
    authMenu:"/auth/menu",
    authItem:"/auth/item"
}
