<template>
  {{ graph }}
  <button type="button" @click="change(1)">Demo1</button>
  <button type="button" @click="change(2)">Demo2</button>
  <button type="button" @click="switchRender()">asdf</button>
  <vue3-mermaid :nodes="data" @node-click="nodeClick" :type="graph" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { EdgeType, IMermaidNode } from "../lib/types";
const data1 = [
  {
    id: "1",
    text: "A",
    link: "---",
    next: ["2"],
    editable: true,
    style: "fill:#f9f,stroke:#333,stroke-width:4px",
  } as IMermaidNode,
  {
    id: "2",
    text: "B",
    edgeType: EdgeType.circle,
    editable: true,
    next: ["3"],
  } as IMermaidNode,
  { id: "3", text: "C", next: ["4", "6"] } as IMermaidNode,
  {
    id: "4",
    text: "D",
    link: "-- This is the text ---",
    next: ["5"],
  } as IMermaidNode,
  { id: "5", text: "E" } as IMermaidNode,
  { id: "6", text: "F" } as IMermaidNode,
];
const data2 = [
  {
    id: "1",
    text: "AA",
    link: "---",
    next: ["2"],
    editable: true,
    style: "fill:#f9f,stroke:#333,stroke-width:4px",
  } as IMermaidNode,
  {
    id: "2",
    text: "BB",
    edgeType: EdgeType.circle,
    next: ["3"],
  } as IMermaidNode,
  { id: "3", text: "CC", next: ["4", "6"] },
  {
    id: "4",
    text: "DD",
    link: "-- This is the text ---",
    next: ["5"],
  } as IMermaidNode,
  { id: "5", text: "EE" } as IMermaidNode,
  { id: "6", text: "FF" } as IMermaidNode,
];
export default defineComponent({
  name: "App",
  setup() {
    const graph = ref(1);
    var a: any = null;
    let data = ref(a);
    data.value = data1;
    const change = (t: number) => {
      if (t == 1) {
        data.value = data1;
      } else if (t == 2) {
        data.value = data2;
      }
    };
    const nodeClick = (id: any) => {
      alert(id);
    };
    const switchRender = () => {
    
      var index = graph.value + 1;
      if (index > 4) {
        index = 0;
      }
      graph.value = index;
    };
    return { data, change, nodeClick, graph, switchRender };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
