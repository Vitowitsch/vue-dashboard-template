const moment = require("moment");
import _uniq from "lodash/uniq";
import _map from "lodash/map";
import { ConfigProvider } from "@/composables/cfgProvider";
import _groupBy from "lodash/groupBy";
import * as useReliability from "@/composables/useReliability";
import * as useMovements from "@/composables/useDashboardInit";

export function byOperator(data) {
  return _groupBy(data, function(o) {
    return o.op;
  });
}

export function attributeTime(o) {
  // shore side algos compute after midnight but we attribute the result to the previous day
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  if ("shore" == ConfigProvider.algo_source[o["origin"]]) {
    let tmp = new Date(o["time"]);
    tmp.setDate(tmp.getDate() - 1);
    return (
      tmp.getFullYear() +
      "-" +
      zeroPad(tmp.getMonth() + 1, 2) +
      "-" +
      zeroPad(tmp.getDate(), 2)
    );
  } else {
    return o["time"];
  }
}

export function byDay(data) {
  let mileageDate, key;
  let movements = useMovements.getMovements();
  let grouped = _groupBy(data, function(o) {
    //enrich data (in place for performance reasons)
    o["op"] = ConfigProvider.operators[o.objectid];
    o["cost"] = ConfigProvider.costs[o.origin].cost;
    o["system_function"] = ConfigProvider.costs[o.origin].system_function;
    mileageDate = useReliability.getMileageRelevantDate(new Date(o.time));
    key = o.objectid + " " + mileageDate;
    o["time"] = attributeTime(o);
    o["mileage"] = movements[key];
    return o.time.slice(0, 10);
  });
  return grouped;
}

export function byHs(data) {
  return _groupBy(data, function(o) {
    return o.value < 7 ? "available" : "not_available";
  });
}

export function byMaintainable(data) {
  return _groupBy(data, function(o) {
    if (o.value <= 3) {
      return "irrelevant";
    } else if (o["cost"] === "expensive") {
      return "expensive";
    } else {
      return "cheap";
    }
  });
}

export function byAvailable(data) {
  return _groupBy(data, function(o) {
    return o.value < 7 ? "available" : "not_available";
  });
}

export function byTrain(data) {
  return _groupBy(data, function(o) {
    return o.objectid;
  });
}

export function byTrainAndCar(data) {
  return _groupBy(data, function(o) {
    return o.objectid.concat("/", o.car);
  });
}

export function byAlgo(data) {
  return _groupBy(data, function(o) {
    return o.origin;
  });
}

export function byReliable(data) {
  return _groupBy(data, function(o) {
    return o.cost;
  });
}

export function byLevel(data) {
  return _groupBy(data, function(o) {
    let _class;
    if (!o.system_function) {
      _class = "not_safety_critical";
    } else if (10 === o.value) {
      _class = "SL_3";
    } else if (o.value <= 9 && o.value > 6) {
      _class = "SL_2";
    } else if (o.value <= 6 && o.value > 3) {
      _class = "SL_1";
    } else if (o.value <= 3 && o.value >= 1) {
      _class = "SL_0";
    } else {
      _class = "unclassified";
    }
    return _class;
  });
}

export function getObjects(data) {
  return _uniq(_map(data, "objectid"));
}
