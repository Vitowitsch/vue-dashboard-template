import { _ } from "ag-grid-community";
import * as useGrouping from "@/composables/useGrouping";

export function update(title, subtitle, data, ops, day) {
  let options = {
    tooltip: {
      trigger: "item",
    },
  };

  let showOnlyPie = ops.length === 1;
  options.title = {
    text: title,
    subtext: subtitle,
    left: "center",
  };

  var sunburst_data = getData(data, ops, day);

  options.series = [];

  let label_pos = showOnlyPie ? "inside" : "inside";

  options.series.push({
    label: {
      show: true,
      position: label_pos,
    },
    sort: function(nodeA, nodeB) {
      if (nodeA.name < nodeB.name) {
        return -1;
      }
      if (nodeA.name > nodeB.name) {
        return 1;
      }
      return 0;
    },
    zlevel: 2,
    type: "sunburst",
    highlightPolicy: "ancestor",
    levels: getLevels(showOnlyPie),
    data: sunburst_data,
    renderLabelForZeroData: true,
  });
  return options;
}

function getLevels(showOnlyPie) {
  if (showOnlyPie) {
    return [
      {},
      {
        r0: "40%",
        r: "50%",
      },
    ];
  }
  return [
    {},
    {
      r0: "15%",
      r: "35%",
      itemStyle: { borderWidth: 2 },
      label: { rotate: "tangential" },
    },
    { r0: "35%", r: "70%", label: { align: "right" } },
    {
      r0: "70%",
      r: "85%",
      itemStyle: { borderWidth: 3 },
    },
    {
      r0: "85%",
      r: "87%",
      label: {
        position: "outside",
        padding: 3,
        silent: true,
        show: false,
      },
      itemStyle: { borderWidth: 3 },
    },
  ];
}

export function getData(input, ops, day) {
  let op = ops.shift();
  let grouped = op(input, day);

  let entries = [];
  Object.entries(grouped).forEach(([x, y], index) => {
    let entry;
    let object_cnt = useGrouping.getObjects(y).length;
    if (0 === ops.length) {
      let val = y.length;
      entry = {
        name: x,
        value: object_cnt,
      };
    } else {
      let subtree = getData(y, ops.slice(), day);
      entry = {
        name: x,
        children: subtree,
        value: object_cnt,
      };
    }
    entries.push(entry);
  });
  return entries;
}
