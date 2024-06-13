import ValidateInput from '../src/packages/validateInput.vue'
export { ValidateInput }
export default {
  install: (app, options) => {
    app.component('ValidateInput', ValidateInput)
  },
}
