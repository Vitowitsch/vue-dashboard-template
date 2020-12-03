import Vue from 'vue';

export default Vue.extend({
  template: `
            <div style="display: inline-block">
                <span class="groupTitle"> {{this.node.key}}</span>
                <span class="medal gold"> Gold: {{this.node.aggData.lastResult_HS}}</span>
                <span class="medal silver"> Silver: {{this.node.aggData.lastResult_RUL}}</span>
            </div>
    `,
  data: function() {
    return {
      flagCodeImg: '',
      node: null,
    };
  },
  beforeMount() {
    this.node = this.params.node;

  },
  mounted() {},
  methods: {},
});