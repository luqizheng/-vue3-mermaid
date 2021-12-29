import { App } from 'vue'
import pager from './components/mermaid.vue';
export * from './components/codes'
export default {

    install(app: App): void {
        app.component('vue3-mermaid', pager)
    }
}