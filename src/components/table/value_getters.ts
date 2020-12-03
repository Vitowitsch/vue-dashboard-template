import { isUpToDate } from "@/composables/tableData";

export function outOfOpValueGetter(params) {
  if (!params.node.group) {
    return params.data.mileage > process.env.VUE_APP_MILEAGE_THRESHOLD ? 1 : 0;
  }
}

export function mileageValueGetter(params) {
  if (!params.node.group) {
    return params.data.mileage;
  }
}

export function ofLatest(params) {
  if (!params.node.group) {
    let lastResultTime = params.data.lastResultTime;
    if (null != lastResultTime) {
      return isUpToDate(new Date(lastResultTime)) ? 1 : 0;
    } else {
      return 0;
    }
  }
}

export function availableValueGetter(params) {
  return ofLatest(params);
}

export function expectedValueGetter(params) {
  let lastResultTime = params.data.lastResultTime;
  if (null != lastResultTime) {
    return 1;
  }
}

export function identityAggFunc(values) {
  return values[0];
}

export function maxHSValueGetter(params) {
  if (!params.node.group) {
    if (ofLatest(params)) {
      return params.data.lastResult_HS;
    } else {
      return "";
    }
  }
}

export function reliableValueGetter(params) {
  let reliable;
  if (params.node.group) {
    reliable =
      params.node.aggData.expected_cnt === params.node.aggData.available_cnt ||
      0 === params.node.aggData.mileageCol;
  } else {
    reliable =
      availableValueGetter(params) == expectedValueGetter(params) ||
      0 === outOfOpValueGetter(params);
  }
  return reliable ? 1 : 0;
}

export function percentageValueGetter(params) {
  var numerator;
  var denominator;
  if (params.node.group) {
    numerator = params.node.aggData.available_cnt;
    denominator = params.node.aggData.expected_cnt;
  } else {
    numerator = ofLatest(params);
    denominator = 1;
  }
  let percentage;
  try {
    percentage = Math.round(100 * (numerator / denominator));
  } catch (e) {
    console.log("%o: %d / %d", e, numerator, denominator);
  }
  return percentage;
}
