import Vue from 'vue'

const installFn = require.context('./', true, /\.vue$/)

export default installFn.keys().forEach(k => {
    const component = installFn(k).default
    Vue.component(component.name, component)
});
