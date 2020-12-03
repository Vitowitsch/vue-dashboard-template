<template>
  <div v-show="isLoaded()">
    <v-data-iterator
      :items="Object.keys(iterData.features)"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item" cols="12" md="6">
            <v-card>
              <AgLineChart
                :chartData="iterData.features[item]"
                :trains="iterData.trains"
                :title="item"
              />
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <center>
          <v-row class="mt-2" align="center" justify="center">
            <span class="mr-4 grey--text"
              >Page {{ page }} of {{ numberOfPages }}</span
            >
            <v-btn fab dark color="teal" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab dark color="teal" class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn
              rounded
              color="#009999"
              text
              v-on:click="resetSelection()"
              class="btn btn-primary"
              >reset selection</v-btn
            >
            <v-sheet
              >(Tip: click on the legend to display the thresholds)</v-sheet
            >
          </v-row>
        </center>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import AgLineChart from "./AgLineChart";
import _isEmpty from "lodash/isEmpty";
import { reactive, computed, ref, watchEffect } from "@/composition";
export default {
  components: {
    AgLineChart,
  },
  props: {
    data: { type: Object, required: true },
  },

  setup(props) {
    var page = ref(1);
    let itemsPerPage = ref(2);
    let iterData = reactive(props.data);

    const nextPage = () => {
      if (page.value + 1 <= numberOfPages.value) page.value += 1;
    };

    const formerPage = () => {
      if (page.value - 1 >= 1) page.value -= 1;
    };

    const numberOfPages = computed(() =>
      Math.ceil(Object.keys(iterData.features).length / itemsPerPage.value)
    );

    const resetSelection = () => {
      Object.assign(iterData, { features: {}, trains: {} });
    };

    const isLoaded = () => {
      return !_isEmpty(Object.keys(iterData.features));
    };

    return {
      page,
      nextPage,
      formerPage,
      numberOfPages,
      itemsPerPage,
      resetSelection,
      iterData,
      isLoaded,
    };
  },
};
</script>