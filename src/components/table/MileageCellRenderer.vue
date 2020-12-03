<template>
  <div v-show="show()">
    <span v-html="mileage">{{ mileage }}</span>
  </div>
</template>

<script>
export default {
  name: "MileageCellRenderer",
  data() {
    return {
      mileage: "",
    };
  },
  beforeMount() {
    if (this.params.node.group) {
      this.mileage = this.params.node.aggData.mileageCol;
    } else {
      this.mileage = this.params.data.mileageCol;
    }
  },
  methods: {
    show() {
      return "objectid" == this.params.node.field;
    },
  },
};
</script>