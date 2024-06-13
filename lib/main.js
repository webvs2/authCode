import ValidateInput from '../src/components/validationInput.vue'
export { ValidateInput }
export default {
  install: (app, options) => {
    app.component('ValidateInput', ValidateInput)
  },
}
