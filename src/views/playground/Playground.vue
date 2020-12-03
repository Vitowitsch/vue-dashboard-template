<template>
  <div>
    <svg viewBox="0 0 210 297" height="297mm" width="210mm">
      <g id="spin" :transform="transformation">
        <path
          fill="#6495ed"
          d="m1152 527.1l-197 5.5 2.6 18.1-7.5-17.6-138.7 4.1-1.8 6.6 92.8 6.4s11.1 16 37.7 11.8c26.5-4.3 211.9-34.9 211.9-34.9z"
        ></path>
        <circle cx="930" stroke="#6495ed" cy="550" r="6" fill="yellow"></circle>
        <circle stroke="#6495ed" stroke-width="6" cy="540" cx="786" r="26" fill="none"></circle>
        <rect
          ry="0"
          y="54.339287"
          x="33.261902"
          height="23.434532"
          width="151.19049"
          id="rect4586-7"
        ></rect>
        <rect
          ry="0"
          y="202.88393"
          x="34.773804"
          height="23.434534"
          width="151.19049"
          id="rect4586-7-4"
        ></rect>
        <rect y="190.41071" x="148.24239" height="6.8035712" width="43.089287" id="rect4624"></rect>
        <rect y="80.419632" x="27.667866" height="6.8035712" width="43.089287" id="rect4624-3"></rect>
        <rect y="83.443451" x="149.37631" height="6.8035712" width="43.089287" id="rect4624-7"></rect>
        <rect y="191.92262" x="27.743454" height="6.8035712" width="43.089287" id="rect4624-6"></rect>
        <rect y="105.34637" x="33.015427" height="6.8429661" width="31.033443" id="rect4624-3-2"></rect>
        <rect y="168.09042" x="154.87508" height="6.8429661" width="31.033445" id="rect4624-3-2-0"></rect>
        <rect y="170.35828" x="33.771378" height="6.8429661" width="31.033445" id="rect4624-3-2-5"></rect>
        <rect y="106.48029" x="154.57263" height="6.8429661" width="31.033445" id="rect4624-3-2-07"></rect>
        <rect
          ry="0"
          y="77.545586"
          x="42.634258"
          height="123.29727"
          width="14.440135"
          id="rect4586-7-5"
        ></rect>
        <rect
          ry="0"
          y="78.52832"
          x="163.0576"
          height="123.29727"
          width="14.440135"
          id="rect4586-7-5-7"
        ></rect>
        <rect
          ry="0"
          y="78.340057"
          x="73.585655"
          height="123.29727"
          width="8.4736986"
          id="rect4586-7-5-3"
        ></rect>
        <rect
          ry="0"
          y="78.679504"
          x="137.65205"
          height="123.29727"
          width="8.4736986"
          id="rect4586-7-5-3-5"
        ></rect>
        <ellipse
          ry="24.739935"
          rx="26.55422"
          cy="65.479736"
          cx="110.2655"
          id="path4761"
          stroke="pink"
          :stroke-width="stroke"
          @click="toggleStroke"
        ></ellipse>
        <ellipse ry="24.739935" rx="26.554222" cy="213.08929" cx="111.125" id="path4761-9"></ellipse>
        <text fill="white" y="65.479736" x="90.2655">Weel</text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "orange",
      width: 100,
      height: 100,
      stroke: 5,
      transformation: "",
      angle: 1,
      bugCount: 0,
      message: "",
      hasBugs: false
    };
  },
  methods: {
    toggleStroke() {
      this.stroke == 5 ? (this.stroke = 0) : (this.stroke = 5);
      var myThis = this;
      setTimeout(function() {
        myThis.toggleStroke();
      }, 500);
    },
    updateAngle() {
      this.angle++;
    },
    transform() {
      "rotate(" + this.angle + ")";
    }
  },
  watch: {
    angle: {
      immediate: true,
      handler() {
        setTimeout(function() {}, 50);
      }
    }
  }
};
</script>

<style>
</style>
