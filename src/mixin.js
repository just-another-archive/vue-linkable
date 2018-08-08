export default (...props) => ({
  // creating proxy data for props, with "prop + $" syntax
  data() {
    return props.reduce((data, prop) => {
      data[`${prop}$`] = null
      return data;
    }, {})
  },

  created() {
    // setting default value and watchers for prop proxies
    props.forEach(prop => {
      const prox = `${prop}$`;

      this[prox] = this[prop];
      this.$watch(prop, newVal => this[prox] = newVal);
      this.$watch(prox, newVal => this.$emit('update:' + prop, newVal))
    })
  },
})
