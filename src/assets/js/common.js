
function convertTreedata(data, components, level) {
    components = components || []
    level = level || 1
    if (data.length) {
        data.map((item, index) => {
            components[index] = {
                title: item.name,
                disableCheckbox: true,
                checked: true,
            }
            if (item.childrens.length) {
                // components[index].expand = true
                components[index].children = convertTreedata(item.childrens, components[index].children)
            }
        })
    }
    return components
}

export default {
    convertTreedata
}
