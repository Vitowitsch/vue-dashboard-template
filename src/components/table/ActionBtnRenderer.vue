<template>
  <span>
    <v-btn small outlined color="teal"
      v-on:click="showFeatures(eventname_show_input)"
      v-show="showButton()"
    >inputs</v-btn>

    <v-btn small outlined color="teal"
      v-on:click="showFeatures(eventname_show_output)"
      v-show="showButton()"
    >outputs</v-btn>
  </span>
</template>

<script>
import Vue from "vue";
import { EventBus } from "@/api/event-bus.js";

export default Vue.extend({
  data: function () {
    return {
      table: "",
      eventname_show_input: "select_input_tab",
      eventname_show_output: "select_output_tab",
    };
  },
  methods: {
    invokeParentMethod() {
      this.params.context.componentParent.methodFromParent(
        `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
      );
    },
    showFeatures(eventname) {
      if (this.table == "traintable") {
        let train = [this.params.node.data.objectid];
        let algo = this.params.node.data.origin;
        if (eventname == this.eventname_show_output) {
          let diagid = [this.params.node.data.diagid];
          this.handleShowTrainOutputs(train, diagid, algo);
        }
        if (eventname == this.eventname_show_input) {
          let car = [this.params.node.data.carnumber];
          this.handleShowTrainInputs(train, car, algo);
        }
      } else if (this.table == "algotable") {
        let train = [this.params.node.allLeafChildren[0].data.objectid];
        let algo = this.params.node.allLeafChildren[0].data.origin;
        if (eventname == this.eventname_show_input) {
          let cars = [];
          this.params.node.allLeafChildren.forEach((elem) => {
            cars.push(elem.data.carnumber);
          });
          let uniqueCars = [...new Set(cars)].sort();
          this.handleShowAlgoInputs(train, uniqueCars, algo);
        } else if (eventname == this.eventname_show_output) {
          let diagids = [];
          this.params.node.allLeafChildren.forEach((elem) => {
            diagids.push(elem.data.diagid);
          });
          this.handleShowAlgoOutputs(train, diagids, algo);
        }
      }
    },
    handleShowTrainInputs(train, car, algo) {
      EventBus.$emit(this.eventname_show_input, train, car, algo);
    },
    handleShowTrainOutputs(train, diagid, algo) {
      EventBus.$emit(this.eventname_show_output, train, diagid, algo);
    },
    handleShowAlgoInputs(train, cars, algo) {
      EventBus.$emit(this.eventname_show_input, train, cars, algo);
    },
    handleShowAlgoOutputs(train, diagids, algo) {
      EventBus.$emit(this.eventname_show_output, train, diagids, algo);
    },
    determineScope() {
      if (this.$parent.$parent.$parent.$vnode.tag.includes("TrainTable")) {
        this.table = "traintable";
      } else {
        this.table = "algotable";
      }
    },
    showButton() {
      this.determineScope();
      if ("algotable" == this.table) {
        return "objectid" == this.params.node.field;
      } else if ("traintable" == this.table) {
        return undefined == this.params.node.field;
      }
    },
  },
});
</script>