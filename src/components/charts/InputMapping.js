// const in_map = require("../../assets/algo_inputs.json");
import { getInputSignals as getTestInputSignals } from "@/../tests/data/table_data";
const in_map = getTestInputSignals();

const thresholds = require("../../assets/thresholds.json");

function getInputs(car, algo) {
  return in_map[car][algo]["inputs"];
}

function get_thresholds(featurename) {
  return thresholds[featurename];
}
export { get, get_thresholds };
