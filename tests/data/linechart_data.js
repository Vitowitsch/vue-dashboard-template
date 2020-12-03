import forEach from "lodash/forEach";

var start = new Date(2020, 3, 15);
var end = new Date(2020, 4, 13);

function random_data(keys) {
  console.log("linechart random data");
  var result = {};
  forEach(keys, function(k) {
    var x = {
      date: randomDate(start, end),
      value: getRandomArbitrary(0, 1),
    };
    if (!result[k]) {
      result[k] = [];
    }
    result[k].push(x);
  });
  return result;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export default random_data;
