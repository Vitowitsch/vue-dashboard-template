import * as useGrouping from "@/composables/useGrouping";
import { ConfigProvider } from "@/composables/cfgProvider";
import underScoreFilter from "lodash/filter";

export const costs = {
  expensive: "expensive",
  cheap: "cheap",
};

export const time_condition = (_date) => {
  return (o) => {
    return o.time.substring(0, 10) === _date;
  };
};

let calendarStart = new Date();
const calendarEnd = new Date();
calendarStart.setMonth(calendarEnd.getMonth() - 1);
const calendarStartTime = calendarStart.getTime();
const calendarEndTime = calendarEnd.getTime();

export const last_month_condition = (o) => {
  let objTime = new Date(o.time).getTime();
  return objTime >= calendarStartTime && objTime <= calendarEndTime;
};

export const cost_condition = (_cost) => {
  return (o) => {
    return ConfigProvider.costs[o.origin].cost === _cost && parseInt(o.value) > 3;
  };
};

export const hs_condition = (o) => {
  return o.value < 7;
};

export function preprocess(data) {
  let grouped = useGrouping.byDay(data);
  let keys = Object.keys(grouped);
  let lastKey = keys[keys.length - 1];
  delete grouped[lastKey]; // the first day is incomplete due to the sql query, so we remove it
  return grouped;
}

export function filter(data, conditions) {
  return underScoreFilter(data, function(o) {
    for (let i = 0; i < conditions.length; i++) {
      if (!conditions[i](o)) return false;
    }
    return true;
  });
}
