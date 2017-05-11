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
    authItem:"/auth/item",
    /****租户管理****/
    authTenant:"auth/tenant",
    tenantList:"/auth/tenant/list",  //企业列表
    tenantStatus:"/auth/tenant/status", //企业状态更新
    /****权限分配****/
    authItempck:"/auth/itempck", //操作用户组
    userList:"/auth/user/list",  //用户列表
    itempckList:"/auth/itempck/list",  //用户组列表
    menuTeant:"/auth/menu/tenant",  //租户菜单树

}
