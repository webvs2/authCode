# ValidateInput

Used to verify the matching of capTCHA or other characters
'vue3@x' version applies




```js  
/** main */
import ValidateInput from "ValidateInput"
import "validateinput/dist/style.css";
app.use(ValidateInput)

```
or Use it directly
```js  

    <ValidateInput></ValidateInput>
  
<script setup lang="ts">
import ValidateInput from './packages/validateInput.vue'
import "validateinput/dist/style.css";
</script>

```


## API

### Attributes
:::warning

When type is `code` mode, the `el-input` component is used

:::
| Name   | Description                                                      | Type                        | Default  |
| ------ | ---------------------------------------------------------------- | --------------------------- | -------- |
| length | Enter the number of impressions for the content [`code`nullify ] | ^[string ]                  | 4        |
| type   | Types of verification                                            | ^[enum]`'number'\| 'code'\` | 'number' |
| tips   | To illustrate a prompt                                           | ^[string]                   | ''       |
| code   | Code for comparison                                              | ^[Function,string]          | ''       |

### Events

| Name    | Description                   | Type                                  |
| ------- | ----------------------------- | ------------------------------------- |
| change  | triggers when `value` changes | ^[Function]`(value: number) => void`  |
| succeed | triggers when succeed changes | ^[Function]`(value: number) => boole` |



### Slots

| Name | Description                                                         |
| ---- | ------------------------------------------------------------------- |
| tips | custom content. To use this, you need to declare `slot` in `layout` |
