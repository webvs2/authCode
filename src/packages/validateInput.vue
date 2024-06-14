<template>
  <div :class="n('')">
    <div :class="n('head')" v-if="props.tips">
      <slot name="tips">
        <p>
          {{ props.tips }}
        </p>
      </slot>
    </div>
    <div :class="n('box')" ref="codeRef">
      <template v-if="props.type === 'number' && props.length > 0">
        <div
          v-for="index in props.length"
          :key="index"
          :ref="index === 0 ? 'FirstRef' : undefined"
          :class="{
            [n('', 'activate')]: index === presentIndex,
            [n('', 'item')]: true,
            [n('', 'In')]:
              index === presentIndex && showVlaue[index - 1] === ' ',
          }"
          @click.stop="click(index)"
        >
          {{ showVlaue[index - 1] }}
        </div>
        <input
          ref="inputRef"
          :class="n('input')"
          type="text"
          v-model="value"
          :maxlength="props.length"
        />
      </template>
      <template v-if="props.type === 'code'">
        <input ref="inputRef" :max="props.length" v-model="value" />
      </template>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { bemStr } from './bem'
import {
  ref,
  onMounted,
  watch,
  computed,
  defineEmits,
  withDefaults,
  defineExpose,
} from 'vue'
let n = bemStr('validateInput')
const emit = defineEmits(['change', 'succeed'])
const codeRef = ref<HTMLElement | null>(null)
const presentIndex = ref(0)
const value = ref('')
const showVlaue = computed(() => value.value.split(''))
const inputRef = ref<HTMLInputElement | null>(null)
export interface Props {
  length: number
  type?: 'number' | 'code'
  code: string | (() => string)
  tips?: string
}

const props = withDefaults(defineProps<Props>(), {
  max: 4,
  type: 'number',
})
watch(value, (newVal) => {
  let result
  if (typeof props.code === 'function') {
    result = props.code()
  } else {
    result = props.code || undefined
  }

  if (result && newVal === result) {
    emit('succeed', true)
  }
  presentIndex.value = newVal.length
  emit('change', newVal)
})
const focus = () => {
  inputRef.value!.focus()
}
const blur = () => {
  inputRef.value!.blur()
}
const detectionFocus = (fn?: () => void) => {
  inputRef.value!.addEventListener('focus', () => {
    fn && fn()
  })
}
const detectionBlur = (fn?: () => void) => {
  inputRef.value!.addEventListener('blur', () => {
    fn && fn()
  })
}
onMounted(() => {
  if (props.type === 'number' && props.length > 0) {
    focus()
    value.value = ''.repeat(props.length)
    presentIndex.value = 1
  }
})

/**
 * @description: 点击输入框
 * @param {number} index
 * @return {*}
 */
const click = (index: number) => {
  focus()
  presentIndex.value = index
}

defineExpose({
  focus,
  blur,
  detectionFocus,
  detectionBlur,
  value,
})
</script>
  
  <style lang="scss" scoped>
@import '../css/mixin.scss';
@include b(validateInput) {
  display: inline-block;
  width: 100%;
  @include e(box) {
    min-width: 100px;
    padding: 10px 18px;
    display: inline-flex;
    position: relative;
    gap: 15px;
    justify-content: space-around;
  }
  @include e(head) {
    margin-top: 20px;
    font-size: 16px;
    color: #303133;
    p {
      display: inline;
      // color: #909399;
    }
  }
  @include e(input) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: -1;
  }
  @include m(item) {
    width: 40px;
    height: 40px;

    border: 1px solid #e4e7ed;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 2px rgba(0, 0, 0, 0.04);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    transition: all 0.3s;
    border-radius: 4px;
  }
  @include m(activate) {
    position: relative;
    box-shadow: 0 1px 4px #409eff, 0 0 4px #409eff;
    border: 1px solid #409eff;
  }
  @include m(In) {
    &::after {
      content: '|';
      position: absolute;
      top: 0;
      color: #909399;
      line-height: 200%;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      //background-color: #409eff;
      opacity: 0;
      animation: blink 1.6s infinite;
    }
  }
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
  