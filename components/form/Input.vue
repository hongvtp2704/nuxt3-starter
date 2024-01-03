<script lang="ts" setup>
import { useField } from 'vee-validate'

type InputType = 'text' | 'password' | 'number'
type InputSize = 'lg' | 'md' | 'sm'
interface IProps {
  type?: InputType
  modelValue?: string | number
  name?: string // For vee-validate
  label?: string
  placeholder: string
  icon?: string
  size?: InputSize
}
interface IEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'keyup.enter'): void
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  name: '',
  size: 'md',
})
const emits = defineEmits<IEmits>()

const { type, label, modelValue, name, placeholder, icon, size } = toRefs(props)
const { errorMessage, handleChange, handleBlur } = useField(name)

const inputValue = ref(modelValue.value || '')
watch(modelValue, (value) => {
  inputValue.value = value
})
function updateModalValue(event: Event) {
  const target = event.target as HTMLInputElement
  handleChange(target.value)
  if (typeof modelValue.value !== 'undefined')
    emits('update:modelValue', target.value)
  else inputValue.value = target.value
}

// Styling
const slots = useSlots()
const isActionIconSlot = computed(() => !!slots['action-icon'])
</script>

<template>
  <div :class="{ invalid: errorMessage, [size]: true }" class="input-container">
    <label v-if="label" :for="name">{{ label }}</label>
    <div class="input-field">
      <svg-icon v-if="icon" class="left-icon" :name="icon" />
      <div v-if="isActionIconSlot || errorMessage" class="right-icon">
        <slot v-if="isActionIconSlot" name="action-icon" />
        <svg-icon v-else-if="errorMessage" class="error-icon" name="info-danger" />
      </div>
      <input
        :value="inputValue"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        autocomplete="off"
        @input="updateModalValue"
        @blur="handleBlur"
        @keyup.enter="() => emits('keyup.enter')"
      >
    </div>
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: column;

  //Custom size
  &.md {
    font-size: 14px;
    .input-field {
      input {
        padding: 10px 12px;
      }
      svg {
        width: 16px;
        height: 16px;
        &.left-icon {
          left: 10px;
        }
        &~input {
          padding-left: 32px;
        }
      }
      .right-icon {
        right: 10px;
        &~input {
          padding-right: 32px;
        }
      }
    }
  }

  &.lg {
    font-size: 14px;
    .input-field {
      input {
        padding: 10px 12px;
      }
      svg {
        width: 16px;
        height: 16px;
        &.left-icon {
          left: 10px;
        }
        &~input {
          padding-left: 32px;
        }
      }
      .right-icon {
        right: 10px;
        &~input {
          padding-right: 32px;
        }
      }
    }
  }

  &.sm {
    font-size: 14px;
    .input-field {
      input {
        padding: 10px 12px;
      }
      svg {
        width: 16px;
        height: 16px;
        &.left-icon {
          left: 10px;
        }
        &~input {
          padding-left: 32px;
        }
      }
      .right-icon {
        right: 10px;
        &~input {
          padding-right: 32px;
        }
      }
    }
  }

  // Styling
  label {
    color: $white;
    margin-bottom: 8px;
  }

  .input-field {
    position: relative;
    input {
      width: 100%;
      background: #2A2D3D;
      border: 1px solid #33394C;
      border-radius: 8px;
      color: #FAFAFA;
      &:focus {
        outline: none;
        border: 2px solid $primary;
      }
      &::placeholder {
        color: #6B7280;
      }
    }

    svg {
      &.left-icon {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .right-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }

  &.invalid {
    .input-field {
      input {
        border: 1px solid $danger;
        &:focus {
          outline: none;
          border: 2px solid $danger;
        }
      }
    }
  }

  span {
    color: $danger;
    margin-top: 8px;
  }

}
</style>
