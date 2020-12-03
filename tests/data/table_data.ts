import range from "lodash/range";
import { TableData } from "@/model/TableData";
const moment = require("moment");

var object_prefix = process.env.VUE_APP_OBJECT_PREFIX;
var subobject_prefix = "sub_";

const no_objects = 10;
const no_origins = 15;
const no_cars = 4;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getResultTime(i, j, c) {
  let time = moment();
  if (i === 1 && 0 === c % 2) {
    time = time.subtract(getRandomInt(5), "days");
  } else if (i === 2 && j != 2) {
    time = time.subtract(1, "days");
  } else if (i === 5 && (c == 1 || c == 3)) {
    time = time.subtract(1, "days");
  }
  return time.format("YYYY-MM-DD");
}

export function get() {
  console.log("get table mock data");
  let data: TableData[] = [];
  range(no_objects).forEach((i) => {
    range(no_origins).forEach((j) => {
      range(no_cars).forEach((c) => {
        let carNo = subobject_prefix + c;
        let module = "12";
        let submobule = "12";
        let component = j + "_origin";
        let diagid = `${carNo}.${module}.${submobule}.MODULE.${component}`;
        let time = getResultTime(i, j, c);
        let comp = data.push(
          new TableData(
            object_prefix.concat(i),
            component,
            carNo,
            module,
            submobule,
            component,
            diagid,
            getRandomInt(11),
            time,
            time
          )
        );
      });
    });
  });
  return data;
}

export function getInputSignals() {
  console.log("get input signals mock data");
  let mapping = {};
  range(no_cars).forEach((car) => {
    let car_key = subobject_prefix + car;
    mapping[car_key] = {};
    range(no_origins).forEach((algo) => {
      let key = algo + "_origin";
      mapping[car_key][key] = {
        inputs: ["a", "b", "c", "d"],
        outputs: ["e", "f", "g"],
      };
    });
  });
  return mapping;
}

export function getThresholds() {
  return {
    a: [0.5, 1.1, 1.1],
    b: [0.5, 1.1, 1.1],
    c: [0.5, 1.1, 1.1],
    d: [0.5, 1.1, 1.1],
  };
}
