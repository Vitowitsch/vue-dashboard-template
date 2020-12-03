import { axios } from "@/api/axios_wrapper.js";
import { reactive } from "@/composition";
import forEach from "lodash/forEach";

const fetch = (result, _trains, _comps, _algo, loading, newborn) => {
  loading.value = true;
  let loadedCnt = 0;
  _trains.forEach((_train) => {
    _comps.forEach((_comp) => {
      axios
        .get(process.env.VUE_APP_SERVER_PREFIX + "/history", {
          params: {
            train: _train,
            comp: _comp,
            algo: _algo,
          },
        })
        .then((response) => {
          forEach(response.data, function(element, i) {
            let key = element.valueName + " (" + _comp + ")";
            var x = {
              date: new Date(element.timeStamp),
            };
            x[_train] = parseFloat(element.value);
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
          console.log("error getting history data: " + error);
        })
        .finally(function() {
          if (_comps.length * _trains.length == ++loadedCnt) {
            loading.value = false;
          }
        });
    });
  });
};

export const useFeatureOutChart = () => {
  return { fetch };
};
