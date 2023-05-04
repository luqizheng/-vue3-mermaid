<template>
  <div ref="MermaidPanel" v-html="svgCode"></div>
</template>

<script lang="ts">
declare global {
  interface Window {
    [key: string]: any;
  }
}
</script>

<script lang="ts" setup>
import { onMounted, ref, watch, nextTick, onUnmounted } from "vue";
import mermaid, { MermaidConfig } from "mermaid";
import { parseCode } from "./codes";
import { propSetting } from "../props";

function getUuid(): string {
  return Number(
    Math.random().toString().substring(3, length) + Date.now()
  ).toString(36);
}

const MermaidPanel = ref(null);
const svgCode = ref(""); //svg-code

const props = defineProps(propSetting);
const elementID = ref(getUuid());
const functionName = `node_click_${elementID.value}`;
var emits = defineEmits(["nodeClick"]);

const initMermaid = () => {
  window[functionName] = function (id: string) {
    emits("nodeClick", id);
  };
  const config = Object.assign(
    props.defaultConfig || {},
    props.config
  ) as MermaidConfig

  mermaid.mermaidAPI.initialize(config);
};
onMounted(() => {
  initMermaid();
  buildCode();
});
onUnmounted(() => {
  window[functionName] = undefined;
});
const buildCode = async () => {
  const mermaidCodes = parseCode(props.type, props.nodes, [], functionName);
  const { svg } = await mermaid.render('graphDiv', mermaidCodes);
  svgCode.value = svg;

};


watch(
  () => props.type,
  () => buildCode()
);
watch(
  () => props.nodes,
  () => {
    buildCode();
  },
  { deep: true }
);
</script>
