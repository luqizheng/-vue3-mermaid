<template>
  <div ref="MermaidPanel"></div>
</template>
<script lang="ts" setup>
declare global {
  interface Window {
    [key: string]: any;
  }
}
function getUuid(): string {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36);
}

import { onMounted, defineEmits, ref, watch, nextTick, onUnmounted } from "vue";
import mermaidAPI from "mermaid/mermaidAPI";
import mermaid from "mermaid";
import { parseCode } from "./codes";
import { propSetting } from "../props";
const MermaidPanel = ref(null);
const MermaidCode = ref(""); //  graph TD; A-->B; A-->C; B-->D; C-->D;

const props = defineProps(propSetting);
const elementID = ref(getUuid());
const functionName = `node_click_${elementID.value}`;
var emits = defineEmits(["nodeClick"]);

const initMermaid = () => {
  window[functionName] = (id: string) => {
    emits("nodeClick", id);
  };
  const config = Object.assign(
    props.defaultConfig,
    props.config
  ) as mermaidAPI.Config;

  mermaid.mermaidAPI.initialize(config);
};
onMounted(() => {
  initMermaid();
  buildCode();
});
onUnmounted(() => {
  window[functionName] = undefined;
});
const buildCode = () => {
  MermaidCode.value = parseCode(props.type, props.nodes, [], functionName);
  if (!MermaidCode.value) {
    return;
  }

  nextTick(() => {
    mermaid.mermaidAPI.render(
      "mermaid" + elementID.value,
      MermaidCode.value,
      (svg: any, bindFunction: any) => {
        if (MermaidPanel.value === null) return;
        var node = MermaidPanel.value as HTMLElement;
        node.innerHTML = svg;
        bindFunction(node);
      }
    );
  });
};

watch(
  () => props.nodes,
  () => {
    buildCode();
  },
  { deep: true }
);
</script>
