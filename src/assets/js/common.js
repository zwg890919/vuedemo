
function convertTreedata(data, itemPcks, components) {
    components = components || []
    itemPcks = itemPcks || []
    if (data.length) {
        data.map((item, index) => {
            components[index] = {
                title: item.name,
                disableCheckbox: true,
            }

            itemPcks.map(itempck => {
                if(itempck == item.id){
                    components[index].title= `<span style="color:#23b7e5">${item.name}</span>`,
                    components[index].checked = true
                }
            })
            if (item.childrens.length) {
                components[index].expand = true
                components[index].children = convertTreedata(item.childrens,itemPcks, components[index].children)
            }
        })
    }
    return components
}

export default {
    convertTreedata
}
