import { EventBus } from "@/api/event-bus.js";

export default function useCtxMenu(params) {
  var result = [
    {
      name: "output features",
      action: function() {
        EventBus.$emit(
          "out-features-clicked",
          params.node.allLeafChildren[0].data.objectid,
          params.node.allLeafChildren[0].data.diagid,
          params.node.allLeafChildren[0].data.origin
        );
      },
      disabled: params.node.field != "diagid"
    },
    {
      name: "input features",
      action: function() {
        EventBus.$emit(
          "in-features-clicked",
          params.node.allLeafChildren[0].data.objectid,
          params.node.allLeafChildren[0].data.carnumber,
          params.node.allLeafChildren[0].data.origin
        );
      },
      disabled: params.node.field != "origin"
    },
    "chartRange",
    "pivotChart"
  ];
  return result;
}
