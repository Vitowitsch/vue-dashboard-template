import { axios } from "@/api/axios_wrapper.js";
import { ConfigProvider } from "@/composables/cfgProvider";
import forEach from "lodash/forEach";

function build_req(_trains, _car, _features) {
  return { train: _trains, car: _car, signals: _features };
}

const fetch = (_trains, _cars, _algo, result, loading, newborn) => {
  loading.value = true;
  var myThis = this;

  let loadedCnt = 0;
  _trains.forEach((_train) => {
    _cars.forEach((_car) => {
      var features = ConfigProvider.getInputs(_car, _algo);
      let r = build_req(_train, _car, features);
      axios
        .post(process.env.VUE_APP_SERVER_PREFIX + "/signals", r)
        .then((response) => {
          forEach(response.data, function(element, i) {
            let key = element.var + " (" + _car + ")";
            var x = {
              type: "data",
              car: "",
              date: new Date(element.ts),
            };
            x[_train] = parseFloat(element.val);
            if (!result.features[key]) {
              result.features[key] = [];
            }
            let index = 0;
            result.features[key].forEach((dataPoint) => {
              if (dataPoint.date < x.date) {
                index += 1;
              }
            });
            result.features[key].splice(index, 0, x); //charts need sort order
          });
          newborn.value = false;
        })
        .catch((error) => {
          console.log("error getting history data" + error);
        })
        .finally(function() {
          if (_cars.length * _trains.length == ++loadedCnt) {
            loading.value = false;
          }
        });
    });
  });
};

export const useFeatureInChart = () => {
  return { fetch };
};
