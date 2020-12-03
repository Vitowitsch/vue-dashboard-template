import range from "lodash/range";
import { RamsData } from "@/model/RamsData";
const moment = require("moment");

var object_prefix = process.env.VUE_APP_OBJECT_PREFIX;

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const no_objects = 10;
const no_origins = 15;
const cars = ["PART_1", "PART_2", "PART_3", "PART_4"];

export function get() {
  console.log("get rams mock data");
  let data: RamsData[] = [];
  var now = new Date();
  var start = new Date();
  start.setDate(now.getDate() - 31);
  range(31).forEach((i) => {
    range(no_objects).forEach((i) => {
      range(no_origins).forEach((j) => {
        data.push(
          new RamsData(
            object_prefix.concat(i),
            cars[Math.floor(Math.random() * cars.length)],
            j + "_origin",
            randomDate(now, start).toISOString(),
            Math.floor(Math.random() * 10 + 1)
          )
        );
      });
    });
  });
  return data;
}

export function getOperators() {
  let ops = {};
  range(no_objects).forEach((i) => {
    let idx = object_prefix.concat(i);
    if (i % 2 === 0) {
      ops[idx] = "op1";
    } else {
      ops[idx] = "op2";
    }
  });
  return ops;
}

export function getMovements() {
  const rand_mileage = () => {
    return Math.floor(Math.random() * 1200) + 0;
  };
  let movements = {};
  let date = moment();
  range(31).forEach((i) => {
    range(no_objects).forEach((j) => {
      let key = object_prefix.concat(j, " ", date.format("YYYY-MM-DD"));
      movements[key] = rand_mileage();
    });
    date = date.subtract(1, "day");
  });
  return movements;
}

export function getCosts() {
  let cfg = {};
  range(no_origins).forEach((i) => {
    let key = i + "_origin";
    if (i % 2 === 0) {
      cfg[key] = { cost: "expensive", system_function: true };
    } else {
      cfg[key] = { cost: "cheap", system_function: false };
    }
  });
  return cfg;
}

export function getAlgoSource() {
  let algo_source = {};
  range(no_origins).forEach((i) => {
    let key = i + "_origin";
    if (i % 2 === 0) {
      algo_source[key] = "train";
    } else {
      algo_source[key] = "shore";
    }
  });
  return algo_source;
}
