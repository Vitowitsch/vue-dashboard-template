import * as useGrouping from "@/composables/useGrouping";
import * as useReliability from "@/composables/useReliability";

export const selectItems = {
  all: "Overview",
  availability: "Availabilty",
  reliability: "Reliability",
  maintainability: "Maintainability",
  safety: "Safety",
};

export const calenderClasses = {
  Availabilty: ["available", "not_available"],
  Maintainability: ["maintainable", "not_maintainable"],
  Safety: ["safe", "unsafe"],
};

export const description = {
  Reliability: "Reliable := Expected number of computation results",
  Availabilty: "Available := Train has Health State < 7",
  Maintainability: "Maintainable := HS > 3 and expensive in maintenance",
  Safety:
    "Safety Levels:=  SL_0: (1 <= HS <=3) / SL_1: 3 < HS <= 6 / SL_2: 6 < HS <= 9 / SL_3: HS == 10",
};

export const group_fcts = {
  Reliability: [
    useReliability.getClassification,
    useGrouping.byOperator,
    useGrouping.byTrain,
  ],
  Availabilty: [
    useGrouping.byAvailable,
    useGrouping.byOperator,
    useGrouping.byTrain,
    useGrouping.byAlgo,
  ],
  Maintainability: [
    useGrouping.byMaintainable,
    useGrouping.byOperator,
    useGrouping.byTrain,
    useGrouping.byAlgo,
  ],
  Safety: [
    useGrouping.byLevel,
    useGrouping.byOperator,
    useGrouping.byTrain,
    useGrouping.byAlgo,
  ],
};
