<template>
  <div>
    <v-tabs fixed-tabs v-model="tab">
      <v-tab>table chart</v-tab>
      <v-tab-item>
        <div
          :id="chartTag"
          style="flex: 1 1 auto; overflow: hidden; height: 400px"
        />
      </v-tab-item>
      <v-tab>input features</v-tab>
      <v-tab-item>
        <InputFeatures />
        <v-sheet>
          (Tip: To embed the
          <strong>chart</strong>
          , expand the table until a button gets visible. Click on the button.)
        </v-sheet>
      </v-tab-item>
      <v-tab>output features</v-tab>
      <v-tab-item>
        <OutputFeatures />
        <v-sheet>
          (Tip: To embed the
          <strong>chart</strong>
          , expand the table until a button gets visible. Click on the button.)
        </v-sheet>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { EventBus } from "@/api/event-bus.js";
import OutputFeatures from "@/components/charts/OutputFeatures";
import InputFeatures from "@/components/charts/InputFeatures";
import AgLineChart from "@/components/charts/AgLineChart";
import { AgChartsVue } from "ag-charts-vue";
import { ref, onMounted } from "@/composition";
export default {
  name: "ChartTab",
  components: { InputFeatures, OutputFeatures },
  props: {
    tag: { type: String, required: true },
  },
  setup(props) {
    let tab = ref(0);
    let chartTag = props.tag;
    console.log(chartTag);
    onMounted(() => {
      EventBus.$on("select_input_tab", function (train, car, algo) {
        tab.value = 1;
        setTimeout(() => {
          EventBus.$emit("input-features-clicked", train, car, algo);
        }, 50);
      });
      EventBus.$on("select_output_tab", function (train, car, algo) {
        tab.value = 2;
        setTimeout(() => {
          EventBus.$emit("output-features-clicked", train, car, algo);
        }, 50);
      });
    });
    return {
      tab,
      chartTag,
    };
  },
};
</script>