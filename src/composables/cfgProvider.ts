import {
  getOperators as getTestOperators,
  getCosts as getTestCosts,
  getAlgoSource as getTestAlgoSource,
} from "@/../tests/data/ramsData";
import {
  getInputSignals as getTestInputSignals,
  getThresholds as getTestThresholds,
} from "@/../tests/data/table_data";

export class ConfigProvider {
  static costs;
  static operators;
  static expected_outcome;
  static in_map;
  static thresholds;
  static algo_source;
  static get_expected_outs;

  static async initialize() {
    if ("true" == process.env.VUE_APP_MOCK) {
      ConfigProvider.operators = getTestOperators();
      ConfigProvider.costs = getTestCosts();
      ConfigProvider.algo_source = getTestAlgoSource();
      ConfigProvider.get_expected_by_object = () => {
        return Math.floor(Math.random() * 100);
      };
      ConfigProvider.get_expected_outs = (algo, diagId) => {
        return Math.floor(Math.random() * Math.floor(2));
      };
      ConfigProvider.in_map = getTestInputSignals();
      ConfigProvider.thresholds = getTestThresholds();
    } else {
      ConfigProvider.in_map = require("@/assets/config/algo_inputs.json");
      ConfigProvider.operators = require("@/assets/config/operator_mapping.json");
      ConfigProvider.costs = require("@/assets/config/costs_mapping.json");
      ConfigProvider.thresholds = require("@/assets/config/thresholds.json");
      ConfigProvider.algo_source = require("@/assets/config/algo_source.json");
      // TODO replace with restcall to /expectancy
      ConfigProvider.expected_outcome = require("@/assets/config/expected_outcome.json");
      ConfigProvider.get_expected_outs = (algo, diagid) => {
        let keys = diagid.split(".");
        if (diagid.includes("BOGIE.ALL")) {
          keys = keys.join("-").split("-");
          return this.expected_outcome[algo]["expected"][keys[0]][keys[1]].n;
        }
        return this.expected_outcome[algo]["expected"][keys[0]][keys[1]][keys[2]].n;
      };
    }
  }

  public static getInputs(car, algo) {
    return ConfigProvider.in_map[car][algo]["inputs"];
  }

  public static get_expected_by_object(origins: Set<String>) {
    let sum = 0;
    for (const [key, value] of Object.entries(this.expected_outcome)) {
      if (origins.has(key)) {
        sum += value["expected"]["n"];
      }
    }
    return sum;
  }
}
ConfigProvider.initialize();
