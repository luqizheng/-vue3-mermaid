
import { PropType } from 'vue'
import { AlignType, IMermaidNode } from '../types';
export const propSetting = {
    type: {
        type: Number as PropType<AlignType>,
        default: 0
    },
    nodes: {
        type: Array as PropType<Array<IMermaidNode>>,
        required: true,
        default: (): Array<IMermaidNode> => {
            return [];
        },
    },
    styles: {
        type: Array as PropType<Array<string>>,
        default: (): Array<string> => {
            return [];
        },
    },
    config: {
        type: Object,
        default(): any {
            return {};
        },
    },
    defaultConfig: {
        type: Object,
        default(): any {
            return { theme: "default", startOnLoad: true, securityLevel: "loose" };
        },
    },
    stopOnError: {
        type: Boolean,
        default: false,
    }
}

