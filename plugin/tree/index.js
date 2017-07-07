import Tree from './tree'

const install = (Vue) => {
  Vue.component(Tree.name, Tree)
}

export default {
  version: '0.0.1',
  install
}
