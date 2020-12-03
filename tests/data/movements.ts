const moment = require("moment");

const test_siz = 10000;

export function getMonthDays() {
  console.log("construct month data");
  var end = new Date();
  var start = new Date();
  start.setDate(end.getDate() - 30);
  let days = [];

  let skip_cnt = 0;
  for (var day = start; day <= end; day.setDate(day.getDate() + 1)) {
    skip_cnt += 1;
    if (skip_cnt === 5) {
      continue;
    }
    let mom = moment(day);
    days.push(mom.format("YYYY-MM-DD"));
  }
  return days;
}

// key to the movements information is the object id and the train, separated by ::
export function getKeys() {
  console.log("get movement data keyset");
  var end = new Date();
  var start = new Date();
  start.setDate(end.getDate() - 30);
  let days = [];

  let skip_cnt = 0;
  for (var day = start; day <= end; day.setDate(day.getDate() + 1)) {
    skip_cnt += 1;
    if (skip_cnt === 5) {
      continue;
    }
    let mom = moment(day);
    days.push(mom.format("YYYY-MM-DD"));
  }
  return days;
}

