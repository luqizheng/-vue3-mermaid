<template>
  <div ref="MermaidPanel" class="mermaid" v-html="MermaidCode"></div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, defineEmits, ref, watch, nextTick } from "vue";
import mermaid from "mermaid";
import { parseCode } from "./codes";
import { propSetting } from "./props";
const MermaidPanel = ref(null);
const MermaidCode = ref(""); //  graph TD; A-->B; A-->C; B-->D; C-->D;

const props = defineProps(propSetting);

var emits = defineEmits(["nodeClick"]);

const edit = (id: string): void => {
  emits("nodeClick", id);
};
const init = () => {
  var win = window as {
    mermaidClick: any;
  };
  win.mermaidClick = (id: string) => {
    edit(id);
  };
  var cofg = Object.assign(props.defaultConfig, props.config);

  mermaid.initialize(cofg);
};
onMounted(() => {
  init();
  buildCode();
});
const buildCode = () => {
  MermaidCode.value = parseCode(props.type, props.nodes);
  if (!MermaidCode.value) {
    return;
  }
  nextTick(() => {
    var container = MermaidPanel.value;
    if (container == null) throw Error("No container");
    container.removeAttribute("data-processed");
    mermaid.init(MermaidCode.value, container);
  });
};

watch(
  () => props.nodes,
  (state) => {
    buildCode();
  },
  { deep: true }
);
</script>
