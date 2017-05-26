
function convertTreedata(data, checkdata, itemPcks, components) {
    components = components || []
    itemPcks = itemPcks || []
    if (data.length) {
        data.map((item, index) => {
            components[index] = {
                id: item.id,
                title: item.name,
                disableCheckbox: checkdata,
            }

            itemPcks.map(itempck => {
                if (itempck == item.id) {
                    // console.log(item)
                    components[index].title = `<span style="color:#23b7e5">${item.name}</span>`,
                    components[index].checked = true
                }
            })
            if (item.childrens.length) {
                components[index].expand = true
                components[index].children = convertTreedata(item.childrens, checkdata, itemPcks, components[index].children)
            }
        })
    }
    return components
}

function findComponentsDownward(context, componentName, components = []) {
    const childrens = context.$children;
    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            const childs = child.$children;

            if (name === componentName) {
                // console.log(child.$options.name,child.data.checked)
                if (child.data.checked) {
                    components.push(child.data.id);
                } else {
                    if (child.indeterminate) {
                        components.push(child.data.id);
                    }
                }
            }
            if (childs.length) {
                const findChilds = findComponentsDownward(child, componentName, components);
                if (findChilds) components.concat(findChilds);
            }
        });
    }
    return components;
}


function filtrate(itemlist, itemFilter,type) {
    var CurrentArray = [];
    if (itemlist.length > 0 && itemFilter != "") {
        var searchRegex = new RegExp(itemFilter, 'i');
        for (var item of itemlist) {
            if (searchRegex.test(item[type])) {
                CurrentArray.push(item)
            }
        }
        return CurrentArray
    } else {
        return itemlist
    }
}

export {
    filtrate,
    convertTreedata,
    findComponentsDownward
}
