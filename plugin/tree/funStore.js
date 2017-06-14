var changeCheckStatus = (node, treedata) => {
    var menus = new Map()
    eachAllChild(treedata, item => {
        menus.set(item.id, item)
    })

    var _changeUp = node => {
        if (node.checked) {
            if (node.parentId != 2) {
                let parent = menus.get(node.parentId)
                parent.checked = true
                _changeUp(parent)
            }
        } else {
            if (node.parentId != 2) {
                let parent = menus.get(node.parentId)
                var childrenCheck = []
                for(let bro of parent.childrens){
                    if(bro.checked){
                        childrenCheck.push(bro.id)
                    }
                }
                if(childrenCheck.length === 0){
                    parent.checked = false
                    _changeUp(parent)
                }
            }
        }
    }
    var _changeDown = node => {
        if (node.childrens && node.childrens.length > 0) {
            node.childrens.map(item => {
                item.checked = node.checked
                _changeDown(item)
            })
        }
    }
    _changeUp(node)
    _changeDown(node)
}

function eachAllChild(srcNode, callback) {
    srcNode.map(item => {
        callback(item);
        if (item.childrens.length > 0) {
            eachAllChild(item.childrens, callback);
        }
    })
}

var allCheckStatus = (node, treedata) => {
    var menus = new Map()
    eachAllChild(treedata, item => {
        menus.set(item.id, item)
    })

    var _changeUp = node => {
        if (node.checked) {
            if (node.parentId != 2) {
                let parent = menus.get(node.parentId)
                var childrenCheck = []
                for(let bro of parent.childrens){
                    if(bro.checked){
                        childrenCheck.push(bro.id)
                    }
                }
                if(childrenCheck.length == parent.childrens.length ){
                    parent.checked = true
                    _changeUp(parent)
                }
            }
        } else {
            if (node.parentId != 2) {
                let parent = menus.get(node.parentId)
                parent.checked = false
                _changeUp(parent)
            }
        }
    }
    var _changeDown = node => {
        if (node.childrens && node.childrens.length > 0) {
            node.childrens.map(item => {
                item.checked = node.checked
                _changeDown(item)
            })
        }
    }
    _changeUp(node)
    _changeDown(node)
}
export {
    changeCheckStatus,
    eachAllChild,
    allCheckStatus
}
