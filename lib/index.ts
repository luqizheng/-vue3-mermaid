import { App } from 'vue'
import pager from './components/mermaid.vue';


const ex = {
    install(app: App): void {
        app.component('vue3-mermaid', pager)
    },
    mermaid: pager
}

export default ex;