const moment = require("moment");
import forEach from "lodash/forEach";
import * as useGrouping from "@/composables/useGrouping";

export function getValues(data, group_fct) {
  let month_proportions = {};
  let grouped;
  for (const [day, value] of Object.entries(data)) {
    grouped = group_fct(value, day);
    let classes = [];
    let object_cnt;
    let keys = Object.keys(grouped).sort();
    for (let x of keys) {
      object_cnt = useGrouping.getObjects(grouped[x]).length;
      classes.push({ name: x, value: object_cnt });
    }
    month_proportions[day] = classes;
  }
  return month_proportions;
}

export function getLastXDays(data, x) {
  let ago = moment().subtract(x + 1, "days");
  let newKeys = Object.keys(data).filter(function(k) {
    let mom = moment(k, "YYYY-MM-DD");
    return mom.isAfter(ago);
  });

  let result = {};
  forEach(newKeys, (k) => {
    result[k] = data[k];
  });
  return result;
}
