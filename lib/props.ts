import { MermaidConfig } from "mermaid";
import { PropType } from "vue";
import { AlignType, IMermaidNode } from "./types";
export const propSetting = {
  type: {
    type: Number as PropType<AlignType>,
    default: 0,
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
    type: Object as PropType<MermaidConfig>,
    default(): any {
      return {} as MermaidConfig;
    },
  },
  defaultConfig: {
    type: Object as PropType<MermaidConfig>,
    default(): any {
      return {
        //theme: "default",
        //startOnLoad: true,
        securityLevel: "loose",
      } as MermaidConfig;
    },
  },
  stopOnError: {
    type: Boolean,
    default: false,
  },
};
