import { App } from 'vue'
import pager from './components/mermaid.vue';
pager.install = (app: App): void => {
    app.component('vue3-mermaid', pager)
}

export default pager;