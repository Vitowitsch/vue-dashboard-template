import range from "lodash/range";
const moment = require("moment");
var faker = require("faker");

export function mock_inputs() {
  console.log("mock inputs");
  let i = [];
  let fakedata = [];
  let now = moment();
  range(10).forEach((j) => {
    fakedata.push(faker.name.firstName());
  });
  range(1000).forEach((j) => {
    i.push({
      car: "",
      var: fakedata[j % 10],
      val: Math.random(),
      ts: now.subtract(1, "days").format("YYYY-MM-DD"),
    });
  });
  return i;
}

export function mock_outputs() {
  console.log("mock outputs");
  let i = [];
  let now = moment();
  let fakedata = [];
  range(10).forEach((j) => {
    fakedata.push(faker.name.firstName());
  });
  range(1000).forEach((j) => {
    i.push({
      train: "object_" + j,
      component: fakedata[j % 10],
      algo: fakedata[j % 10],
      value: Math.random(),
      valueName: fakedata[j % 10],
      timeStamp: now.subtract(1, "days").format("YYYY-MM-DD"),
    });
  });
  return i;
}
