<template>
  <v-navigation-drawer app width="60">
    <v-list nav dense>
      <v-list expand nav>
        <div />
        <template v-for="(item, i) in items">
          <Item :key="`item-${i}`" :item="item" />
        </template>
        <div />
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Item from "@/components/base/Item.vue";
export default {
  components: {
    Item,
  },
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      items: [
        {
          title: "/",
          // icon: "mdi-view-dashboard",
          to: "/",
        },
        {
          title: "1",
          // icon: "mdi-view-comfy",
          to: "/traintable",
        },
        {
          title: "2",
          // icon: "mdi-grid",
          to: "/algotable",
        },
        {
          title: "3",
          // icon: "mdi-grid",
          to: "/heatmap",
        },
        {
          title: "4",
          // icon: "mdi-view-comfy",
          to: "/metrics",
        },
      ],
    };
  },
};
</script>
<style lang="sass" scoped>
.logo-mini
  float: left
  width: 30px
  text-align: center
  margin-left: 7px
  margin-right: 15px
</style>

