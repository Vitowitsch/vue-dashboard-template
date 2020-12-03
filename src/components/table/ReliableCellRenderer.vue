<template>
  <div v-show="show()">
    <span v-bind:style="{ color: color }" v-html="symbol">{{ symbol }}</span>
  </div>
</template>

<script>
export default {
  name: "OutOfOperationCellRenderer",
  data() {
    return {
      symbol: "",
      color: "",
    };
  },
  beforeMount() {
    let reliable;

    if (this.params.node.group) {
      reliable = this.params.node.aggData.reliableCol;
    } else {
      reliable = this.params.data.reliableCol;
    }
    if (1 === reliable) {
      this.symbol = "&#x2714;";
      this.color = "green";
    } else {
      this.symbol = "&#9888;";
      this.color = "orange";
    }
  },
  methods: {
    show() {
      return "origin" != this.params.node.field;
    },
  },
};
</script>
<style scoped>
span {
  font-size: 15px;
}
</style>