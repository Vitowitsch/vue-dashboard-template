import range from "lodash/range";

const no_signals = 20;

function get_mock_data() {
  console.log("health history mock");
  var result = {};
  range(no_signals).forEach((i) => {
    let _date = moment().subtract(i, "days");
    let name = `signal_${i}`;
    var x = {
      date: _date,
      value: Math.floor(Math.random() * Math.floor(11)),
    };
    if (!result[name]) {
      result[name] = [];
    }
    result[name].push(x);
  });
  return result;
}

export default get_mock_data;
