<template>
  <div v-show="show()">
    <span v-html="symbol">{{ symbol }}</span>
  </div>
</template>

<script>
export default {
  name: "OutOfOperationCellRenderer",
  data() {
    return {
      symbol: "",
    };
  },
  beforeMount() {
    let moved;
    if (this.params.node.group) {
      moved = this.params.node.aggData.outOfOpCol;
    } else {
      moved = this.params.data.outOfOpCol;
    }
    if (moved === 0) {
      this.symbol = "&#x1f6d1;";
    } else if (moved === 1) {
      this.symbol = "&#x2191;&#8595;";
    }
  },
  methods: {
    show() {
      return "objectid" == this.params.node.field;
    },
  },
};
</script>
<style scoped>
.operated {
  display: inline-block;
  height: 100%;
  position: relative;
  border-style: solid;
}
</style>