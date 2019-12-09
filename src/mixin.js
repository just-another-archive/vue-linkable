
export default (...props) => {
  const computed = {}

  props.forEach(prop => {
    const event = prop === 'value' ? 'input' : 'update:' + prop

    computed[`${prop}$`] = {
      get() { return this[prop] },
      set(val) { this.$emit(event, val) },
    }
  })

  return { computed }
}
