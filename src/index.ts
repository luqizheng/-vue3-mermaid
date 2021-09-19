import { App } from 'vue'
import pager from './components/index.vue';
export {MermaidNode,AlignType} from './components/codes'
export default {

    install(app: App): void {
        app.component('vue3-mermaid', pager)
    }
}